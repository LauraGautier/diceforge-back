const jwtConfig = {
    secretKey: process.env.JWT_SECRET,
    options: {
        expiresIn: 900, // Durée de vie du token d'authentification (15 minutes en secondes)
        refreshExpiresIn: 86400  // Durée de vie du token de rafraîchissement (1 jour en secondes)
    }
};

export default jwtConfig;