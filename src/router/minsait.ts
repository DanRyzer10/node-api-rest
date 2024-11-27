import express from 'express'
import { payCreditCard } from '../controllers/minsait';

export default (router:express.Router) =>{
    router.post('/minsait/pay',payCreditCard);
}