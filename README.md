# Project Name

A brief description of the project and its features.

## Prerequisites

- Node.js (version 18.x or higher)
- npm (version 6.x or higher)

## Installation

1. **Clone the repositories:**

    ```bash
    git clone https://github.com/username/backend-repo.git backend
    git clone https://github.com/username/frontend-repo.git frontend
    cd backend
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm init --yes
    npm install -g pnpm
    pnpm install
    ```

## Configuration

If the project requires specific configurations, add the details here. For example, configuring environment variables.

1. **Create a `.env` file at the root of the project:**

    ```bash
    touch .env
    # Copy the contents of `.env.example` to `.env` and fill in the values.
    cp .env.example .env
    ```

2. **Add the necessary environment variables in `.env`:**

    ```env
    DB_HOST=localhost
    DB_USER=<your username>
    DB_PASS=<your password>
    ```

3. **Add the `.env` file to the `.gitignore` file:**

    ```bash
    echo ".env" >> .gitignore
    ```

4. **install postgresql and sqitch :**

    ```bash
    sudo apt update
    sudo apt install postgresql sqitch
    ```

5. **Create a database:**

    ```bash
    sudo -u postgres psql
    CREATE DATABASE diceforge; # or other name you want
    CREATE USER diceforge WITH POASSWORD 'your-password';
    GRANT ALL PRIVILEGES ON DATABASE diceforge TO diceforge;
    \q # to quit
    ```

6. **Deploy the database:**

    ```bash
    sqitch deploy
    ```

## Usage

Describe how to use the project. This can include commands to start the server, run tests, etc.

1. **Start the development server:**
    In the backend directory and frontend directories, run the following command:

    ```bash
    npm run dev
    ```

2. **Build the project for production:**

    ```bash
    npm run build
    ```

3. **Run tests:**

    ```bash
    npm test
    ```

## Contribution Guidelines git commands

Explain how others can contribute to the project.

1. **Fork the repository**
2. **Create a feature branch:**

    ```bash
    git checkout -b feature/feature-name
    ```

3. **Commit your changes:**

    ```bash
    git commit -m 'Add a new feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/feature-name
    ```

5. **Create a Pull Request**

## License

Specify the project license. For example:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Add any other relevant information here, such as credits or links to documentation.
