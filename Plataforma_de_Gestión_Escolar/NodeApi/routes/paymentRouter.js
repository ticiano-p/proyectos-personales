import express from "express";

import { PaymentController } from "../controllers/mongo/PaymentController.js";

const routerPayment = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *    Payment:
 *      type: object
 *      required:
 *        - issuedTo
 *        - concept
 *        - amount
 *        - dueDate
 *        - paymentType
 *      properties:
 *        _id:
 *          type: string
 *          description: ID autogenerado del pago
 *        issuedTo:
 *          type: string
 *          description: ID del usuario al que se le emitió el pago (referancia a User)
 *        schoolId:
 *          type: string
 *          nullable: true
 *          description: ID de la escuela asociada (referancia a School)
 *        concept:
 *          type: string
 *          description: Concepto del pago (ejemplo inscripción, cuota, etc.)
 *        amount:
 *          type: number
 *          format: float
 *          description: Monto del pago
 *        dueDate:
 *          type: string
 *          format: date
 *          description: Fecha de vencimiento del pago
 *        issuedAt:
 *          type: string
 *          format: date-time
 *          description: Fecha en que fue emitido el pago
 *        status:
 *          type: string
 *          enum: [pending, paid, overdue]
 *          description: Estado del pago
 *        paidAt:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          description: Fecha en que fue pagado
 *        paymentMethod:
 *          type: string
 *          enum: [cash, transfer, card]
 *          nullable: true
 *          description: Método de pago
 *        paymentType:
 *          type: string
 *          enum: [create_school]
 *          description: Tipo de pago
 *      example:
 *        _id: "6634c10a3b412d001c4a3a6a"
 *        issuedTo: "6634be7e3b412d001c4a3a5d"
 *        schoolId: "6634bf303b412d001c4a3a5f"
 *        concept: "Inscripción anual"
 *        amount: 12000.50
 *        dueDate: "2025-06-01"
 *        issuedAt: "2025-05-01T10:00:00.000Z"
 *        status: "pending"
 *        paidAt: null
 *        paymentMethod: null
 *        paymentType: "create_school"
 */

/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment-related operations
 */

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Return the list of all payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Payment List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
routerPayment.get('/', PaymentController.getPayments )

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Return the list of all unapproved payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Payment List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
routerPayment.get('/unapproved', PaymentController.getPaymentsUnapproved )

/**
 * @swagger
 * /payment:    
 *   post:
 *     summary: create a new payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: The payment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server Error 
 */
routerPayment.post('/', PaymentController.createPayment )

/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Edit user by id
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the payment tu update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200: 
 *         description: The payment was successfully upload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server Error
 */
routerPayment.put('/:id', PaymentController.editPayment )

/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete payment by id
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the payment of delete
 *     responses:
 *       200:
 *         description: The payment was successfully deleted
 *       404:
 *         description: Not found payment
 */
routerPayment.delete('/:id', PaymentController.deletePayment )

routerPayment.get('/:idUser/User', PaymentController.getPaymentUserId )
routerPayment.get('/:idUser/Users', PaymentController.getAllPaymentUserId )

routerPayment.get('/issuedTo/:idShool', PaymentController.getPaymentid )

routerPayment.get('/issuedToPaid/:idShool', PaymentController.getPaymentidPaid )
export default routerPayment