const {HTTPyard} = require('../http/yard');
const ParcelModel = require('../db/schema/parcels');
const {findMissingNumbers} = require('./array_utils');
const telegram = require('./telegram');
const ChatIdModel = require('../db/schema/chatId');


const mainlLogick = async () => {
    try {
        // get telegram chats id of recipients
        const chatsId = await ChatIdModel.getAllChatIds();


        // test message
        await telegram.sendMessage('working', chatsIdArr);

        const chatsIdArr = chatsId.map(chat =>chat.chatid);
        // get previous parcels numbers from our DB
        const parcelsFromDB = await ParcelModel.getAllParcels();
        const parcelsArrayDB = parcelsFromDB.map(parcel =>+parcel.parcel_number);
        // get parcels numbers from YARD api
        const parcelsFromYARD = await HTTPyard.getAvailableParcels();
        const parcelsFromYARDNumbers = parcelsFromYARD.map((parcel => parcel.number));
        const newParcels = findMissingNumbers(parcelsFromYARDNumbers, parcelsArrayDB);

        const findParcelsObject = (numbers, parcelsObject) => {
            const result=[];
            parcelsObject.forEach(element => {
                if (numbers.includes(element.number)) {
                    result.push(element)
                }
            });
            return result;
        }
        const newParcelsObjects = findParcelsObject(newParcels, parcelsFromYARD);



        // If there are new parcels, we send notifications in Telegram
        if (newParcelsObjects.length) {
            await Promise.all(newParcelsObjects.map((parcel) => ParcelModel.addParcel(parcel.number)));
            const telegramMessage = `Нова посилка №${newParcelsObjects[0].number} відправник ${newParcelsObjects[0].sender.fullname}.
            FROM: 
            ${newParcelsObjects[0].from.address}
            TO: 
            ${newParcelsObjects[0].to.address}
            `;

            await telegram.sendMessage(telegramMessage, chatsIdArr);
            
        } else {
            console.log('There are no new parcels')
        }        
    } catch (error) {
        console.log(error.message, 'error');
    }    
}


module.exports = mainlLogick;