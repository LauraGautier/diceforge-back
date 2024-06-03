/**
 * @openapi
 * /licenses:
 *   get:
 *     summary: Get all licenses
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: Licenses successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: integer
 *               required:
 *                 - id
 *                 - name
 *                 - description
 *                 - price
 */