import bcrypt from 'bcryptjs';
import pool from '../../config/pg.js';  

export const createUser = async (req, res) => {
  const { email, lastname, firstname, password, confirmPassword } = req.body;

    if (!email || !lastname || !firstname || !password || !confirmPassword) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const emailCheckQuery = 'SELECT * FROM user WHERE email = $1';
    const emailCheckResult = await client.query(emailCheckQuery, [email]);
    if (emailCheckResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "les mots de passe ne correspondent pas"});      
    }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
      INSERT INTO user (email, lastname, firstname, password)
      VALUES ($1, $2, $3, $4);
    `;
    const values = [email, lastname, firstname, hashedPassword];
    await pool.query(query, values);
    return res.status(201).json({ message: "Utilisateur créé" });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    };
}