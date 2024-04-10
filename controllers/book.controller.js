const postgre = require('../db/database')
const telegram = require('../helpers/telegram')
const AuthTokenModel = require('../db/schema/auth')
const ParcelsModel = require('../db/schema/parcels')
const http = require('../http/yard');
const mainlLogick = require('../helpers/check_new_parcels')

const testController = {
    getAll: async(req, res) => {
        try {
            await telegram.sendMessage('Hi, you have new parcel')
            res.json({msg: "OK", data: 'This is a test message with Serhii'})
            await AuthTokenModel.createTable();
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getTocken: async(req, res) => {
        try {
            const tocken = await AuthTokenModel.getAllTokens();
            console.log('ми тут')
            const allParcels = await http.HTTPyard.getAvailableParcels();
            console.log('тепер ми тут')
            console.log(allParcels, 'allParcels222');
        res.json({msg: "OK", data: tocken})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    delete: async(req, res) => {
        try {
            const deletedTockens = await AuthTokenModel.deleteAllTokens();
            res.json({msg: "OK", data: deletedTockens})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    addTocken: async(req, res) => {
        try {
            const newTocken = await AuthTokenModel.addToken('test new tocken')
            res.json({msg: "OK", data: newTocken})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },

}

const parcelController = {
    createTable: async(req, res) => {
        try {
            await ParcelsModel.createTable()
            res.json({msg: "OK", data: 'Table created'})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    addParcel: async(req, res) => {
        try {
            await ParcelsModel.addParcel(125)
        res.json({msg: "OK", data: 'added parcel 125'})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getAllParcel: async(req, res) => {
        try {
            const parcels = await ParcelsModel.getAllParcels()
            res.json({msg: "OK", data: parcels})

        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

const mainLogickController = {
    mainLogick: async(req, res) => {
        try {
            await mainlLogick()
            res.json({msg: "OK", data: 'mainlLogick'})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
}


module.exports = {testController, parcelController, mainLogickController}