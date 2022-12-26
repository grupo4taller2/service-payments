const { fastifySchedulePlugin } = require('@fastify/schedule');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const { walletsDB } = require("../database/database");
const { tripsPaid } = require("../database/database");
const { usersDiscountDB } = require("../database/database");
const sendNotificationDiscount = require('../notifications/notifications');

async function findMultiple(){
  const queryFede = { username: "Fede_1998" };
  const fede = await walletsDB.findOne(queryFede);
  const queryFire = { username: "Fire_test" };
  const fire = await walletsDB.findOne(queryFire);
  let listUsualUsers = [];
  const recentDates = await tripsPaid.aggregate(
    [
      {
        $match : {"createdAt":{$gt:new Date(Date.now() - 8*60*60 * 1000)}}
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
 for await (const doc of recentDates) {
  console.log(doc);
  listUsualUsers.push(doc._id);
}
  console.log(listUsualUsers);
  const UnusualRiders = await walletsDB.find({ username: {$not: {$in: listUsualUsers }}});
  console.log("UNUSUAL RIDERS");
  //console.log(UnusualRiders);
  let listUnusualUsers = [];
  for await (const docUnusual of UnusualRiders) {
    listUnusualUsers.push(docUnusual.username);
  }
  console.log(UnusualRiders.length);
  console.log(listUnusualUsers);
  //const usersWithDiscounts = await usersDiscountDB.find({ username: {$in: listUnusualUsers }});
  const usersWithDiscounts= await usersDiscountDB.aggregate(
    [
      {
        $match : {"createdAt":{$gt:new Date(Date.now() - 300*60*60 * 1000)}}
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
      console.log(user);
      const doc = {
        username: user,
        createdAt: new Date(),
        status: "valid",
        percentage: 25, 
      }
      await usersDiscountDB.insertOne(doc);
      userNotification.push(user);
    }
  }
  await sendNotificationDiscount(userNotification);
  console.log("FINAL");
  //console.log(finalUsers.length);
  
  const invalidDiscount = await usersDiscountDB.find({"createdAt":{$lt:new Date(Date.now() - 300*60*60 * 1000)}})
  for await (const invalidDoc of invalidDiscount) {
    const updateDoc = {
      $set: {
        status: "invalid",
      },
    };
    //console.log("INVALIDOS");
    //console.log(invalidDoc);
    usersDiscountDB.updateOne( { _id: invalidDoc._id },updateDoc);
  }
  return {first: fede,
    second: fire}
}
const task = new AsyncTask(
    'simple task',
    () => { 
      console.log("HOLAA AMIGOS");
      return findMultiple()
      .then((result) => { console.log("10 segundos");
    console.log(result.first);
    console.log("FIRE TEST");
    console.log(result.second);}) },
    (err) => { /* handle errors here */ }
)

const job = new SimpleIntervalJob({ seconds: 60, }, task);

module.exports = job;
