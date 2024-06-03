 /**
     * @openapi
     * /game/{id}:
     *   get:
     *     summary: Get game by ID
     *     tags: [Games]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the game to get
     *         schema:
     *           type: integer
    */

 /**
     * @openapi
     * /game:
     *  post:
     *    summary: Create a new game
     *    tags: [Games]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              name:
     *                type: string
     *              music:
     *                type: string
     *              note:
     *                type: string
     *              license_name:
     *                type: string
     *              email:
     *                type: string
     *            required:
     *              - name
     *              - license_name
     *              - email
     *    responses:
     *      201:
     *        description: Game created
     *      400:
     *        description: Missing required fields or license not found
     *      401:
     *        description: User not logged in
     *      500:
     *        description: Internal server error
     */

/**
 * @openapi
 * /game/{id}:
 *   put:
 *     summary: Update a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the game
 *               music:
 *                 type: string
 *                 description: Background music choice
 *               note:
 *                 type: string
 *                 description: Additional notes
 *               event:
 *                 type: string
 *                 description: Event associated with the game
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 music:
 *                   type: string
 *                 note:
 *                   type: string
 *                 event:
 *                   type: string
 *       404:
 *         description: Game not found
 *       400:
 *         description: Invalid input, object invalid
 */

    /**
     * @openapi
     * /game/{id}:
     *   delete:
     *     summary: Delete a game
     *     tags: [Games]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the game to delete
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Game deleted successfully
     *       404:
     *         description: Game not found
     *       500:
     *         description: Internal server error
    */

/**
 * @openapi
 * /game/user/{id}:
 *   get:
 *     summary: Get games by user ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get games from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Games found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   music:
 *                     type: string
 *                   note:
 *                     type: string
 *                   event:
 *                     type: string
 *                   license_name:
 *                     type: string
 *                   invitation_token:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   role:
 *                     type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */