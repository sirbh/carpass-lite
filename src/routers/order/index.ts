import express, { RequestHandler } from "express";
import {
  validateCreateOrder,
  // validateDeleteOrder,
  // validateGetOrderPrice,
  // validateUpdateOrder,
} from "../../middleware/validate/order";
// import {
//   createOrder,
//   deleteOrder,
//   getOrderPrice,
//   getOrders,
//   getSections,
//   updateOrderStatus,
// } from "../../controllers/order";
import { TokenExtractor } from "../../middleware";

const router = express.Router();

/**
 * @openapi
 * /api/v1/order/price:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get price of order
 *     description: Get price of order in cents based on report_type and section_ids
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: report_type
 *         description: Type of report
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - light
 *             - full
 *             - narrow
 *       - in: query
 *         name: engine_type
 *         description: Type of engine
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - diesel
 *             - petrol
 *             - electric
 *             - hybrid
 *             - hybrid_diesel
 *             - hybrid_gasoline
 *       - in: query
 *         name: sections
 *         description: Sections for the report
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *     responses:
 *       200:
 *        description: Order price in cents
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_total:
 *                 type: number
 *                 format: int64
 *             example:
 *               order_total: 3000
 */
// router.get("/price", validateGetOrderPrice, getOrderPrice as RequestHandler);

/**
 * @openapi
 * /api/v1/order/sections:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get list of sections
 *     description: Get list sections of report
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *        description: List of sections
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Section'
 */
router.get(
  "/sections",
  TokenExtractor as RequestHandler,
  // getSections as RequestHandler
);

/**
 * @openapi
 * /api/v1/order:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create order
 *     description: Create order based on report_type and section_ids
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetails'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *        description: Created order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */
router.post(
  "/",
  validateCreateOrder,
  TokenExtractor as RequestHandler,
  // createOrder as RequestHandler
);

/**
 * @openapi
 * /api/v1/order:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get orders
 *     description: Get orders based on status
 *     security:
 *       - bearerAuth: []
  *     responses:
 *       200:
 *        description: List of orders
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Order'
 */
// router.get("/", TokenExtractor as RequestHandler, getOrders as RequestHandler);

/**
 * @openapi
 * /api/v1/order:
 *   put:
 *     tags:
 *       - Order
 *     summary: Update order status
 *     description: Update order status based on order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderStatus'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *        description: Updated order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */
// router.put("/", validateUpdateOrder, TokenExtractor as RequestHandler, updateOrderStatus as RequestHandler);

// router.delete("/", validateDeleteOrder, TokenExtractor as RequestHandler, deleteOrder as RequestHandler);

export default router;
