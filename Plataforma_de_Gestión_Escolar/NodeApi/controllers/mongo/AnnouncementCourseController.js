import { AnnouncementCourseModel } from "../../models/mongo/AnnouncementCourseModel.js";
import { UserModel } from "../../models/mongo/UserModel.js"
import { CoursesModel } from "../../models/mongo/CoursesModel.js";


export class AnnouncementCourseController {

    static async createAnnouncement(req, res){
        try {
            const data = req.body
            const existUser = UserModel.findOne({ 
                "_id": data.user_id
            })
            if( !existUser ){
                res.status(403).json({
                    message: "Error al crear un mensaje"
                })
            }
            const existSchool = CoursesModel.findOne({
                "_id": data.Courses_id
            }) 
            if( !existSchool ){
                res.status(403).json({
                    message: "Error al crear un mensaje"
                })
            }
            const newAnnouncement = new AnnouncementCourseModel(data)
            await newAnnouncement.save()
            res.json({
                message: "Mensaje creado correctamente."
            })

        } catch (error) {
            res.status(500).json({
                message: "Error al momento de crear un mensaje",
                error
            })
        }
    }

    static async getAnnouncement(req, res){
        try {
            const course_id = req.params.course_id
            const data = await AnnouncementCourseModel.find({
                course_id: course_id
            })
            if ( !data ){
                res.status(404).json({
                    message: "Mensajes no encontrados"
                })
            }
            res.json({
                data    
            })
        } catch (error) {
            res.status(500).json({
                message: "Error al buscar los mensajes"
            })
        }        
    }

    static async getAnnouncementById(req, res) {
        try {
            const announcement = await AnnouncementCourseModel.findById(req.params.AnnouncementCourse_id);
            if (!announcement) {
                return res.status(404).json({
                    message: "No se encontró el mensaje solicitado."
                });
            }
            res.json({
                data: announcement
            });
        } catch (error) {
            console.error('Error en getAnnouncementById:', error);
            res.status(500).json({
                message: "Error al obtener el mensaje",
                error
            });
        }
    }
    
    static async patchAnnouncement(req, res){
        try {
            const announcement_id = req.params.AnnouncementCourse_id
            const { message } = req.body
            if(message.trim().length < 1){
                res.status(403).json({
                    message: "Debes incluir un mensaje para guardar."
                })
            }
            const editMessage = await AnnouncementCourseModel.findByIdAndUpdate( 
                announcement_id,
                { message: message }
            )
            if( !editMessage ){
                res.status(404).json({
                    message: "El mensaje que quieres editar no ha sido encontrado."
                })
            }
            res.json({
                message: "El mensaje fue editado correctamente."
            })
        } catch (error) {
            res.status(500).json({
                message: "Error al momento de editar un mensaje",
                error
            })
        }
    }
    
    static async deleteAnnouncement(req, res){
        try {
            const announcement_id = req.params.AnnouncementCourse_id
            const deleteAnnouncement = await AnnouncementCourseModel.findByIdAndDelete( announcement_id )
            if( !deleteAnnouncement ){
                res.status(404).json({ 
                    message: 'El mensaje que quieres borrar no fue encontrado.'}
                )
            }
            res.json({
                message: 'El mensaje fue borrado.'
            })
        } catch (error) {
            res.status(500).json({
                message: "Error al querer borrar el mensaje.",
                error
            })
        }
    }
}
