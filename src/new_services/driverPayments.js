const  { driversAmount } = require("../database/database");

async function saveAmountToDriver(driverUsername,amount){
    let amountFloat = parseFloat(amount);
    const commision = (amountFloat * 20) / 100;
    const  finalPayment = amountFloat - commision;
    let previousValue = await driversAmount.findOne({ driverUsername: driverUsername });
    const newAmount = previousValue.amount + finalPayment;
    const options = { upsert: true };
    const updateDoc = {
        $set: {
          amount: newAmount,
        },
      };
    driversAmount.updateOne( { driverUsername: driverUsername },updateDoc,options);
}

async function verifyFunds(driverUsername,amount){
  let driverFunds = await driversAmount.findOne({ driverUsername: driverUsername });
  console.log("VERIFYYYYYYYYYYYYY");
  console.log(driverFunds);
  console.log(driverFunds.amount);
  if (driverFunds.amount >= amount){
    return true;
  } else{
    return false;
  }
}

async function discountAmountToDriver(driverUsername,amount){
  let amountFloat = parseFloat(amount);
  let previousValue = await driversAmount.findOne({ driverUsername: driverUsername });
  const newAmount = previousValue.amount - amountFloat;
  const options = { upsert: true };
  const updateDoc = {
      $set: {
        amount: newAmount,
      },
    };
  driversAmount.updateOne( { driverUsername: driverUsername },updateDoc,options);
}

exports.saveAmountToDriver = saveAmountToDriver;
exports.verifyFunds = verifyFunds;
exports.discountAmountToDriver = discountAmountToDriver;