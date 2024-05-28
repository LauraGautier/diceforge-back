const jwtConfig = {
    secretKey: '2dztl%-cv+@&dyjwz9848su!7wob316bn6op*ty9#&0gtuaz^',
    options: {
        expiresIn: 900, // Durée de vie du token d'authentification (15 minutes en secondes)
        refreshExpiresIn: 86400  // Durée de vie du token de rafraîchissement (1 jour en secondes)
    }
};

export default jwtConfig;