/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *         - prepTime
 *         - cookTime
 *         - servings
 *         - user
 *         - slug
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         instructions:
 *           type: string
 *         prepTime:
 *           type: integer
 *         cookTime:
 *           type: integer
 *         servings:
 *           type: integer
 *         user:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         imageUrl:
 *           type: string
 *         slug:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RecipeInput:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *         - prepTime
 *         - cookTime
 *         - servings
 *         - slug
 *       properties:
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         instructions:
 *           type: string
 *         prepTime:
 *           type: integer
 *         cookTime:
 *           type: integer
 *         servings:
 *           type: integer
 *         isPublic:
 *           type: boolean
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         imageUrl:
 *           type: string
 *         slug:
 *           type: string
 */
