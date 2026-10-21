*This project has been created as part of the 42 curriculum by cyglardo, llabatut, mlaffita, mrosset, mtaramar.*

# Description
## What was asked
Create a web app that can handle multiple clients at a time.

Its exact form and purpose was up to us.

## What we did
A social platform to share pictures of 42 students' pets.

# Instructions
Make sure you have Google Chrome installed. This project isn't fully compatible with other browsers.

Clone this repository:
```
git clone git@github.com:Jayleeva/42transcendence
```
Make sure you're in the local repository. 
```
cd 42transcendence
```
Compile and launch it with:
```
make
```



# Resources
## Traditional sources
### Frameworks choice
- https://rikkeisoft.com/blog/web-development-frameworks/

### How to use the frameworks
- https://nextjs.org/docs
- https://nextjs.org/learn/dashboard-app

### Tools
- https://socket.io/fr/get-started/chat
- https://brm.io/matter-js/
- https://ably.com/topic/socketio-vs-websocket
- https://openclassrooms.com/en/courses/1733551-gerez-votre-serveur-linux-et-ses-services/5236081-mettez-en-place-un-reverse-proxy-avec-nginx

### Github remote
- https://docs.github.com/en/get-started/git-basics/managing-remote-repositories

### HashiCorp Vault
- https://developer.hashicorp.com/hcp/docs


## AI use
AI was heavily used to understand HashiCorp Vault, how it works, and most importantly, how to implement it. Once this became clearer, we rewrote our own code and used more traditional sources such as the official documentation to make sure we did understand it properly.

# Team Information
|Student|Role|Brief description|
|---|---|---|
|cyglardo|Product Owner|Defines the product vision, prioritizes features, and ensures the project meets user needs.|
|llabatut|Tech Lead|Oversees technical decisions and architecture.|
|mlaffita|Lead UI/UX|Insures the product's aesthetic, accessibility and responsivity.|
|mrosset|Project manager|Facilitates team coordination and removes obstacles.|
|mtaramar|Security Lead|Insures data protection, manages permissions and prevents failures.|

# Project Management
## Tasks distribution
We "created" additional roles so that everyone had a title instead of just 3.

Everyone assessed which position they were willing to assume and voted for their favorite and second choice.

## Tools
- Miro

## Communication medium
Discord server.

# Technical Stack
|Feature|Techno|Reason|
|---|---|---|
|Frontend|NextJS|Easier for beginners than Angular and more modern than React; works with Tailwind CSS; uses Typescript.|
|Backend|NestJS|Has similarities with C++; facilitates auth, upload and websockets; uses Typescript.|
|Database|PostgreSQL|Well documented and more suited than MySQL for what we chose to do.|
|Styling solution|Tailwind CSS|Allows to inject styling in a readable way, avoiding multiple files.|
|ORM|Prisma|Facilitates relation between backend and DB.|
|Containers|Docker|Familiar and works fine.|
|Vault|HashiCorp|The only vault accepted by the subject.|

# Database Schema
(visual of the db structure)
(tables/collections and their relationships)
(key fields and data types)

# Features List
|Feature|Student|Brief description|
|---|---|---|
|Vault|cyglardo|The secrets are centralized, isolated and encrypted for max. security.|
|ORM|mrosset|The database is migrated easily through Prisma.|
|Authentication|mlaffita, mtaramar, llabatut|Users must create and use their own credentials to access the app.|
|Post| |Users can create posts, with or without pictures.|
|Comment| |Users can comment posts.|
|Profile page| |Users can view profiles and edit their own.|
|Friends system| |Users can add each other as friends.|
|Private messages| |Users can send private messages to their added friends.|
|Badges| |Users can get and display badges related to specific achievements.|


# Modules 
|Module type|Module|Student|Points|
|---|---|---|---|
|Web|Use a framework for both the frontend and backend|llabatut, mlaffita, mtaramar|2|
|Web|Allow users to interact with other users| |2|
|Web|Notification system| |1|
|Web|Custom-made design system| |1|
|Web|Implement advanced search functionality| |1|
|Web|File upload and management system| |1|
|Accessibility and Internationalization|Support for multiple languages| |1|
|Accessibility and Internationalization|Support for additional browsers| |1|
|User management|Standard user management and authentication| |2|
|User management|Remote authentication| |1|
|User management|Advanced permissions system | |2|
|User management|Implement complete 2FA system| |1|
|User management|User activity analytics and insights dashboard| |1|
|Artificial intelligence|Recommendation system| |1|
|Artificial intelligence|Content moderation| |1|
|Cybersecurity|Implement WAF/ModSecurity (hardened) + HashiCorp Vault for secrets|cyglardo, mtaramar|2|
|Devops|Health check and status page system|cyglardo|1|
|Data|GDPR compliance features| |1|
|Module of choice|Post| |1|
|Module of choice|Achievements/Badges| |1|
|**Total points**| | |**27**| 

## Justification

## How each was implemented

# Individual Contributions
## cyglardo
### Breakdown of contribution
Created the stack. Implemented HashiCorp Vault.

### Specific modules / features / components
- Cybersecurity: HashiCorp Vault

### Specific challenges
Understanding HashiCorp Vault and how it shaped the stack.

## llabatut
### Breakdown of contribution
### Specific modules / features / components
### Specific challenges

## mlaffita
### Breakdown of contribution
### Specific modules / features / components
### Specific challenges

## mrosset
### Breakdown of contribution
### Specific modules / features / components
### Specific challenges

## mtaramar
### Breakdown of contribution
### Specific modules / features / components
### Specific challenges

# Other relevant information
## Usage
## Known limitations
## Licence & credits



