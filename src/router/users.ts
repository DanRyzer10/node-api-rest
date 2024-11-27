import express from 'express'
import { deleteUser, getAllUsers,sayHello } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares';

export default (router:express.Router) =>{
    router.get('/users',isAuthenticated,getAllUsers);
    router.delete('/users/:id',isOwner,deleteUser);
    router.get('/users/hola',sayHello)
}