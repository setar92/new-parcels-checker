const axios = require('axios');

const telegram = {
    sendMessage: async(message, chatsIdArr) => {
        try {
          const token = process.env.TOKEN;
          await Promise.all(
            chatsIdArr.map((chat_id) => {
              axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
              chat_id,
              text: message
            });
            }),
          );
          } catch (error) {
            console.error('Error sending message:', error.response.data);
          }
}}

module.exports = telegram;