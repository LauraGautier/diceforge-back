/**
 * @openapi
 * /forgot-password:
 *   post:
 *     summary: Request password reset
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
 *                 example: "user@example.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 *       500:
 *         description: Error sending email
 */

    /**
     * @openapi
     * /resetPassword:
     *   post:
     *     summary: Reset user password
     *     tags: [Password]
     *     description: This endpoint allows for a user to reset their password.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - token
     *               - id
     *               - password
     *               - confirmPassword
     *             properties:
     *               token:
     *                 type: string
     *                 description: The token for password reset.
     *               id:
     *                 type: integer
     *                 description: The user's id.
     *               password:
     *                 type: string
     *                 description: The new password.
     *               confirmPassword:
     *                 type: string
     *                 description: The new password confirmation.
     *     responses:
     *       200:
     *         description: Password reset successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Success message.
     *       400:
     *         description: Bad request, token or id missing or passwords do not match or invalid or expired token.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     */