"use strict";

const Redis = require("ioredis");
const _ = require("lodash");

const client = new Redis({
  host: "0.tcp.eu.ngrok.io",
  port: 12673,
});
exports.client = client; // expose client for tests and closing connection

const formatWord = (word) => _.deburr(word).toUpperCase();

const initWordsSet = async (words, key) => {
  await client.pipeline().del(key).sadd(key, words.map(formatWord)).exec();
};

exports.initValidWords = async (words) => {
  await initWordsSet(words, "valid_words");
};

exports.initGuessableWords = async (words) => {
  await initWordsSet(words, "guessable_words");
};

exports.isValidWord = async (word) => {
  return client.sismember("valid_words", formatWord(word));
};

exports.pickNewWord = async () => {
  // TODO Redis's Watch-Multi-Exec optimistic lock
  // Grab random word
  let word = await client.srandmember("guessable_words");

  if (!word) {
    // No more words available: restore guessed words and start over
    const result = await client
      .pipeline()
      .sunionstore("guessable_words", "guessable_words", "guessed_words")
      .del("guessed_words")
      .srandmember("guessable_words")
      .exec();
    word = result[result.length - 1][1];
  }

  if (!word) {
    // Still no word available: that's fatal
    throw new Error("NO_GUESSABLE_WORD");
  }

  await client
    .pipeline()
    .srem("guessable_words", word) // Don't guess this one again later
    .sadd("guessed_words", word) // Add to other list
    .set("current_word", word) // Store as current word
    .del("trials") // Clear trials
    .exec();

  return length;
};

exports.getScores = async () => {
  // HGETALL scores
  // sort
};

exports.addScore = async (username, points) => {
  // HINCRBY scores $username $points
};

/**
 * Input: string word
 * Output: Trial
 * Trial :: Array<[ char, status: 0|1|2 ]>
 */
exports.checkWord = async (word) => {
  // TODO Redis: GET current_word
  const currentWord = "USINE";

  if (word.length !== currentWord.length) {
    throw new Error("INVALID_WORD_LENGTH");
  }

  const trial = word.split("").map((letter, index) => {
    if (currentWord[index] === letter) {
      return [letter, 2]; // OK
    } else if (currentWord.indexOf(letter) !== -1) {
      return [letter, 1]; // Misplaced
    } else {
      return [letter, 0]; // Wrong
    }
  });

  // TODO Redis: RPUSH trials $trial

  return trial;
};

exports.getTrials = async () => {
  // LRANGE trials 0 -1
};

exports.getCurrentGame = async () => {
  return {
    trials: [], // TODO getTrials
    scores: [], // TODO getScores
    wordLength: 0, // TODO getCurrentWord
  };
};
