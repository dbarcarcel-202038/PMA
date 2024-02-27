//validar diferentes datos
'use strict'

import { hash, compare} from 'bcrypt'

export const encrypt = (password)=>{
    try {

        return hash(password, 10)

    } catch (error) {
        console.error(error)
        return error
    }

}


export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkUpdate = (data, userId) => {
    if (userId) {
        if (Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == '') {
            return false
        }
        return true
    } else {
        return false
    }
}

export const checkUpdateAnimal = (data, userId) => {
    if (userId) {
        if (Object.entries(data).length === 0 ||
            data.typeAnimal ||
            data.typeAnimal == '' ||
            data.genre ||
            data.genre == '') {
            return false
        }
        return true
    } else {
        if (Object.entries(data).length === 0 ||
        data.keeper ||
        data.keeper == '' ) {
        return false
    }
    return true
    }
}