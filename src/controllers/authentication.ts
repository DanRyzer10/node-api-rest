import express from 'express'
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req:express.Request,res:express.Response)=>{
    try{
        const  {email,password} = req.body;

        if(!email || !password){
            res.status(400).send('Invalid input')
            return;
        }
        const user = (await getUserByEmail(email).select('+authentication.salt +authentication.password'));

        if(!user){
            res.status(404).send('User not found')
            return;
        }
        const expectedHash = authentication(user.authentication.salt,password);
        if(user.authentication.password !== expectedHash){
            res.status(403).send('Invalid password')
            return;
        }

        const salt = random();

        user.authentication.sessionToken = authentication(salt,user._id.toString())

        await user.save();

        res.cookie('ANGEL_AUTH',user.authentication.sessionToken,{domain:'localhost',path:'/'});
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err.message)
    }
}
export const register = async (req:express.Request,res:express.Response)=>{
    try{
        const {email,password,username} = req.body;

        if(!email || !password || !username){
            res.status(400).send('Invalid input')
            return;
        }
        const existingUser = await getUserByEmail(email);

        if(existingUser){
            res.status(400).send('User already exists')
            return;
        }
        const salt = random();

        const  user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password:authentication(salt,password)
            }
        })

        res.status(201).send(user);

    }catch(err){
        res.status(500).send(err.message)
    }
}