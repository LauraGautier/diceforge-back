import bcrypt from 'bcryptjs';
import pool from '../../config/pg.js';  

export const register = async (req, res) => {
  const { email, lastname, firstname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render("/signup", { error: "Les mots de passe ne scorrespondent pa." });
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

    res.redirect('/');  
  } catch (error) {
    res.render('signup', { error: error.message });
  }
};
