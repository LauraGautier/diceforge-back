  /**
     * @openapi
     * /login:
     *   post:
     *     summary: User login
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - email
     *               - password
     *     responses:
     *       200:
     *         description: User logged in successfully
     */

  /**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Registers a new user in the system, ensuring they meet validation criteria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastname
 *               - firstname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *               confirmPassword:
 *                 type: string
 *                 description: A confirmation of the password for validation purposes.
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming user creation.
 *       400:
 *         description: Invalid input, details provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message related to user input validation.
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *       409:
 *         description: Email already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message stating the email is already used.
 */