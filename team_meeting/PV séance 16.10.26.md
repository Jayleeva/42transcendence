# PV de la séance en appel Discord du 16 octobre 2026 

**Durée : 1h15**

**Présents :** Cynthia (cyglardo), Lisa (llabatut), Mélody (mlaffita), Mathieu (mtaramar) et Marjorie (mrosset).

## 1. Ordre du jour

Voici les points principaux à l'ordre du jour pour cette séance:

  - Présenter les recherches et le travail effectués depuis la dernière séance
  - Choisir les dates des prochaines séances.
  - Effectuer régulièrement un tour de table afin que chacun puisse s'exprimer. Ce point a été intégré à chaque étape de la séance.

## 2. Présentation des recherches et du travail effectué

* **Cynthia : Docker et Vault**
Concernant les conteneurs Docker, tout est fonctionnel et se compile correctement sur la VM.
Il est maintenant question de Vault pour le module de cybersécurité. Cynthia a réalisé son implémentation et cela fonctionne correctement. Cependant, la question se pose de savoir où stocker les clés pour que cela ait du sens en matière de cybersécurité : sur la VM ou dans un service externe ?
Cette question reste en suspens jusqu'à la prochaine séance, durant laquelle nous prendrons une décision sur ce point ainsi que sur la deuxième partie du module (WAF), en fonction du temps nécessaire à sa réalisation.

* **Mathieu : Backend et WAF**
Présentation des recherches effectuées sur le WAF. À première vue, cela risque de représenter un travail un peu plus conséquent. Comme évoqué précédemment, il reste donc à déterminer si nous mettons ce module de cybersécurité en place ou non.
Mathieu nous a ensuite expliqué le travail effectué et s'est rendu compte qu'il avait développé une partie similaire à celle de Lisa concernant l'authentification. Ils ont donc mis en place un plan d'action pour regrouper leur travail et ne conserver qu'une seule version d'ici la prochaine séance.

* **Lisa : API et endpoints**
Présentation d'Argon2 pour le hachage des mots de passe, car ceux-ci ne doivent pas être stockés en clair dans la base de données.
Pour la suite de son travail, Lisa va collaborer avec Mathieu afin d'harmoniser leur travail sur l'authentification. Elle poursuivra également l'implémentation de l'authentification avec 42.

* **Marjorie : Base de données**
La base de données a été terminée depuis la dernière séance. Pour le moment, aucune modification des tables n'est nécessaire pour le moment.
Pour la suite du travail, Marjorie étudie plus en détail le fonctionnement de Prisma Client, le fonctionnement global d'une base de données au sein d'un projet ainsi que le concept de « seed », permettant de remplir la base de données avec des données fictives pour effectuer des tests.

* **Mélody : Frontend**
Le sondage pour le nom définitif est terminé, notre projet se nomme désormais « Lauzanimo ».
Présentation de l'avancée graphique du projet. Le logo ainsi que le favicon (icône) ont été présentés et ont fait l'unanimité au sein de l'équipe.
Mélody nous a également présenté la création de la landing page. D'ici la prochaine séance, elle poursuivra la création des autres pages et commencera à étudier comment faire le lien entre le frontend et le backend.

## 3. Tâches à faire d'ici la prochaine séance

D'ici la prochaine séance, chacun poursuit le travail en cours évoqué dans la paragraphe précèdent.

## 4. Prochaines séances

La prochaine séance se tiendra le **mardi 20 octobre 2026** en présentiel à 42, à 14h00.
La date proposée et pré validée par l'équipe pour la séance d'après est le **27 octobre 2026**.

## Résumé de la séance

  - Le nom définitif du projet est **Lauzanimo**
  - Les Dockers et la DB sont terminé et fonctionnels
  - La décision concernant l'implémentation complète du module de cybersécurité (Vault et WAF) se fera à la prochaine séance.
  - Le logo et le favicon de l'app web ont été approuvé par l'équipe
  - La prochaine séance est fixée au **20 octobre 2026** en présentiel

**Ce PV a été rédigé par mrosset, le 17 octobre 2026**
