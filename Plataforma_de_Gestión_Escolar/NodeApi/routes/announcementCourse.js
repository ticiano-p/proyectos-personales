import express from "express";

import { AnnouncementCourseController } from "../controllers/mongo/AnnouncementCourseController.js";

const routerAnnouncementCourse = express.Router()

routerAnnouncementCourse.get ('/:course_id', AnnouncementCourseController.getAnnouncement )

routerAnnouncementCourse.get ('/anuncio/:AnnouncementCourse_id', AnnouncementCourseController.getAnnouncementById )

routerAnnouncementCourse.post ('/', AnnouncementCourseController.createAnnouncement )

routerAnnouncementCourse.delete ('/:AnnouncementCourse_id', AnnouncementCourseController.deleteAnnouncement )

routerAnnouncementCourse.put ('/:AnnouncementCourse_id', AnnouncementCourseController.patchAnnouncement )


export default routerAnnouncementCourse