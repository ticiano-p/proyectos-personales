import express, { request } from 'express'
import multer from 'multer';
import { UserController } from '../controllers/mongo/UserController.js';
import { uploaderController } from '../controllers/mongo/uploadController.js';

const routerUser = express.Router()

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req, file, cb) =>{
        cb(null, Date.now()+ '-' + file.originalname);
    }
})
const upload = multer({storage:storage})


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - gender
 *         - birthDate
 *         - dni
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           description: Género del usuario
 *         photo:
 *           type: string
 *           description: URL de la foto del usuario
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento
 *         dni:
 *           type: string
 *           description: Documento de identidad
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico
 *         address:
 *           type: string
 *           description: Dirección del usuario
 *         phone:
 *           type: string
 *           description: Teléfono del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: Último inicio de sesión
 *         active:
 *           type: boolean
 *           description: Si el usuario está activo o no
 *         role:
 *           type: string
 *           enum: [pending, student, parent, teacher, director]
 *           description: Rol del usuario
 *       example:
 *         firstName: Juan
 *         lastName: Pérez
 *         gender: Male
 *         birthDate: 2000-01-01
 *         dni: "12345678"
 *         email: juan@example.com
 *         address: Calle Falsa 123
 *         phone: "1234567890"
 *         password: "123456"
 *         active: true
 *         role: student
 */

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Return the list of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
routerUser.get("/", UserController.getUsers)
routerUser.post("/upload", upload.single('file'), uploaderController)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Return the last user created
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
routerUser.get("/lastUser", UserController.getLastsUsers)

/**
 * @swagger
 *  /users/{id}:
 *    get:
 *      summary: Get User by id
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: User id
 *      responses:
 *        200:
 *          description: an User by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        404:
 *          description: Not found user by id
 *                 
 */
routerUser.get("/:id", UserController.getUserById)

/**
 * @swagger
 *   /users/{email}/email:
 *     get:
 *       summary: get user by email
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: email
 *           schema: 
 *             type: string
 *           required: true
 *           description: user Email
 *       responses:
 *         200: 
 *           description: an User by email
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: Not found user by email
 */
routerUser.get("/:email/email", UserController.getUserByEmail)

/**
 * @swagger
 * /users/{gender}/gender:
 *   get:
 *     summary: get user list by gender
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: gender
 *         schema:
 *           type: string
 *         required: true
 *         description: User list by gender
 *     responses:
 *       200: 
 *         description: User list by gender
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found user by gender
 */
routerUser.get("/:gender/gender", UserController.getUserByGender)

/**
 * @swagger
 * /users/{firstName}/firstName:
 *   get:
 *     summary: get user list by firstName
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: firstName
 *         schema:
 *           type: string
 *         required: true
 *         description: User list by firstName
 *     responses:
 *       200: 
 *         description: User list by firstName
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found user by first name
 */
routerUser.get("/:firstName/firstName", UserController.getUserByFirstName)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201: 
 *         description: The user was successfull created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500: 
 *         description: Server Error
 */
routerUser.post("/", UserController.createUser)

/**
 * @swagger
 * /users/auth:
 *   post:
 *     summary: login an user
 *     tags: [User]
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
 *         description: The user was successfully logged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 token: 
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *       500: 
 *         description: Server Error
 */
routerUser.post("/auth", UserController.auth)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Edit user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully upload
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server Error
 */
routerUser.put("/:id", upload.single('file'), UserController.editUserById)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the user of delete
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: Not found user
 */
routerUser.delete("/:id", UserController.deleteUserById)

routerUser.post('/:id/assign-course', UserController.assignCoursesToUser);

routerUser.get("/:id/courses", UserController.getCoursesById)

routerUser.get("/shool/:id", UserController.getUserBySchool)

export default routerUser