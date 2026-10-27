# PV de la séance en présentiel à 42 du 20 octobre 2026

**Durée : 1h30**

**Présents :** Cynthia (cyglardo), Lisa (llabatut), Mathieu (mtaramar), Marjorie (mrosset) et Mélody (mlaffita) en call Discord.

## 1. Ordre du jour

Voici les points principaux à l'ordre du jour pour cette séance:

  - Choix concernant le module de cybersécurité.
  - Point sur la mise en commun de la partie authentification.
  - Présentation des recherches et du travail effectué.
  - Choisir les dates des prochaines séances.
  - Effectuer régulièrement un tour de table afin que chacun puisse s'exprimer. Ce point a été intégré à chaque étape de la séance.

## 2. Module de cybersécurité

  - **Cynthia** nous a présenté son travail terminé concernant Vault, ainsi que le lien internet qui fonctionne également avec Vault. Il manque encore un certificat TLS, à voir avec Let's Encrypt.
  
  - **Mathieu** nous a exposé ses recherches sur la partie WAF, ce qu'il faudrait mettre en place dans le projet et pourquoi, selon lui, cela est réalisable. Il va poursuivre son travail en se concentrant sur cette partie.
  
  Nous avons donc décidé de garder le module de cybersécurité pour notre projet.

## 3. Authentification

Le travail d'harmonisation des parties de Mathieu et Lisa a été effectué. Ils nous ont présenté la version harmonisée de l'authentification et un merge de la branche de Lisa vers la branche main a été réalisé afin que chacun puisse récupérer la version à jour.

  - **Lisa** nous a présenté Jest, un framework de test utilisé notamment avec NestJS, permettant ici de tester le hachage des mots de passe et de s'assurer que celui-ci fonctionne correctement. Pour la suite, Lisa va effectuer d'autres tests pour vérifier le fonctionnement du login et mettre en place l'authentification via 42. Elle va également travailler avec Mélody sur la connexion entre le backend et le frontend, notamment concernant les API.

## 4. Présentation des recherches et du travail effectué

  - **Marjorie : Base de données**
  Le concept de « Database seeding » ou « seed » a été présenté. Il permet de remplir la base de données avec des données fictives afin d'effectuer différents tests.
  
  - **Mélody : Frontend**
  Présentation du visuel définitif de la landing page ainsi que de l'avancement du travail. Pour la suite, Mélody continue en priorité avec la « registration page ».
Cynthia va également regarder avec Mélody pour poursuivre le travail sur le frontend.

## 5. Prochaines séances et séances intermédiaires

Nous avons pris la décision de mettre en place des séances intermédiaires, ce qui représente une deuxième séance dans la semaine.
Ces séances intermédiaires pourront être plus courtes et tout le monde ne sera pas obligé de s'exprimer si son travail ne nécessite pas encore d'être présenté à l'équipe.
Ces séances auront plusieurs objectifs : maintenir une bonne communication au sein de l'équipe, annoncer les avancées majeures, transmettre son travail avant une absence, éviter que certaines tâches soient effectuées en double, effectuer des merges sur la branche main ou encore prendre des décisions techniques pour permettre la poursuite du travail.

La prochaine séance intermédiaire se tiendra le **vendredi 23 octobre 2026** à 16h30.
La prochaine séance se tiendra le **mardi 27 octobre 2026** — l’heure sera définie à l’aide d’un sondage sur Discord.
Voici toutes les dates proposées pour les prochaines séances : 06.11, 10.11 (en principe en présentiel à 42), 13.11, 17.11, 20.11, 24.11 et 27.11.

## Résumé des décisions prises

  - Le module de cybersécurité va être réalisé (Vault et WAF).
  - Mise en place d'une deuxième séance hebdomadaire, une séance intermédiaire.
  - La prochaine séance intermédiaire est fixée au **23 octobre 2026**.
  - Toutes les dates des séances ont été proposées.

**Ce PV a été rédigé par mrosset, le 21 octobre 2026**
