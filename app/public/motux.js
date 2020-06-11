const logIn = (username, callback) => {
  // TODO log in to server
  setTimeout(() => {
    callback(null); // OK
  }, 500);
};

// TODO get state from server
$(() => {
  // Update auth status first
  updateUI({ username: "naholyr" });
  // Then update UI
  updateUI({
    wordLength: 6,
    trials: [
      {
        name: "naholyr",
        word: [
          ["c", 2],
          ["a", 0],
          ["s", 0],
          ["t", 1],
          ["o", 2],
          ["r", 1],
        ],
      },
      {
        name: "naholyr",
        word: [
          ["c", 2],
          ["i", 2],
          ["n", 1],
          ["e", 0],
          ["m", 0],
          ["a", 0],
        ],
      },
    ],
    scores: [{ id: "1", name: "naholyr", score: 0 }],
  });
});

const sendWord = (word) => {
  disableInput();
  // TODO send to server, which will respond with "trial" info
  const trial = word.split("").map((letter) => {
    const randomStatus = Math.floor(Math.random() * 3);
    return [letter, randomStatus];
  });
  addTrial({ name: state.username, word: trial });
  // TODO re-enable only once server told so
  setTimeout(enableInput, 5000);
};

// TODO receive "new game" from server
setTimeout(() => {
  newGame(6, [{ id: "1", name: "naholyr", score: 6 }]);
}, 15000);

/**
 * INTERNAL IMPLEMENTATION
 */

let state = {
  /*
  username: string?
  wordLength: number
  trials: [
    {
      name: string
      word: [ [ letter: char, status: 0|1|2 ] ]
    }
  ]
  scores: [
    {
      id: string,
      name: string
      score: number
    }
  ]
  */
};

// UI update

const tplScore = _.template($("#tpl-score").text());
const tplTrial = _.template($("#tpl-trial").text());
const LETTER_STATUS_CLASS = ["incorrect", "misplaced", "correct"];
const updateUI = ({ username, trials, scores, wordLength }) => {
  const updates = {};
  // Authentication status
  if (username !== undefined && state.username !== username) {
    updates.username = username;
    $("#login").toggle(!username);
    $("#game").toggle(!!username);
    $(username ? "#game input" : "#login input").focus();
  }
  // Word input
  if (wordLength !== undefined && state.wordLength !== wordLength) {
    updates.wordLength = wordLength;
    $('#word [name="word"]')
      .attr("minlength", wordLength)
      .attr("maxlength", wordLength)
      .css("width", 2 * wordLength + "rem")
      .attr("placeholder", wordLength + " lettres");
  }
  // Game status
  if (trials !== undefined && state.trials !== trials) {
    updates.trials = trials;
    const html = _.map(trials, ({ name, word }) =>
      tplTrial({
        userName: name,
        isMyself: name === state.username,
        letters: word.map(([letter, intStatus]) => ({
          letter,
          status: LETTER_STATUS_CLASS[intStatus],
        })),
      })
    ).join("");
    $("#trials").html(html);
  }
  // Scores
  if (scores !== undefined && state.scores !== scores) {
    updates.scores = scores;
    const html = _.map(scores, ({ id, name, score }) =>
      tplScore({
        userId: id,
        userName: name,
        isMyself: name === state.username,
        score,
      })
    ).join("");
    $("#scores").html(html);
  }
  // Update internal state for next update
  state = { ...state, ...updates };
};

// login

$("#login").on("submit", (e) => {
  e.preventDefault();
  const username = e.currentTarget.elements.username.value;
  $("#login button, #login input").attr("disabled", true);
  logIn(username, (err) => {
    $("#login button, #login input").removeAttr("disabled");
    if (!err) {
      updateUI({ username });
    }
  });
});

// add trial

$("#word").on("submit", (e) => {
  e.preventDefault();
  sendWord(e.currentTarget.elements.word.value);
});

const addTrial = (trial) => {
  updateUI({ trials: [...state.trials, trial] });
};

// Disable input temporarily

const disableInput = () => {
  $('#word [name="word"]').attr("disabled", true).val("");
};

const enableInput = () => {
  $('#word [name="word"]').removeAttr("disabled").focus();
};

// Start a new game

const newGame = (wordLength, scores) => {
  updateUI({ trials: [], wordLength, scores });
};
