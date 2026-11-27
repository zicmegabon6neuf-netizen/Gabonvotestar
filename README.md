# Gabon Vote Star — prototype

## Lancer
Ouvrir `index.html` dans un navigateur moderne, ou servir le dossier avec un serveur local.

## Inclus
- Fil de vidéos et interactions de démonstration
- Publication de vidéo locale (non persistante)
- Duel de deux artistes
- Demande de vote avec code Moov Money et référence de transaction
- Admin : approbation/refus, paramètres, calcul de commission de démonstration, export CSV

## Limites importantes
Ceci est un prototype frontend. Les données restent en mémoire et se réinitialisent au rechargement. Les vidéos ne sont pas envoyées à un serveur. Aucun paiement Moov Money n'est déclenché ou vérifié automatiquement. Les votes approuvés et commissions sont uniquement des données de démonstration.

Pour une mise en production, il faut un backend/API, base de données, authentification et rôles admin, stockage vidéo, validation des paiements auprès de Moov Money ou par rapprochement sécurisé, protections anti-fraude et conformité locale. Ne demandez jamais le PIN Moov Money aux utilisateurs.
