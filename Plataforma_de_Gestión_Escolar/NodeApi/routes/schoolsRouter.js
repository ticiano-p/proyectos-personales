import express from 'express'

import { schoolController } from '../controllers/mongo/SchoolsController.js'

const routerSchool = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       required:
 *         - user_id
 *         - name
 *         - CUE
 *         - address
 *         - city
 *         - province
 *         - phones
 *         - emails
 *         - level
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de la escuela
 *         user_id:
 *           type: string
 *           description: ID del usuario que creó la escuela (referencia User)
 *         name:
 *           type: string
 *           description: Nombre de la institución educativa
 *         CUE:
 *           type: string
 *           description: Código Único de Establecimiento
 *         address:
 *           type: string
 *           description: Dirección de la escuela
 *         city:
 *           type: string
 *           description: Ciudad de la escuela
 *         province:
 *           type: string
 *           description: Provincia de la escuela
 *         phones:
 *           type: array
 *           items:
 *             type: string
 *           description: Teléfonos de contacto
 *         emails:
 *           type: array
 *           items:
 *             type: string
 *             format: email
 *           description: Correos electrónicos institucionales
 *         creation_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         level:
 *           type: string
 *           description: Nivel educativo (ejemplo primario, secundario, etc.)
 *         type:
 *           type: string
 *           description: Tipo de institución (pública o privada)
 *       example:
 *         _id: "6634d90a3b412d001c4a3a70"
 *         user_id: "6634be7e3b412d001c4a3a5d"
 *         name: "Escuela Técnica N°1"
 *         CUE: "123456789"
 *         address: "Av. Siempre Viva 742"
 *         city: "Buenos Aires"
 *         province: "Buenos Aires"
 *         phones: ["1122334455", "1199887766"]
 *         emails: ["info@tecnica1.edu.ar", "contacto@tecnica1.edu.ar"]
 *         creation_date: "2025-05-03T10:00:00.000Z"
 *         level: "Secundario"
 *         type: "Pública"
 */

/**
 * @swagger
 * tags:
 *   - name: School
 *     description: School-related operations   
 */

/**
 * @swagger
 * /school:
 *   get:
 *     summary: Return the list of all schools
 *     tags: [School]
 *     responses:
 *       200:
 *         description: school List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 */
routerSchool.get("/", schoolController.getSchool)

/**
 * @swagger
 * /school:
 *   get:
 *     summary: Return the last schools created
 *     tags: [School]
 *     responses:
 *       200:
 *         description: School List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 */
routerSchool.get("/lastSchool", schoolController.getLastsSchools)

/**
 * @swagger
 * /school/{id}:
 *   get:
 *     summary: Get school by ID
 *     tags: [School]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: an User by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found user by id
 */
routerSchool.get("/:id", schoolController.getSchoolId)

/**
 * @swagger
 * /school/{province}/province:
 *   get:
 *     summary: Get School by province
 *     tags: [School]
 *     parameters:
 *       - in: path
 *         name: province
 *         schema: 
 *           type: string
 *         required: true
 *         description: school province
 *     responses: 
 *       200: 
 *         description: A School by province
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *       404:
 *         description: Not found school by province
 * 
 */
routerSchool.get("/:province/province", schoolController.getSchoolProvince)

/**
 * @swagger
 *   /school/{type}/type:
 *     get:
 *       summary: Get School by types
 *       tags: [School]
 *       parameters:
 *         - in: path
 *           name: type
 *           schema: 
 *             type: string
 *           required: true
 *           description: School Type
 *       responses:
 *         200:
 *           description: A school by type
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/School'
 *         404:
 *           description: Not found school by type
 */
routerSchool.get("/:type/type", schoolController.getSchoolType)

/**
 * @swagger
 *   /school/{name}/name: 
 *     get:
 *       summary: Get School by name
 *       tags: [School]
 *       parameters:
 *         - in: path
 *           name: name
 *           schema: 
 *             type: string
 *           required: true
 *           description: A School by name
 *       responses:
 *         200:
 *           description: A School by name
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/School'
 *         404:
 *           description: Not found School by name
 */
routerSchool.get("/:name/name", schoolController.getSchoolName)

/**
 * @swagger
 *   /school:
 *     post:
 *       summary: create a new School
 *       tags: [School]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       responses:
 *         201: 
 *           description: The School was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/School'
 *         500:
 *           description: Server Error
 */
routerSchool.post("/", schoolController.createSchool)

/**
 * @swagger
 *   /school/{id}:
 *     put:
 *       summary: Edit School by ID
 *       tags: [School]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the School to update
 *       requestBody: 
 *         required: true
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       responses: 
 *         200: 
 *           description: Te School was successfully upload
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/School'
 *         500:
 *           description: Server Error 
 */
routerSchool.put("/:id", schoolController.editSchoolId)

/**
 * @swagger
 * /school/{id}:
 *   delete:
 *     summary: Delete School by id
 *     tags: [School]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the School of delete
 *     responses:
 *       200:
 *         description: The School was successfully deleted
 *       404:
 *         description: Not found School
 */
routerSchool.delete("/:id", schoolController.deleteSchoolId)

export default routerSchool
