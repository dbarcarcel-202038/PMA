//Asincronia
//Esperar a que se ejecute por completo una instrucción, Sin obtruir
//el hilo de procesos.

//Formas de manejar la asincronía: 
/**
 * Callbacks -> desuso!! 
 * Promises
 * Async/Await
 *  */

//CALLBACKS
/* function getUsersWithCallbacks(callback){
    fetch('https://randomuser.me/api/')
    .then(response => response.json()) //traducir a JSON
    .then(data => {
        const { results } = data;
        callback(null, results)
    })
    .catch(error => {
        callback(error, null)
    })
}

getUsersWithCallbacks((error, results)=> {
    if(error) console.error('Error al obtener datos', error)
    const name = document.getElementById('name');
    const surname = document.getElementById('surname')
    const phone = document.getElementById('phone')
    for(let user of results){
        name.innerText = user.name.first;
        surname.innerText = user.name.last;
        phone.innerText = user.phone
    }
})
 */


//PROMESAS
/* const getUsersWithPromise = ()=> {
    return new Promise((resolve, reject)=> {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                const { results } = data;
                resolve(results)
            })
            .catch(error => reject(error))
    })
}

getUsersWithPromise()
    .then(results => {
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for (const user of results) {
            name.innerText = user.name.first
            surname.innerText = user.name.last;
            phone.innerText = user.phone
        }
    })
    .catch(error => console.error(error)) */


//ASYNC / AWAIT
const getUsersWithAsync = async ()=>{
    try{
        const response = await fetch('https://randomuser.me/api/?results=10')
        const { results } = await response.json() //Desestructurar
        const users = document.getElementById('users')
        console.log(results)

        for (const user of results) {
            users.innerHTML += `
                <tr id="${user.id.name}">
                    <td>${user.name.first}</td>
                    <td>${user.asdf?.surname ?? ''}</td>
                    <td>${user.phone}</td>
                </tr>
            `
        }
    }catch(error){
        console.error(error)
    }
}

getUsersWithAsync()