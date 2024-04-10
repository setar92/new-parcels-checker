const {HTTPyard} = require('../http/yard');
const ParcelModel = require('../db/schema/parcels');
const {findMissingNumbers} = require('./compaireArrays');
const telegram = require('./telegram');


const mainlLogick = async () => {
    const parcelsFromDB = await ParcelModel.getAllParcels();
    const parcelsArrayDB = parcelsFromDB.map(parcel =>+parcel.parcel_number);
    const parcelsFromYARD = await HTTPyard.getAvailableParcels();
    const newParcels = findMissingNumbers(parcelsFromYARD, parcelsArrayDB)
    await telegram.sendMessage(`Hello guys, you now have ${parcelsFromYARD.length} parcels ready to ship, ${newParcels.length} of which were created in the last ${process.env.PERIOD} minutes.`)
    console.log('finish')
}


module.exports = mainlLogick;