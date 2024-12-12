
# Configuration et Installation du Projet

Ce document décrit les étapes pour configurer et tester l'application en local.

## Prérequis

Assurez-vous d'avoir installé les logiciels suivants :

- Node.js
- npm (Node Package Manager)
- WampServer (ou un autre serveur local de votre choix)
- Prisma CLI

## Étapes pour Exécuter l'Application en Local

### 1. Installer les Dépendances
Pour installer les dépendances nécessaires, exécutez la commande suivante dans votre terminal :
```bash
npm install
```

### 2. Lancer le Serveur Local
Lancez votre serveur local. Pour ce projet, je recommande **WampServer**, mais vous pouvez utiliser tout autre serveur local de votre choix.

### 3. Configurer la Connexion à la Base de Données
Assurez-vous que le fichier `.env` est correctement configuré pour votre connexion à la base de données locale. Ce fichier doit contenir l'URL de connexion à la base de données ainsi que les identifiants nécessaires.

### 4. Générer les Modèles Prisma
Exécutez la commande suivante pour générer les modèles de votre ORM (Prisma) :
```bash
npx prisma generate
```

### 5. Initialiser les Tables de la Base de Données
Exécutez la commande suivante pour initialiser les tables de la base de données :
```bash
npx prisma db push
```

### 6. Importer les Données Initiales
Importez le fichier des données dans votre base de données. Le fichier SQL se trouve dans le dossier **resources** et porte le nom `bdd-init.sql`. Utilisez votre méthode préférée pour importer ce fichier SQL dans votre base de données.

### 7. Lancer l'Application
Enfin, lancez l'application en exécutant la commande suivante :
```bash
npm run dev
```

Une fois ces étapes complétées, votre application devrait être opérationnelle en local.

## Outils et Dépendances Utilisées

- **Next.js** : Framework React pour construire l'interface utilisateur du projet.
- **Prisma** : ORM pour la gestion de la base de données, utilisé pour interagir avec la base de données de manière fluide et sécurisée.
- **Tailwind CSS** : Framework CSS pour la création d'interfaces utilisateurs modernes et réactives.
- **ShadCN UI** : Bibliothèque d'interface utilisateur permettant de concevoir des composants réutilisables et stylisés.
- **TypeScript** : Langage de programmation statiquement typé, utilisé pour améliorer la robustesse du code JavaScript.
- **jsPDF** : Bibliothèque permettant de générer des fichiers PDF, utilisée ici pour la génération de factures téléchargeables.

## Fonctionnalités Actuelles de l'Application

### Liste de Produits
L'application permet de gérer une liste de produits dans un tableau avec les informations suivantes : nom, prix, quantité, etc. Une synthèse des produits est affichée sous forme de total des ventes et achats, avec un graphique illustrant ces données.

### Liste des Elève
Une liste d'elève est également présente, permettant d'ajouter ou de supprimer des elèves. Pour chaque elève, des informations détaillées sont visibles (nom, âge, note, etc.). Les données peuvent être facilement modifiées.

### Page des Employés
La page des employés affiche une liste complète avec la possibilité d'ajouter et de supprimer des employés. Des graphiques statistiquent des informations relatives aux employés (par exemple, âge moyen, nombre d'employés par département, etc.).

### Page de Facturation
Une page dédiée à la facturation permet de créer une facture pour un client, avec la possibilité de la télécharger en format PDF via jsPDF.

### Page de Connexion
La page de connexion permet aux utilisateurs de se connecter et de se connecter.

### Page de Création d'Utilisateur
La page de création d'utilisateur permet aux administrateurs de créer des nouveaux utilisateurs.

### Page de Modification de Profil
La page de modification de profil permet aux utilisateurs de modifier leurs informations personnelles.

### URL du production
L'application est accessible à l'adresse suivante : https://tp-excel.wbpro.fr