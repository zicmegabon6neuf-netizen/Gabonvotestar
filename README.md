# Gabon Vote Star — prototype modifié

## Lancer
Décompresser le ZIP puis ouvrir `index.html` dans un navigateur moderne, ou héberger le dossier sur un serveur web statique.

## Nouveautés
- Connexion à l'espace administrateur (mot de passe initial : `admin123`). Change ce mot de passe après connexion, dans « Sécurité administrateur ».
- Gestion des publications dans l'administration : suppression avec confirmation et copie du lien individuel.
- Chaque publication dispose d'un lien direct de type `?video=ID`; le lien ouvre et met en évidence la vidéo correspondante.
- Paramètres, transactions et publications sauvegardés dans le stockage local du navigateur (`localStorage`).
- Les vidéos choisies sont converties en données locales pour tenter de les conserver après rechargement.

## Limites importantes
Ce dossier reste un prototype frontend. Le stockage est propre au navigateur/appareil et peut être limité (les fichiers vidéo volumineux peuvent dépasser le quota). La suppression ne synchronise pas d'autres appareils. Le mot de passe est stocké localement et n'est pas une authentification sécurisée : un utilisateur technique peut le contourner. Pour le site public, il faut un backend, une base de données, une authentification serveur, un stockage vidéo et des droits administrateur. Les paiements Moov Money ne sont pas déclenchés ni vérifiés automatiquement.

Ne demandez jamais le PIN Moov Money aux utilisateurs.


Limite de fichier vidéo : 100 Mo. Les fichiers vidéo sont enregistrés dans IndexedDB du navigateur, séparément du localStorage, pour éviter la limite de taille du localStorage. Ceci reste une sauvegarde locale au navigateur; pour un site public multi-visiteurs, configurez aussi l'hébergement/serveur pour autoriser 100 Mo et stocker les vidéos côté serveur.
