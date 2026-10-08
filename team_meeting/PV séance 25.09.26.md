# PV de la séance en présentiel du 25 septembre 2026

**Durée :** 2h15

**Présents :** Cynthia (cyglardo), Mélody (mlaffita), Mathieu (mtaramar) et Marjorie (mrosset) en présentiel à 42 et Lisa (llabatut) en appel Discord.

## 1. Ordre du jour

Voici les points principaux à l'ordre du jour pour cette séance:

  - Présenter les recherches et le travail effectués  depuis la dernière séance, notamment pour les parties :
    * Base de données
    * Docker
    * Backend
    * API et endpoints
  - Discuter des différents aspects techniques et des choix effectués.
  - Choisir les dates des prochaines séances.
  - Effectuer régulièrement un tour de table afin que chacun puisse s'exprimer. Ce point a été intégré à chaque étape de la séance.

## 2. Mise au clair du produit final du projet

Lors de cette réunion, nous nous sommes rendu compte que nous n'avions pas tous la même interprétation ni la même vision du produit final de notre projet. Nous avons donc pris le temps d'en discuter afin de clarifier le concept et de nous assurer que toute l'équipe parte dans la même direction.

Le produit final sera un réseau social destiné aux étudiants de 42, leur permettant notamment de partager des photos et des publications concernant leur(s) animal(aux).

Il a été précisé qu'il n'y aura pas de sous-profil utilisateur pour chaque animal. L'utilisateur restera le propriétaire du compte et sera le seul à disposer des fonctionnalités liées à celui-ci. Les animaux disposeront quant à eux de pages permettant de regrouper leurs informations, leurs photos ainsi que les publications dans lesquelles ils sont identifiés.

## 3. Présentation des recherches et du travail effectué

Ce point a représenté la majeure partie de la séance. Les présentations ont régulièrement donné lieu à des discussions techniques entre les différents membres de l'équipe, certains sujets étant directement liés entre eux.
Voici un résumé des différents points abordés :

* **Marjorie : Base de données**
 Présentation et définition du fonctionnement d'un système de gestion de base de données relationnelle (SGBDR), ainsi que de différents concepts techniques liés à la base de données : tables, relations, UUID, types de données, etc.
 Le fonctionnement et l'organisation envisagés pour la base de données du projet ont également été présentés à l'aide de schémas graphiques, qui seront ajoutés à un fichier README afin de documenter cette partie du projet.
 Une présentation de l'ORM Prisma a également été faite, notamment concernant son rôle entre PostgreSQL et le backend, ainsi que la séparation de son utilisation entre la création et la gestion de la structure de la base de données et son utilisation par le backend (Prisma Schema - Prisma Migrate - Prisma Client).

* **Cynthia : Docker**
 Présentation de l'organisation envisagée des conteneurs Docker pour le projet et explication de la manière dont le frontend, le backend et les autres services fonctionneront au sein de cette infrastructure.Les prochaines étapes de recherche et de mise en place de cette partie ont également été présentées.

* **Mathieu : Backend**
 Présentation du travail effectué sur le backend depuis la dernière séance.
 Des tests ont notamment été réalisés avec Prisma et une petite base de données de test afin de comprendre et de valider le fonctionnement des interactions entre le backend, Prisma et la base de données dans le contexte du projet.

* **Lisa : API et endpoints**
 Présentation des recherches effectuées concernant les API et les endpoints, ainsi que de la page Notion créée pour centraliser et documenter ces recherches.

## 4. Aquisition d'une VM sur vod.42Lausanne

Il avait été décidé précédemment que, pour le fonctionnement et le déploiement du projet, nous utiliserions une VM sur vod.42Lausanne.L'acquisition de cette VM a été effectuée durant la séance. Une discussion technique a également eu lieu afin de définir les différents paramètres nécessaires à sa configuration.

Cynthia a effectué la création et la configuration initiale de la VM depuis le compte de Marjorie.

Nous avons ensuite effectué les premières connexions et ajouté plusieurs clés SSH afin de permettre aux membres de l'équipe de se connecter à la VM. Un channel dédié a été créé sur le serveur Discord afin de centraliser l'envoi des clés SSH restantes ainsi que les discussions concernant la VM et son accès.

## 5. Tâches à faire d'ici la prochaine séance

D'ici la prochaine séance, chacun poursuit le travail déjà commencé selon la répartition suivante :

* **Cynthia : Docker**
 Poursuivre le travail sur l'organisation et la mise en place des conteneurs Docker du projet.

* **Mélody : Frontend**
 Poursuivre ses recherches sur le frontend et préparer une première version de l'interface graphique du projet afin de la présenter à l'équipe.

* **Marjorie : Base de données**
 La prochaine étape consiste à installer et initialiser Prisma dans le backend afin de créer les premiers modèles du schéma Prisma, puis de générer la structure correspondante dans PostgreSQL à l'aide de Prisma Migrate.
 Un petit groupe de travail composé de Mathieu, Lisa et Marjorie a été créé afin de déterminer les informations nécessaires dans les premières tables. Cela permettra à Marjorie de commencer la création de la structure de la base de données.

* **Mathieu : Backend**
 Poursuivre le travail sur le backend et étudier le fonctionnement de Prisma Client afin de pouvoir lire, créer, modifier et supprimer les données de la base de données depuis le backend. Participe au groupe de travail sur les informations contenues dans les tables de la DB.

* **Lisa : API et endpoints**
  Approfondir les recherches concernant les API et les endpoints afin de définir leur fonctionnement dans le contexte du projet.. Participe au groupe de travail sur les informations contenues dans les tables de la DB.

### Choix des tâches et des points du projet

Lors de la prochaine séance, nous reprendrons ensemble les différents points listés dans le tableau Miro afin de déterminer définitivement les fonctionnalités et tâches que nous souhaitons réaliser. De nombreuses tâches ont été envisagées et le total des points potentiels est actuellement important. Cependant, un maximum de 19 points sera comptabilisé lors de l'évaluation finale.

Chaque membre doit donc reprendre la liste et réfléchir aux tâches qui lui semblent réellement pertinentes ou indispensables, principalement parmi celles qui sont encore en suspens ou placées entre parenthèses dans le tableau Miro. Les tâches prioritaires ou déjà commencées sont maintenues.

L'objectif reste de viser plus que les 14 points nécessaires, afin de conserver une marge de sécurité, sans pour autant prévoir un nombre excessif de fonctionnalités qui augmenterait inutilement la charge de travail.

### Accès à la VM
À la suite de l'acquisition de la VM, chaque membre doit prendre connaissance de son fonctionnement et transmettre sa ou ses clés SSH dans le channel Discord prévu à cet effet afin de pouvoir s'y connecter.

## 6. Prochaines séances

La prochaine séance se tiendra le **mercredi 30 septembre 2026** — l’heure sera définie à l’aide d’un sondage sur Discord.
Les dates proposées et pré validées par l'équipe pour les séances d'après sont le **6 octobre 2026** et le **16 octobre 2026** qui sera fait dans la mesure du possible en présentiel à 42.

## Résumé des décisions prises

* Le produit final a été clarifié
* L'organisation générale entre PostgreSQL, Prisma et le backend a été présentée et discutée 
* L'organisation de l'infrastructure Docker a été présentée
* Les premiers test effectué avec Backend ont été présenté
* Une VM sur vod.42Lausanne a été créée
* La prochaine séance est fixée au **30 septembre 2026**.

**Ce PV a été rédigé par mrosset, le 27 septembre 2026**