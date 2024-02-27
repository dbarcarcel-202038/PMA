'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate} from '../utils/validator.js'
import { generarjwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        //Capturar el formulario (body)
        let data = req.body
        console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)

        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res)=>{
    try {
        //Capturar el body (los datos)
        let {username, password} = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) //Buscar el registro
        //Verifico que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username, 
                name:  user.name,
                role: user.role 
            }
            //Generar el token 
            let token = await generarjwt(loggedUser)
            //Responder al usuario 
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser, token})
        }
        if(!user) return res.status(404).send({message: 'User not found'})


    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error to login'})
    }
}


export const update = async (req, res) =>{//Solo datos generales
    try {
        //Obtener el id del ususario
        let { id } = req.params
        //Obtener los datos que se quieren actualizar 
        let data = req.body
        //validar si hay informacion 
        let update =  checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        //validar si tiene permisos (tokenización)
        //Actualizar 
        let updateUser = await User.findOneAndUpdate(
            { _id: id },//ObjectID (hora sys, version de mongo, llava primaria, etc.)
            data,
            {new: true} //los datos que se manden
        )
        //Validar la actualización 
        if (!updateUser) return res.status(401).send({ message: 'user not found' })

        //responder al usuario
        return res.send({ message: 'user update', updateUser })


    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `username ${error.keyValue.username} is alredy taken ` })
        return res.status(500).send({ message: 'Error updating' })
    }


}



export const updatePassword = async(req, res)=>{
    try {
        //capturar el body
        let {username, password, newPassword} = req.body
        //validar que el usuario exista
        let user = await User.findOne({ username: username })
        if (user && await checkPassword(password, user.password)) {
            //encriptar la nueva contraseña
            newPassword = await encrypt(newPassword)
            //actualizamos la contraseña
            user.password = newPassword
            await user.save()
            return res.send({ message: 'Password updated successfully' });
        }
        //si no existe el usuario dar un error
        if(!user) return res.status(404).send({message: 'User not found'})

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating password'})
    }
}

export const deleteUser = async(req, res)=>{

    try {
        //obtner el delete
        let {id} = req.params
        //validar si está logueado y es el mismo 
        //eliminar deleteOne(solo elimina) o findOneAndDelete(me devuelve el documento eliminado)
        let deletedAccount =  await User.findOneAndDelete({_id: id})
        //verificar que se elimino 
        if(!deletedAccount) return res.status(404).send({message: 'Account not found and not deleted'})
        //responder
        return res.send({message: `Account ${deletedAccount.username} deleted successfully`}) //status 200
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
/*

//capturar el body
        let {username} = req.body
        //buscar el usuario
        let user = await User.findOne({ username: username })
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        //eliminar el usuario
        await User.findOneAndDelete({username}) 
        //responder
        return res.send({ message: 'User deleted successfully' });

export const updateUser = async(req, res)=>{
    try {
        let {username, newPassword, newEmail, newPhone} = req.body

        let usUpdate = await User.findOneAndUpdate({username: username}, 
            {password:await encrypt(newPassword), email: newEmail, phone: newPhone })
        if (!usUpdate) {
                return res.status(404).send({ message: 'User not found' });
        }    
        return res.send({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error update user'})
    }

}*/