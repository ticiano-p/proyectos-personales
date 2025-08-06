// controllers/UserController.js
import { SchoolModel } from '../../models/mongo/SchoolModel.js'
import { PaymentModel } from '../../models/mongo/PaymentModel.js';

export class schoolController{
    
    static async getSchool (req,res) {
        let SchoolData = await SchoolModel.find()
        res.json(SchoolData)
    }

    static async getSchoolId(req, res) {
        try {
            const { id } = req.params;
            const SchoolID = await SchoolModel.findById(id);
            res.status(200).json(SchoolID);
        } catch (error) {
            res.status(400).json({ message: `Escuela no encontrada.` });
        }
    }

    static async getLastsSchools(req, res){
        try{
            const schools = await SchoolModel.find().limit(2)
            res.status(200).json(schools)
        } catch ( error ) {
            res.status(500).json({ error: error.message })
        }
    }
    
    static async getSchoolProvince (req, res){
        try {
        let { province } = req.params
        let ScholData = await SchoolModel.find({province: province})
        if(ScholData.length === 0){
            return res.status(404).json({ message: `No se encontraron escuelas en la provincia de ${Province}.` });
        } 
        res.status(200).json(ScholData);

        } catch (error) {
            res.status(500).json({ message: "Error del servidor al buscar escuelas." });
        }
        
    }

    static async getSchoolType(req, res) {
        try {
            const { type } = req.params;
            const ScholData = await SchoolModel.find({ type: type });
            if (ScholData.length === 0) {
                return res.status(404).json({ message: `No se encontraron escuelas del tipo: ${type}.` });
            }
            res.status(200).json(ScholData);
        } catch (error) {
            res.status(500).json({ message: "Error del servidor al buscar escuelas." });
        }
    }
    
    static async getSchoolName (req, res){
        try {
        let { name } = req.params
        let ScholData = await SchoolModel.find({name: name}) 
        if(ScholData.length === 0){
            return res.status(404).json({ message: `No se encontro ninguna escuela con el nombre: ${name}.` });
        }
        res.status(200).json(ScholData);
        } catch (error) {
            res.status(500).json({ message: "Error del servidor al buscar la escuelas." });

        }
        
    }

    static async createSchool (req, res) {
        try {
            const paymentSchool = await PaymentModel.findOne({
                issuedTo: req.body.user_id,
                status: 'paid',
                paymentType: 'create_school'
            });
            if (!paymentSchool) {
                return res.status(403).json({
                    message: 'Debe realizar el pago correspondiente para generar una escuela'
                });
            }
            if (!req.body.CUE) {
                return res.status(400).json({ message: 'El campo CUE es obligatorio' });
            }
            const school = req.body;
            const newSchool = new SchoolModel(school);
            await newSchool.save();
            res.status(201).json(newSchool);
        } catch (error) {
            res.status(404).json({ message: "Escuela no creada", error });
        }
    }

    static async editSchoolId(req, res) {
        try {
            const id = req.params.id;
            const datosActualizados = req.body;
            const escuelaActualizada = await SchoolModel.findByIdAndUpdate(id, datosActualizados, {new: true});
            console.log(id)
          res.status(200).json({escuelaActualizada });
        } catch (error) {
          res.status(404).json({'message': `Escuela con el ID: ${req.params.id} no fue encontrado`});
        }
      }

    static async deleteSchoolId (req, res) {
        try {
            let { id } = req.params
        const school = await SchoolModel.findByIdAndDelete(id)
        res.status(200).json({ mensaje: 'Usuario eliminado' });
        } catch (error) {
            res.status(404).json({'message': `Escuela con el ID: ${req.params.id} no fue encontrado`})
        }
        
    }
}