## Formation Node.js 10-12 juin 2020

Contact : nicolas@chambrier.fr

### Ressources

- [Les diagrammes ("tableau blanc")](https://excalidraw.com/#json=6544221477535744,ECw--k7XKsKjnbN-Qa94vA) (également disponible en .png dans ce dépôt)
- Les slides dans le dossier "slides"
- Les quelques exemples isolés dans le dossier "samples"
- Le gros TP dans le dossier "app"

### Le TP

Un jeu type "Motus"

![image](https://user-images.githubusercontent.com/214067/84530406-662cff00-ace3-11ea-88a8-08d9ae5899d3.png)

Pré-requis :

- Node
- Serveur Redis
  * Pour Windows [voir ServiceStack/redis-windows](https://github.com/ServiceStack/redis-windows)
  * Avec Docker : `docker run --name redis-formation -p 6379:6379 redis -d` puis `docker [start|stop|rm] redis-formation`

#### Démarrage

* Installation des dépendances : `npm install`
* Initialisation des données : `node bin/init-data`
* Démarrage du serveur :
  * Mode prod : `npm start`
  * Mode dev : `npm run watch`
  * Cluster : `node server-cluster` (cassé, pour illustration) et `node server-cluster-sticky` (fonctionnel, mais pas "*production ready*")

#### Idées d'évolution

* ~~Trouver une vraie liste de mots valides de la langue française, ou une API permettant de faire le test~~ (merci [Christophe Pallier](http://www.pallier.org/liste-de-mots-francais.html))
* Afficher un compte à rebours lorsque l'input est *disabled* côté front (ce qui permet de réfléchir à toutes les problématiques de synchronisation client/serveur, prise en compte du lag, tolérance, etc…)
* Implémenter une authentification par mot de passe, ou ‑ plus fort ‑ en utilisant un service tiers oauth (github par exemple) avec par exemple [Passport.js](http://www.passportjs.org/) (avec *`{session:false}`*, cf. la doc)
* La grosse évol : permettre d'héberger plusieurs parties en simultané
