'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const test = (req, res)=>{
    return res.send({message: 'Function test is running | appointment'})
}

export const save = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body;
        console.log(req.user)
        data.user = req.user._id //Jalar el id del usuario logeado!!
        //Verificar que exista el animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga una cita activa con esa persona
        let existAppointment = await Appointment.findOne({
            $and: [
                {animal: data.animal},
                {user: data.user}
            ]
        })
        //EJERCICIO: Que el usuario solo pueda tener una cita por día.
        let existDateAppointment = await Appointment.findOne({
            $and: [
                { date: { $gte: new Date().setHours(0, 0, 0, 0) } }                
            ]
        })
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment saved successfully, for the date ${appointment.date}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating appointment', err})
    }
}