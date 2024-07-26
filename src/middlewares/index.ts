import express from 'express'

import {get,identity,merge} from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const  isOwner = async(req:express.Request,res:express.Response,next:express.NextFunction) =>{
    const {id } = req.params;

    const currentUserId = get(req,'identity._id') as string;
    if(!currentUserId){
        return res.sendStatus(403);
    }

    if(currentUserId !=id){
        return res.sendStatus(403);
    }
}

export const isAuthenticated = async (req:express.Request,res:express.Response,next:express.NextFunction) =>{
    try{
        const sessionToken = req.cookies['ANGEL_AUTH']

        if(!sessionToken){
            res.status(401).send('Unauthorized')
            return;
        }

        const  existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            res.status(403)
            return;
        }
        merge(req,{identity:existingUser});

        next();
    }catch(err){
        res.status(500).send(err.message)
    }
}

