const axios = require('axios');
const token = process.env.TOKEN;
const channel1 = process.env.CHANNEL1;
const channel2 = process.env.CHANNEL2;

const telegram = {
    sendMessage: async(message) => {
        try {
            const response1 = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
              chat_id: channel1,
              text: message
            });
            const response2 = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
              chat_id: channel2,
              text: message
            });
          } catch (error) {
            console.error('Error sending message:', error.response.data);
          }
}}

module.exports = telegram;