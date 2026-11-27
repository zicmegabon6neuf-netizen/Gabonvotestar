# GS - Gabon star (GVS) — prototype enrichi

## Nouveautés de cette version
- Recherche des vidéos, artistes et des deux artistes configurés dans le duel.
- Informations personnelles de publication (contact, numéro de dépôt et réseaux sociaux) retirées des fiches publiques et regroupées dans le répertoire de l’administration. Les réseaux sociaux sont facultatifs.
- Création d’un mot de passe artiste à la publication et espace artiste pour consulter séparément les encouragements validés et les revenus nets des duels.
- Demande de paiement artiste à partir de 5 000 FCFA, avec coordonnée de réception, suivi par l’administration et prise en compte des demandes en attente pour éviter les demandes en double.
- Soutien minimum de 100 FCFA.
- Réglage des dates/horaires du duel ; affichage d’un appel aux artistes pendant la période de publication.
- Outils d’administration pour supprimer les vidéos datées de plus de quatre ans, effacer l’historique des commissions, le répertoire des paiements ou tout l’historique local. Les suppressions demandent confirmation.
- Téléchargement des vidéos et filigrane GVS conservés.

## Utilisation
Décompresser le ZIP puis ouvrir `index.html` dans un navigateur moderne, ou héberger les fichiers sur un serveur web. Connexion administrateur initiale du prototype : `admin123` (à changer immédiatement).

## Limites importantes avant mise en ligne publique
Cette version reste un prototype front-end : les données et vidéos sont conservées dans le navigateur utilisé, et ne sont pas partagées entre visiteurs, téléphones ou ordinateurs. Le stockage du navigateur est limité : il est donc impossible de garantir un nombre réellement infini de vidéos avec cette architecture. Pour un catalogue évolutif, il faut un serveur, une base de données et un stockage vidéo distant (avec pagination/chargement progressif).

Les mots de passe artiste et administrateur dans cette version ne constituent pas une protection serveur. Un utilisateur technique peut inspecter les données locales. Pour garantir que seul l’administrateur voit les coordonnées et les revenus, il faut déplacer les comptes, mots de passe, permissions et calculs financiers dans un backend sécurisé avec mots de passe hachés et sessions authentifiées.

Les paiements ne sont pas automatiques : l’administration vérifie le dépôt hors du site et marque manuellement les demandes comme payées. Le site ne détient ni ne transfère d’argent. Ne jamais saisir un PIN ou mot de passe Mobile Money dans GVS.

Le plafond de téléversement par vidéo du prototype est de 100 Mo et l’espace réellement disponible dépend du navigateur et de l’appareil.
