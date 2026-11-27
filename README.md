# Gabon Vote Star (GVS) — version enrichie

## Lancer
Décompresser le ZIP puis ouvrir `index.html` dans un navigateur moderne, ou héberger le dossier sur un serveur web.

## Nouveautés ajoutées
- Téléchargement des vidéos depuis le bouton « Télécharger » (si le fichier vidéo est encore disponible dans le navigateur qui l'a stocké).
- Filigrane « GVS ★ » affiché en bas à droite de chaque vidéo.
- Formulaire de publication enrichi : coordonnées publiques, numéro de dépôt, liens Facebook, TikTok, Instagram, YouTube et légende.
- Duels configurables dans Administration : noms des deux artistes et prix du vote.
- Soutien financier manuel à un artiste : montant, nom facultatif et référence de dépôt. Les demandes apparaissent dans les transactions à valider/refuser par l'administrateur.
- Code de dépôt affiché tel que fourni : `5552062098889100*mot de passe #`.

## Sécurité des paiements et limites
- Ne saisis jamais ton PIN ou mot de passe Mobile Money sur le site. Effectue le dépôt dans le menu officiel de ton opérateur et saisis uniquement la référence de transaction sur GVS.
- Le code de dépôt fourni par l'utilisateur n'a pas été vérifié auprès de l'opérateur. Confirme son format et son fonctionnement avec Moov avant de le publier.
- GVS ne déclenche pas le paiement, ne transfère pas l'argent et ne verse pas automatiquement les soutiens à l'artiste. L'administrateur vérifie manuellement la transaction hors du site.
- Les vidéos et les données restent enregistrées localement dans le navigateur. Les vidéos ne sont pas automatiquement partagées entre visiteurs/appareils et le téléchargement d'une vidéo peut ne pas fonctionner depuis un autre appareil.
- Le mot de passe administrateur du prototype est stocké localement : ce n'est pas une sécurité suffisante pour un site public. Il faut un backend, une base de données, un stockage vidéo serveur et une authentification côté serveur pour une vraie mise en production.
- Limite de fichier vidéo : 100 Mo.
