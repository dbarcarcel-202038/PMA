import express from 'express'
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'
import { test, register, login, updatePassword, deleteUser, update } from './user.controller.js';


const api = express.Router();


api.post('/register', register)
api.post('/login', login)
api.put('/updatePassword', updatePassword)

//Rutas privadas
api.delete('/deleteUser/:id',[validateJwt], deleteUser)
api.put('/update/:id',[validateJwt],  update)
api.get('/test',[validateJwt, isAdmin], test)
export default api
