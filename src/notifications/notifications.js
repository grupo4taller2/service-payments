const { Expo } = require('expo-server-sdk');
const { token_collection } = require('../database/database')

async function sendNotificationDiscount(users){
    console.log("COMIENZA NOTIFICATION");
    console.log(users);
    let somePushTokens = [];
    for (const username of users){
        const doc = await token_collection.findOne({"username": username});
        console.log(doc);
        if(doc === null){
            continue;
        }
        somePushTokens.push({username:username,
        token: doc.token})
    }
    // Create a new Expo SDK client
    // optionally providing an access token if you have enabled push security
    let expo = new Expo();

    // Create the messages that you want to send to clients
    let messages = [];
    for (let docPushToken of somePushTokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
        
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(docPushToken.token)) {
            console.error(`Push token ${docPushToken.token} is not a valid Expo push token`);
            continue;
        }
        console.log("PUSH TOKEN CORRECTO");
        console.log(docPushToken.username);
        console.log(docPushToken.token);
        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: docPushToken.token,
            sound: 'default',
            title: docPushToken.username,
            body: 'Your next trip has a discount',
            data: {},
        })
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
        try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
        console.error(error);
        }
    }
}
;

module.exports = sendNotificationDiscount;