const corsOptions = {
  origin: 'http://localhost:5173', // mettre l'adresse du serveur front
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, 
};

export default corsOptions;
