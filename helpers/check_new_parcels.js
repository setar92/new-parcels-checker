const {HTTPyard} = require('../http/yard');
const ParcelModel = require('../db/schema/parcels');
const {findMissingNumbers} = require('./compaireArrays');
const telegram = require('./telegram');
const ChatIdModel = require('../db/schema/chatId');


const mainlLogick = async () => {
    try {
        // get telegram chats id of recipients
        const chatsId = await ChatIdModel.getAllChatIds();
        const chatsIdArr = chatsId.map(chat =>chat.chatid);
        const parcelsFromDB = await ParcelModel.getAllParcels();
        const parcelsArrayDB = parcelsFromDB.map(parcel =>+parcel.parcel_number);
        const parcelsFromYARD = await HTTPyard.getAvailableParcels();
        const newParcels = findMissingNumbers(parcelsFromYARD, parcelsArrayDB)
        const telegramMessage = `Hello guys, you now have ${parcelsFromYARD.length} parcels ready to ship, ${newParcels.length} of which were created in the last ${process.env.PERIOD} minutes.`;
        await telegram.sendMessage(telegramMessage, chatsIdArr)
    } catch (error) {
        console.log(error.message, 'error');
    }

    
}


module.exports = mainlLogick;