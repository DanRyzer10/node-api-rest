import { MinsaitResponse } from 'interfaces/MinsaitResponse'
import { MinsaitSchema } from '../db/MinsaitSchema'
import express from 'express'




export const payCreditCard = async(req:express.Request,res:express.Response) => {
    try{
        const {error,value} = MinsaitSchema.validate(req.body)
        if(error){
            res.status(404).send(error.message)
        }

        const response: MinsaitResponse = {
            type: "responseType",
            registro_Numero: 1,
            centalta: value.centalta,
            clamon: value.clamon,
            clamone: 123, // Ejemplo de valor
            codent: value.codent,
            contcur: "contcurExample",
            cuenta: value.cuenta,
            fecfac: value.fecfac.toString(),
            impfac: value.impfac,
            linref: 123, // Ejemplo de valor
            numextcta: "numextctaExample",
            nummovext: "nummovextExample",
            refdocpag: value.refdocpag,
            tipdocpag: value.tipdocpag,
            tipofac: value.tipofac,
            tipolin: value.tipolin
        };
        res.status(200).send(response)
    }catch(err){
        res.status(500).send(err)
    }
}