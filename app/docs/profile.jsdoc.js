    /**
     * @openapi
     * /profile:
     *   get:
     *     summary: Retrieve profile information
     *     description: Retrieve the profile information from the database.
     *     tags: [Profile]
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 email:
     *                   type: string
     *                 created_at:
     *                   type: string
     *                   format: date-time
     *                 updated_at:
     *                   type: string
     *                   format: date-time
     */

    /**
     * @openapi
     * /profile:
     *   patch:
     *     summary: Update profile information
     *     tags: [Profile]
     *     description: Update the profile information in the database.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               created_at:
     *                 type: string
     *                 format: date-time
     *               updated_at:
     *                 type: string
     *                 format: date-time
     *     responses:
     *       200:
     *         description: Profile information updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Profile'
     */