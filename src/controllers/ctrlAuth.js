'use strict';

import User from '../models/SchemaUser';
import {createToken} from '../services/token';
import {comparePassword} from '../services/password';

export const signup = async (req,res)=>{
    try
    {

        let {
            email,
            userName,
            password,
        } = req.body;

        let person = await User.findOne({email:email.toLocaleLowerCase()},{email:true});

        if(person) return res.status(400).send({error:'Correo ya existe.'});    
 
        person = new User({
            userName,
            email,
            password,
        })

        await person.save();

        res.status(201).send({
            _id: person._id,
            token : createToken(person,360),
            email : person.email,
            userName : person.userName,
            notifications : person.notifications,
            isAuthenticated : true
        })
    }
    catch(err)
    {
        res.status(500).send({error:'Error en el servidor'});
    }
}

export const signin = async(req,res)=>{

    const {
    	email,
    	password
    } = req.body;

    const person = await User.findOne({"email" : email.toLocaleLowerCase()});

    if(!person) return res.status(401).send({error:'Correo invalido'});

    if(!comparePassword(password.toLocaleLowerCase(),person.password)) return res.status(403).send({error:'Contraseña invalida'});

    res.status(200).send({
        _id: person._id,
        token : createToken(person,360),
        email : person.email,
        userName : person.userName,
        notifications : person.notifications,
        isAuthenticated : true,
        addressEth : person.walletEth ? person.walletEth.address : null,
        addressBtc : person.walletBtc ? person.walletBtc.address : null,
        addressLtc : person.walletLtc ? person.walletLtc.address : null,
        addressBch : person.walletBch ? person.walletBch.address : null,
        addressUsdtEth : person.walletUsdtEth ? person.walletUsdtEth.address : null,
        addressDash : person.walletDash ? person.walletDash.address : null,
    })

}

export const logout = async(req,res)=>{
    try
    {
        let person = await User.findOne({_id:req.user});
        if(!person) return res.status(400).send({error:'Usuario no existe'});
        res.status(204).send();
    }
    catch(err)
    {
        res.status(500).send({error:'Error en el servidor'});
    }
}
