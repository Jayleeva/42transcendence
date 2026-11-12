# PV de la séance en appel Discord du 6 octobre 2026

**Durée :** 1h30

**Présents :** Cynthia (cyglardo), Lisa (llabatut), Melody (mlaffita), Mathieu (mtaramar) et Marjorie (mrosset).

## 1. Ordre du jour

Voici les points principaux à l'ordre du jour pour cette séance:

  - Discuter du contenu de la DB ( voir Miro ) 
  - Présentation des recherches et du travail effectué par chacun
  - Choix des prochaines dates 


## 2. Tour de table et présentation du travail effectué

 - **Cynthia : Docker**
Cynthia a travaillé avec Mathieu pour créer docker compose, comprendre où mettre la DB, etc ...  
La DB va avoir son propre docker mais va être migrée depuis le backend. 
Une question se pose par rapport au fichier .env ou à l'utilisation des secrets. 
Si on veut valider le module associé, il faut que tout soit dans "vault". Pour l'instant on ne sait pas trop comment ça fonctionne. 
Un groupe de travail composé de Mathieu et Cynthia va s'organiser pour essayer de comprendre tout ça et voir si ça vaut la peine de se lancer dans ce module. 
Cela doit à priori être décide le plus tot possible car cela risque de poser des soucis pour plus tard si on doit le rajouter. 

 - **Marjorie : Base de données**
Mathieu, Melody et Lisa ont complété le Miro avec tous les éléments necessaires à inclure dans la DB. 
Marjorie va se charger de traduire tout cela en tables et éléments fonctionnels ( difinition des tables, leurs relations etc ...). Elle va également nous faire un schema récapitulatif montrant les relations entre chacun de ces éléments.
Melody et Mathieu se posent la question de comment travailler efficacement pour faciliter la tâche à Marjorie : est ce qu'on anticipe et qu'on crée déjà beaucoup d'éléments, quitte à ne pas les utiliser plus tard si on supprime des features, ou alors est ce qu'il vaut mieux ajouter des choses en plus plus tard ? 
Marjorie nous confirme que tant qu'il n'y a pas de données, c'est facile d'ajouter ou bien de supprimer des tables ou colonnes. On decide donc d'ajouter au fur et à mesure si besoin. 
Mais globalament tous les éléments présents dans le Miro sont là, et il ne devrait pas y avoir beaucoup d'ajouts, à moins qu'il y ait eu des oublis à ce stade du projet. 

 - **Mathieu : Backend**
Mathieu à réféchi à une autre maniere de faire pour l'authentification pour éviter d'avoir à passer par un mail. Par exemple via une app de type authentificator. 
Il continue de se renseigner sur le 2FA, voir si c'est intégré à la db, via une app ou non.

 - **Lisa : API et endpoints**
Lisa continue ses recherches concernant les API, endpoints, et cookies. 
 
 - **Melody : Frontend**
Melody à proposé un nouveau code couleur moins sombre après les retours sur le sondage. Les nouvelles couleurs sont basées sur les couleurs du site officiel de 42 Lausanne, en rajoutant le "bleu 42" qui correspond à la couleur type de 42 Central. 
L'idée serait de garder à priori 2 couleurs pour les éléments, et éventuellement une troisième si besoin, mais 2 seraient suffisantes. Cynthia propose que la troisième couleur soit le rouge, et utilisée pour les actions irréversibles par exemple ( supprimer, confirmation de suppression ...)
Melody va faire un nouveau sondage pour définir le nom du site avec ce qui a été suggéré dans le discord, afin qu'on puisse commencer à creer des visuels personalisés. 
Les visuels ont été updatés avec certaines versions mobile dans le cas ou l'interface changerait entre les deux ( feed et messagerie pour le moment)
Melody a également montré l'arborescence globale du front-end et partagé quelques points des recherches effectuées à ce sujet.

## 3. Tâches à faire d'ici la prochaine séance

- Cynthia et Mathieu : Se renseigner plus en détail concernant le module cybersec ( secret ou pas )
- Tester chacun sa branche sur la VM pour voir si tout est ok pour tout le monde
- Marjorie : Finaliser la DB avec les éléments fournis
- lisa : continuer les recherches sur API etc 
- Melody : continuer le front, et les visuels

## 4. Prochaines séances

La prochaine séance se tiendra le **vendredi 16 octobre 2026** — l’heure sera définie à l’aide d’un sondage sur Discord. Cette séance se fera en principe en appel Discord.
La date proposée et pré validée par l'équipe pour la séance d'après est le 20 octobre 2026 qui sera fait dans la mesure du possible en présentiel à 42.

## Résumé des décisions prises

  - Les elements de la DB ont tous été listés
  - L'aspect visuel du site commence à prendre forme 
  - La prochaine séance est fixée au **16 octobre 2026**.

**Ce PV a été rédigé par mlaffita, le 6 octobre 2026**
