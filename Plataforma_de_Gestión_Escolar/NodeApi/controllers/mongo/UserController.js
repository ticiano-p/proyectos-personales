// controllers/UserController.js
import { UserModel } from '../../models/mongo/UserModel.js'
import { CoursesModel } from '../../models/mongo/CoursesModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonWebToken from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const salt = 10

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY


export class UserController {
    static randomID(){
        return crypto.randomUUID();
    }
	static async auth(req, res) {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({
			message: "El usuario no existe"
			});
		}
		const passOk = await bcrypt.compare(password, user.password);
		if (!passOk) {
			return res.status(401).json({
			message: "La contraseña es inválida"
			});
		}
		const data = {
			id: 	user._id,
			email: 	user.email,
			nombre: user.firstName,
			apellido: user.lastName,
			role: 	user.role,
			School:  user.school_id,
			courses:  user.courses
		};
		const token = jsonWebToken.sign(data, SECRET_KEY, { expiresIn: '1h' });
		return res.json({
			message: "Credenciales correctas",
			jwt: token,
			data: user
		});
	}

	static async getLastsUsers(req, res){
		try{
			const users = await UserModel.find().sort({createdAt: -1}).limit(2)
			res.status(200).json(users)
		} catch ( error ) {
			res.status(500).json({ error: error.message })
		}
	}

	static async getUsers(req, res) {
		try {
		const users = await UserModel.find()
		res.status(200).json(users)
		} catch (error) {
		res.status(500).json({ error: error.message })
		}
	}

	static async getUserById(req, res) {
		try {
		const user = await UserModel.findById(req.params.id)
		if (!user) return res.status(404).json({ error: 'No encontrado' })
		res.status(200).json(user)
		} catch (error) {
		res.status(500).json({ error: error.message })
		}
	}

	static async getUserByEmail(req, res){
		try {
			const user = await UserModel.findOne({email: req.params.email})
			if(user){
				res.status(200).json(user)
			}else{
				res.status(404).json({error: "No encontrado"})
			}
		} catch (error) {
			res.status(500).json({error: error.message})
		}
	}

	static async getUserByGender(req, res){
		try {
			const regexGender = new RegExp(req.params.gender, 'i');
			// Este regex trae los valores que contengan { req.params.Genre }, con 'i' ( No case Sensitive )
			const user = await UserModel.find({gender: regexGender })
			if(user){
				res.status(200).json(user)
			}else{
				res.status(404).json({error: "No encontrado"})
			}
		} catch (error) {
			res.status(500).json({error: error.message})
		}
	}

	static async getUserByFirstName(req, res){
		try {	
			const regexFirstName = new RegExp(req.params.firstName, 'i');
			// Este regex trae los valores que contengan { req.params.firstName }, con 'i' ( No case Sensitive )
			const user = await UserModel.find({firstName: regexFirstName }).limit(2)
			if(user){
				res.status(200).json(user)
			}else{
				res.status(404).json({error: "No encontrado"})
			}
		} catch (error) {
			res.status(500).json({error: error.message})
		}
	}

	static async createUser(req, res) {
		try {
			const user = req.body
			if (!user.firstName || !user.password) {
               return res.status(403).json({ message: "Debe completar todos los parametros" });
}
			const passwordHash = await bcrypt.hash(user.password, salt)
			user.password = passwordHash 
			const newUser = new UserModel(user)
			await newUser.save()
			res.status(201).json({
				message: "El Usuario fue creado correctamente",
				data: newUser
			})
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	static async editUserById(req, res) {
		try {
			const updates = { ...req.body };
              
			  const userBefore = await UserModel.findById(req.params.id);
			  if (req.file) {
              updates.file = req.file.filename; 
			  const oldFilePath = path.join('uploads', userBefore.file || '');
      if (userBefore.file && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
        console.log("Foto anterior eliminada:", oldFilePath);
      }
               }

			if( !(updates.school_id) ){
				updates.school_id = null
			} 
			await UserModel.findByIdAndUpdate(req.params.id, updates);

			 const userUpdated = await UserModel.findById(req.params.id);
			if (!userUpdated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
			const data  = {
			id: userUpdated._id,
			email: userUpdated.email,
			role: userUpdated.role,
			School: userUpdated.school_id,
			courses: userUpdated.courses,

		};
		const token = jsonWebToken.sign(data , SECRET_KEY, { expiresIn: '1h' });
			res.status(200).json({
				message: "Usuario actualizado correctamente",
				jwt: token,
			});
		} catch (error) {
			console.error("Error en editUserById:", error);
			res.status(400).json({ 
				error: error.message,
				data: updates
			});
		}
	}


	static async deleteUserById(req, res) {
		try {
		const user = await UserModel.findByIdAndDelete(req.params.id)
		if (!user) return res.status(404).json({ error: 'No encontrado' })
		res.status(200).json({ mensaje: 'Usuario eliminado' })
		} catch (error) {
		res.status(500).json({ error: error.message })
		}
	}
 // agrega cursoS al usuario:
    static async assignCoursesToUser (req, res) {
		const userId = req.params.id;
		const { courseIds } = req.body; 
		try {
			const user = await UserModel.findById(userId);
			if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
			
			
			user.courses = courseIds;
           await user.save();
			res.status(200).json({ message: 'Cursos asignados correctamente' });
		} catch (error) {
			console.error('Error asignando cursos:', error);
			res.status(500).json({ message: 'Error interno del servidor' });
		}
	};

	static async getCoursesById(req, res) {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    // Si no tiene cursos
    if (!user.courses || user.courses.length === 0) {
      return res.status(200).json({ message: 'El usuario no tiene cursos asignados.', data: [] });
    }

    const courses = await CoursesModel.find({ _id: { $in: user.courses } });
    res.status(200).json({ data: courses });

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
static async getUserBySchool(req, res) {
  try {
    const schoolId = req.params.id;
    const users = await UserModel.find({ school_id: schoolId });
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}


}

