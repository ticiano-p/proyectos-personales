import express from "express";

import { AnnouncementController } from "../controllers/mongo/AnnouncementController.js";

const routerAnnouncement = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       required:
 *         - school_id
 *         - user_id
 *         - message
 *       properties:
 *         school_id:
 *           type: string
 *           description: ID de la escuela relacionada
 *         user_id:
 *           type: string
 *           description: ID del usuario que hizo el anuncio
 *         message:
 *           type: string
 *           description: Contenido del anuncio
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del anuncio
 *       example:
 *         school_id: "661e5b38cbbc3e5a452ddaa9"
 *         user_id: "661e5a02cbbc3e5a452ddaa3"
 *         message: "El próximo lunes no habrá clases por mantenimiento."
 *         create_at: "2025-05-03T14:30:00Z"
 */

/**
 * @swagger
 * tags:
 *   - name: Announcement
 *     description: Announcement-related operations
 */

/**
 * @swagger
 * /announcement/{school_id}:
 *   get:
 *     summary: Return the list of all announcements
 *     tags: [Announcement]
 *     parameters:
 *       - in: path
 *         name: school_id
 *         schema: 
 *           type: string
 *         required: true
 *         description: School id
 *     responses:
 *       200:
 *         description: Announcement List
 *         content: 
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Not found Announcement by school
 */
routerAnnouncement.get ('/:school_id', AnnouncementController.getAnnouncement )

/**
 * @swagger
 * /announcement:
 *   post:
 *     summary: create a new Announcement
 *     tags: [Announcement]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Announcement'
 *     responses:
 *       201: 
 *         description: The Announcement was successfully created
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       500:
 *         description: Server Error
 */
routerAnnouncement.post ('/', AnnouncementController.createAnnouncement )

/**
 * @swagger
 * /announcement/{announcement_id}:
 *   delete:
 *     summary: Delete Announcement by id
 *     tags: [Announcement]
 *     parameters:
 *       - in: path
 *         name: announcement_id
 *         required: true
 *         schema: 
 *           type: string
 *           description: Id of the announcement to delete
 *     responses: 
 *       200: 
 *         description: The Announcement was successfully deleted
 *       500: 
 *         description: Not found announcement
 */
routerAnnouncement.delete ('/:announcement_id', AnnouncementController.deleteAnnouncement )

/**
 * @swagger
 * /announcement/{announcement_id}:
 *   patch:
 *     summary: Partially update an announcement
 *     tags: [Announcement]
 *     parameters:
 *       - in: path
 *         name: announcement_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the announcement to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               user_id:
 *                 type: string
 *             example:
 *               message: "Updated message content"
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Server error
 */
routerAnnouncement.put ('/:announcement_id', AnnouncementController.patchAnnouncement )

routerAnnouncement.get ('/anuncio/:announcement_id', AnnouncementController.getAnnouncementById )

export default routerAnnouncement