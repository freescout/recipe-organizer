/**
 * @openapi
 * /api/recipes/public:
 *   get:
 *     summary: Get all public recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: A list of public recipes
 */

/**
 * @openapi
 * /api/recipes/slug/{slug}:
 *   get:
 *     summary: Get a recipe by slug
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe slug
 *     responses:
 *       200:
 *         description: Recipe found
 */

/**
 * @openapi
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       201:
 *         description: Recipe created
 */

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     summary: Get all recipes created by the user
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's recipes
 */

/**
 * @openapi
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       200:
 *         description: Recipe updated
 */

/**
 * @openapi
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       204:
 *         description: Recipe deleted
 */

/**
 * @openapi
 * /api/recipes/favorites:
 *   get:
 *     summary: Get favorite recipes of the authenticated user
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite recipes
 */

/**
 * @openapi
 * /api/recipes/{id}/favorite:
 *   post:
 *     summary: Add a recipe to the user's favorites
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to favorite
 *     responses:
 *       200:
 *         description: Recipe favorited
 */

/**
 * @openapi
 * /api/recipes/{id}/favorite:
 *   delete:
 *     summary: Remove a recipe from the user's favorites
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to unfavorite
 *     responses:
 *       200:
 *         description: Recipe unfavorited
 */
