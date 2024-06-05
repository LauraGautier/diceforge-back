    /**
     * @openapi
     * /refresh-token:
     *   post:
     *     summary: Refresh the access token
     *     tags: [Authentification]
     *     description: This endpoint refreshes the access token using the refresh token provided in the request body.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               refreshToken:
     *                 type: string
     *     responses:
     *       200:
     *         description: Access token refreshed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *       403:
     *         description: Invalid refresh token
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */