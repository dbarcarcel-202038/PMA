'use strict'

import {Router} from 'express'
import { save, test } from './appointment.controller.js';
import {validateJwt} from '../middlewares/validate-jwt.js'
const api = Router();
api.get('/test', test)

// Rutas privadas de CLIENT
api.post('/save',[validateJwt],save)


export default api