import { CoursesModel } from '../../models/mongo/CoursesModel.js'

export class coursesController {

    static async getAllCourses (req,res) {
            let CoursesData = await CoursesModel.find()
            res.json({data: CoursesData})
        }

   static async getAllCoursesSchool(req, res) {
  try {
    const { id } = req.params; // ID de la escuela
    const cursos = await CoursesModel.find({ schoolId: id });

    res.json({ data: cursos });
  } catch (error) {
    console.error('Error al obtener cursos por escuela:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
}
   static async createCourse(req, res) {
        try {
            const Courser = req.body
            const newCourser = new CoursesModel(Courser)
            await newCourser.save()
            res.status(201).json({
                message: "El curso fue creado correctamente",
                data: newCourser
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static async getCourseById(req, res) {
       try {
                   const { id } = req.params;
                   const CoursesID = await CoursesModel.findById(id);
                   res.status(200).json(CoursesID);
               } catch (error) {
                   res.status(400).json({ message: `Curso no encontrada.` });
               }
    }
    static async updateCourse(req, res) {
        try {
             const id = req.params.id;
             const datosActualizados = req.body;
             const cursoActualizada = await CoursesModel.findByIdAndUpdate(id, datosActualizados, {new: true});
            res.status(200).json({cursoActualizada });
            } catch (error) {
                 res.status(404).json({'message': `Curso con el ID: ${req.params.id} no fue encontrado`});
            }
    }
    static async deleteCourse(req, res) {
         try {
                let { id } = req.params
                await CoursesModel.findByIdAndDelete(id)
                res.status(200).json({ mensaje: 'Curso eliminado' });
                } catch (error) {
                    res.status(404).json({'message': `Curso con el ID: ${req.params.id} no fue encontrado`})
                }
    }
}