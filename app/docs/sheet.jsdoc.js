   /**
     * @openapi
     * /sheet:
     *   get:
     *     summary: Retrieve a sheet by name
     *     tags: [Sheet]
     *     description: This endpoint retrieves a sheet by its name.
     *     parameters:
     *       - in: query
     *         name: name
     *         required: true
     *         schema:
     *           type: string
     *         description: The sheet name.
     *     responses:
     *       200:
     *         description: Sheet retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                   description: The name of the sheet.
     *                 // Example of additional properties:
     *                 data:
     *                   type: array
     *                   description: Data contained in the sheet.
     *                   items:
     *                     type: object
     *                     properties:
     *                       // Define properties of data items
     *       404:
     *         description: Sheet not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     */

    /**
 * @openapi
 * /sheet:
 *   post:
 *     summary: Create a new sheet
 *     tags: [Sheet]
 *     description: This endpoint creates a new sheet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add the properties of the sheet object here
 *     responses:
 *       201:
 *         description: Sheet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Add the properties of the created sheet object here
 */

  /**
     * @openapi
     * /sheet/{name}:
     *   patch:
     *     summary: Update a sheet by name
     *     tags: [Sheet]
     *     description: This endpoint updates a sheet by its name.
     *     parameters:
     *       - in: path
     *         name: name
     *         required: true
     *         schema:
     *           type: string
     *         description: The sheet name.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               image:
     *                 type: string
     *                 description: URL or identifier of the image associated with the sheet.
     *               class:
     *                 type: string
     *                 description: Classification or category of the sheet.
     *               level:
     *                 type: integer
     *                 description: Level or priority of the sheet.
     *     responses:
     *       200:
     *         description: Sheet updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 data:
     *                   type: array
     *                   description: Data contained in the sheet.
     *                   items:
     *                     type: object
     *                     properties:
     *                       // Define specific properties of data items here
     *       404:
     *         description: Sheet not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     */

      /**
     * @openapi
     * /sheet/{id}:
     *   delete:
     *     summary: Delete a sheet
     *     tags: [Sheet]
     *     description: Deletes a sheet by its unique ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Unique identifier of the sheet to delete.
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: No Content, sheet deleted successfully.
     *       404:
     *         description: Not Found, sheet not found.
     */