import express from 'express'
import { deleteUserById, getUsers } from '../db/users'

export const  getAllUsers = async(req:express.Request,res:express.Response) =>{
    try{
        const users = await getUsers();
        res.status(200).send(users);
    }catch(err){
        res.status(500).send(err.message)
    }
}

export const deleteUser = async(req:express.Request,res:express.Response)  =>{
    try{
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);
        res.status(200).send(deletedUser);


    }catch(err){
        console.log(err.message)
        return  res.sendStatus(500)

    }
}