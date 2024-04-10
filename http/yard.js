const axios = require('axios');
const AuthTokenModel = require('../db/schema/auth')


const getTocken = async () => {
    const token = await AuthTokenModel.getAllTokens();
    if (token[0]) {
        return token[0].token;
    }

    const params = {
        code: process.env.SMS_DEV_CODE,
        phone: process.env.MOBILE,
        type: 'person'
    }

    const yardResponse = await axios.post(`${process.env.YARD_URL}api/auth/otp/check`, params)
    const newTocken = yardResponse.data.data.access_token
    await AuthTokenModel.addToken(newTocken)

    return newTocken
}


const HTTPyard = {
    getAvailableParcels: async() => {
        try {
            const token = await getTocken();

            const headers = {
                'Authorization': `Bearer ${token}`
              };

            const allParcels = await axios.get(`${process.env.YARD_URL}api/mover/parcels`, {headers});
            const availableParcelsNumbers = allParcels.data.data.map((parcel => parcel.number))
            return availableParcelsNumbers;
        } catch (error) {
            throw new Error("Can't get parcels list from YARD api");
        }
    },
}

module.exports = { getTocken, HTTPyard}