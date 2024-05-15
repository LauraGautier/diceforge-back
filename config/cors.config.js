import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // mettre l'adresse de votre serveur front
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, 
};

export default cors(corsOptions);