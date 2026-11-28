# Configuration Appwrite — à faire une seule fois dans la console

Le site est déjà branché sur ces identifiants (fichier `appwrite.js`) :
- Endpoint : https://fra.cloud.appwrite.io/v1
- Projet : 6b0a25f1003ce08324f1 · Base : 6b0a2ecf0012fce47e5a · Bucket : gvs_media

## 1. Plateforme web (obligatoire, sinon le navigateur bloque les requêtes)
Projet → Overview → Add platform → Web → mettre le nom de domaine du site (ex. `monsite.com`).
Pour tester en local : ajouter aussi `localhost`.

## 2. Attribut dans CHAQUE collection
Collections : `settings`, `posts`, `transactions`, `payouts`, `artists`
(la collection `duels` n'est pas encore utilisée par le code).
Créer dans chacune un attribut : **data** · type String · taille 1000000 · requis.

## 3. Compte administrateur
Auth → Users → Create user (email + mot de passe de 8+ caractères).
Ouvrir l'utilisateur → Labels → ajouter le label **admin**.

## 4. Permissions des collections (Settings → Permissions, « Document security » désactivée)
| Collection | Lire | Créer | Modifier | Supprimer |
|---|---|---|---|---|
| settings | Any | label:admin | label:admin | label:admin |
| posts | Any | Any | Any (likes/commentaires) | label:admin |
| transactions | label:admin | Any | label:admin | label:admin |
| payouts | label:admin | Any | label:admin | label:admin |
| artists | label:admin | Any | label:admin | label:admin |

## 5. Bucket gvs_media
Settings → Permissions : Lire = Any · Créer = Any · Supprimer = label:admin.
Taille max de fichier ≥ 100 Mo ; extensions autorisées : mp4, webm, mov.

## Limites connues
- « Modifier = Any » sur `posts` permet à n'importe qui de modifier une publication (nécessaire pour likes/commentaires côté navigateur). Une Appwrite Function est la vraie solution.
- L'espace artiste (connexion nom + mot de passe) ne peut pas lire les revenus en ligne : ces données sont réservées à l'admin. Pour le rendre sécurisé et multi-appareils, il faut des comptes Appwrite par artiste ou une Function.
- Le mot de passe artiste n'est jamais envoyé à Appwrite (il reste dans le navigateur de l'artiste).
