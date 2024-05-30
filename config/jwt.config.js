const jwtConfig = {
    secretKey: process.env.JWT_SECRET,
    options: {
        accessExpiresIn: '15m', // Durée de vie du token d'authentification
        refreshExpiresIn: '1d' // Durée de vie du token de rafraîchissement 
    }
};

export default jwtConfig;
