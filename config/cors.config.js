const corsOptions = {
  origin: ['http://localhost:5173', 'http://roje6147.odns.fr'], // adresse du serveur front
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, 
};

export default corsOptions;

