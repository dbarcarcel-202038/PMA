'use strict'

import {Router} from 'express'
import { buscarAnimal, deleteAnimal, guardarAnimal, obtenerAnimal, testA, updateAnimal } from './animal.controller.js';
const api = Router();
api.get('/testA', testA)
api.post('/guardarAnimal', guardarAnimal)
api.get('/obtenerAnimal', obtenerAnimal)
api.get('/buscarAnimal/:param', buscarAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)
api.put('/updateAnimal/:id', updateAnimal)



export default api