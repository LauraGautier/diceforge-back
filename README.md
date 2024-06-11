# Dice Forge (Back)

Ce projet a été réalisé dans le cadre de la présentation au Titre Professionnel "Développeur Web & Web Mobile" de juillet 2024.

## Prérequis

- Node.js (version 18.x ou supérieure)
- npm (version 6.x ou supérieure)

## Installation

1. **Cloner le répertoire :**

    ```bash
    git clone https://github.com/username/backend-repo.git backend
    cd backend
    ```

2. **Installer les dépendances :**

    ```bash
    npm init --yes
    npm install -g pnpm
    pnpm install
    ```

## Configuration

1. **Créer un fichier `.env` à la racine du projet :**

    ```bash
    touch .env
    # Copier le contenu de `.env.example` dans `.env` et remplir les valeurs.
    cp .env.example .env
    ```

2. **Ajouter les variables d'environnement nécessaires dans `.env` :**

    ```env
    PORT=3000
    SESSION_SECRET=whatisthesecretkeyforbettersecurityandgetanhighestpower

    EMAIL_USER=diceforgeteam@outlook.com
    EMAIL_PASS=Bfljb1307

    DB_USER=default
    DB_HOST=ep-wispy-fog-a2bpzouz-pooler.eu-central-1.aws.neon.tech
    DB_NAME=diceforge
    DB_PASSWORD=TcUw08hWZCmq
    DB_PORT=5432

    JWT_SECRET=z98$x7CkKjL9z*n2q6Mz$BzX7!z*8vMn3zX5CpPmZx$7XJkKpZx7$C
    API_DOCUMENTATION=/api-docs
    ```

3. **Ajouter le fichier `.env` au fichier `.gitignore` :**

    ```bash
    echo ".env" >> .gitignore
    ```

4. **Installer PostgreSQL et Sqitch :**

    #### Pour Linux et macOS :
    ```bash
    sudo apt update
    sudo apt install postgresql sqitch
    ```

    #### Pour Windows :
    Téléchargez et installez PostgreSQL depuis [le site officiel](https://www.postgresql.org/download/windows/). Ensuite, installez Sqitch en utilisant [chocolatey](https://chocolatey.org/install) :
    ```powershell
    choco install sqitch -y
    ```

5. **Créer la base de données :**

    #### Pour Linux et macOS :
    ```bash
    sudo -u postgres psql
    CREATE DATABASE diceforge; # ou un autre nom de votre choix
    CREATE USER diceforge WITH PASSWORD 'votre-mot-de-passe';
    GRANT ALL PRIVILEGES ON DATABASE diceforge TO diceforge;
    \q # pour quitter
    ```

    #### Pour Windows :
    Ouvrez `SQL Shell (psql)` et exécutez les commandes suivantes :
    ```sql
    CREATE DATABASE diceforge; # ou un autre nom de votre choix
    CREATE USER diceforge WITH PASSWORD 'votre-mot-de-passe';
    GRANT ALL PRIVILEGES ON DATABASE diceforge TO diceforge;
    \q # pour quitter
    ```

6. **Déployer la base de données :**

    ```bash
    sqitch deploy
    ```

## Utilisation

1. **Démarrer le serveur de développement :**
    Dans le répertoire backend, exécutez la commande suivante :

    ```bash
    npm run dev
    ```

2. **Construire le projet pour la production :**

    ```bash
    npm run build
    ```

3. **Exécuter les tests :**

    ```bash
    npm test
    ```
    
## Équipe du Projet

### Projet réalisé par :

- Laura GAUTIER - Project Manager & Front-end Developer
- Benjamin BEAUVALLET - Product Owner & Back-end Developer
- Fabien NICOLA - Git Master & Front-end Developer
- Thomas BASTIEN - Lead Developer Front
- Jérémie ROCQUET - Lead Developer Back

## Copyright

Ecole O'clock - 2024

