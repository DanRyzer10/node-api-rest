import crypto from 'crypto';
import router from '../router';
export const random = ()=>crypto.randomBytes(128).toString('base64');
const  SECRET = 'angelito'

export const authentication =  (salt:string,password:string) => {
    return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex')
}
