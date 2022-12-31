'use strict';

import {decodeToken} from '../services/token';

const auth = (req,res,next) => {
    
    if(!req.headers.authorization) return res.status(403).send({error : "No tienes autorizacion"});
    const token = req.headers.authorization.split(' ')[1];//realizamos el Bearer para obtener el token
    decodeToken(token)
    .then(response =>{
        req.user = response.id; //guardamos el usuario 
        next();//pasamos al siguiente middlewares
    })
    .catch(error =>{
        res.status(error.status).send({error : error.message})
    })
  
}

export default auth;