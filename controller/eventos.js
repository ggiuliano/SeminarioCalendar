const moment = require('moment')
const eventosModel = require('../models/dao/event')

module.exports = class EventoDB {
    constructor(){

    }

    async agregarEvento(texto, start_date, end_date){
        let eventoNuevo = {
            texto,
            start_date,
            end_date,
        }
        await eventosModel.create(eventoNuevo)
    }

    async sumarEvento(data){
        let eventoSumar = {
            'text': data.text,
            'start_date': data.start_date,
            'end_date': data.end_date
        }
        await eventosModel.create(eventoSumar)
        console.log('AGREGADO')
    }

    async buscarEventos(){
        let listadoEventos = await eventosModel.find()
        return listadoEventos
    }

    async editarEvento(id, data){
        let internalID = id //aca tengo el _id
        let eventoEditar = {
            'text': data.text,
            'start_date': data.start_date,
            'end_date': data.end_date
        }
        let editarEvento = await eventosModel.findByIdAndUpdate(internalID,eventoEditar)
    }

    async borrarEvento(id){
        let internalID = id //aca tengo el _id
        let borrarEvento = await eventosModel.deleteOne({_id:internalID})
    }
}