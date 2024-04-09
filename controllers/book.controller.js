const postgre = require('../db/database')
const telegram = require('../helpers/telegram')
const AuthTokenModel = require('../db/schema/auth')

const bookController = {
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
            console.log(tocken);
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
            console.log('ми тут')
            const newTocken = await AuthTokenModel.addToken('test new tocken')
            res.json({msg: "OK", data: newTocken})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },

}

module.exports = bookController