/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             _id:
 *              type: string
 *              example: 64f27ea9e72abc1234567890
 *             name:
 *              type: string
 *              example: Alice
 *             email:
 *              type: string
 *              format: email
 *              example: alice@example.com
 *             token:
 *              type: string
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Email already in use or invalid input
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in a user and return a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid email or password
 */
