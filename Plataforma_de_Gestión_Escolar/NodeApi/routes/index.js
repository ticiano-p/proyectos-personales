import  routerUser  from './userRouter.js';
import  routerSchool  from './schoolsRouter.js';
import routerPayment from './paymentRouter.js';
import routerAnnouncement from './announcementRouter.js';
import routerAnnouncementCourse from './announcementCourse.js';
import routerCourses from './CoursesRouter.js';

 function routerApi(app){
    app.use('/users', routerUser)
    app.use('/school', routerSchool)
    app.use('/announcement', routerAnnouncement)
    app.use('/AnnouncementCourse', routerAnnouncementCourse)

    app.use('/payment', routerPayment)
    app.use('/courses', routerCourses)

}
export default routerApi
