const {HTTPyard} = require('../http/yard');
const ParcelModel = require('../db/schema/parcels');
const {findMissingNumbers} = require('./array_utils');
const telegram = require('./telegram');
const ChatIdModel = require('../db/schema/chatId');


const mainlLogick = async () => {
    try {
        // get telegram chats id of recipients
        const chatsId = await ChatIdModel.getAllChatIds();
        const chatsIdArr = chatsId.map(chat =>chat.chatid);
        // get previous parcels numbers from our DB
        const parcelsFromDB = await ParcelModel.getAllParcels();
        const parcelsArrayDB = parcelsFromDB.map(parcel =>+parcel.parcel_number);
        // get parcels numbers from YARD api
        const parcelsFromYARD = await HTTPyard.getAvailableParcels();
        const newParcels = findMissingNumbers(parcelsFromYARD, parcelsArrayDB);
        // If there are new parcels, we send notifications in Telegram
        if (newParcels.length) {
            await Promise.all(newParcels.map((parcelNumber) => ParcelModel.addParcel(parcelNumber)));
            const telegramMessage = `Hello guys, you now have ${parcelsFromYARD.length} parcels ready to ship, ${newParcels.length} of which were created in the last ${process.env.PERIOD} minutes. There are numbers of new parcels ${newParcels.join(' ')}`;
            await telegram.sendMessage(telegramMessage, chatsIdArr)    
        } else {
            console.log('There are no new parcels')
        }        
    } catch (error) {
        console.log(error.message, 'error');
    }    
}


module.exports = mainlLogick;