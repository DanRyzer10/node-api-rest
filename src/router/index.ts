import express from 'express'
import authentication from './authentication';
const router = express.Router();
import users from './users';
import minsait from './minsait';

export default ():express.Router =>{
    authentication(router);
    users(router);
    minsait(router);
    return router;
}