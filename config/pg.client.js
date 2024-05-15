import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'spedata',        
  host: 'localhost',             
  database: 'diceforge',    
  password: '',    
  port: 5432,                    
});

export default pool;
