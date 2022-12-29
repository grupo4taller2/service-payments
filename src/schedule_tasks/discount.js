const { fastifySchedulePlugin } = require('@fastify/schedule');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const { walletsDB } = require("../database/database");
const { tripsPaid } = require("../database/database");
const { usersDiscountDB } = require("../database/database");
const sendNotificationDiscount = require('../notifications/notifications');

const HOURS_TRANSACTIONS = 24*15; // 24 horas por 15 dias
const HOURS_VALID_DISCOUNTS = 24*15;
const HOURS_INVALID_DISCOUNTS = 24*15;

async function findMultiple(){
  console.log("COMINEZA");
  let listUsualUsers = [];
  const recentDates = await tripsPaid.aggregate(
    [
      {
        $match : {"createdAt":{$gt:new Date(Date.now() - HOURS_TRANSACTIONS*60*60 * 1000)}}
      },
      {
        $group:
          {
            _id: "$riderUsername",
            recentDate: { $max: "$createdAt" }
          }
      }
    ]
 )
 console.log("PASO PRIMERA TRIPS PAID");
 console.log()
 for await (const doc of recentDates) {
  console.log(doc);
  listUsualUsers.push(doc._id);
}
  console.log("USUAL USERS")
  console.log(listUsualUsers);
  const UnusualRiders = await walletsDB.find({ username: {$not: {$in: listUsualUsers }}});
  let listUnusualUsers = [];
  for await (const docUnusual of UnusualRiders) {
    listUnusualUsers.push(docUnusual.username);
  }
  console.log("UNUSUAL USERS");
  console.log(listUnusualUsers);
  const usersWithDiscounts= await usersDiscountDB.aggregate(
    [
      {
        $match : {"createdAt":{$gt:new Date(Date.now() - HOURS_VALID_DISCOUNTS*60*60 * 1000)}}
      },
      {
        $group:
          {
            _id: "$username",
            recentDate: { $max: "$createdAt" }
          }
      }
    ]
 )
 let listUsersDicounts = [];
  for await (const docDiscount of usersWithDiscounts) {
    listUsersDicounts.push(docDiscount._id);
  }
  let userNotification= [];
  for await (const user of listUnusualUsers) {
    if (listUsersDicounts.includes(user) == false) {
      //console.log(user);
      const doc = {
        username: user,
        createdAt: new Date(),
        status: "valid",
        percentage: 50, 
      }
      await usersDiscountDB.insertOne(doc);
      userNotification.push(user);
    }
  }
  await sendNotificationDiscount(userNotification, 50);
  
  const invalidDiscount = await usersDiscountDB.find({"createdAt":{$lt:new Date(Date.now() - HOURS_INVALID_DISCOUNTS*60*60 * 1000)}})
  for await (const invalidDoc of invalidDiscount) {
    const updateDoc = {
      $set: {
        status: "invalid",
      },
    };
    usersDiscountDB.updateOne( { _id: invalidDoc._id },updateDoc);
  }
  console.log("FINAL");
  return ;
}
const task = new AsyncTask(
    'simple task',
    () => { 
      console.log("START DISCOUNTS");
      return findMultiple()
      .then((result) => { 
        console.log("DISCOUNTS APPLY");
      }) },
    (err) => { console.log("ERROR")}
)

const job = new SimpleIntervalJob({ seconds: 60 }, task);

module.exports = job;
