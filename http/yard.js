const axios = require('axios');
const AuthTokenModel = require('../db/schema/auth')


const HTTPyard = {
    getAvailableParcels: async() => {
        try {
            const tocken = await AuthTokenModel.getAllTokens();
            
            await telegram.sendMessage('Hi, you have new parcel')
            res.json({msg: "OK", data: 'This is a test message with Serhii'})
            await AuthTokenModel.createTable();
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
}