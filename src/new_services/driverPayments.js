const  { driversAmount } = require("../database/database");

async function saveAmountToDriver(driverUsername,amount){
    let amountFloat = parseFloat(amount);
    const commision = (amountFloat * 20) / 100;
    const  finalPayment = amountFloat - commision;
    let previousValue = await driversAmount.findOne({ driver_username: driverUsername });
    const newAmount = previousValue.amount + finalPayment;
    const options = { upsert: true };
    const updateDoc = {
        $set: {
          amount: newAmount,
        },
      };
    driversAmount.updateOne( { driver_username: driverUsername },updateDoc,options);
}

async function verifyFunds(driverUsername,amount){
  let driverFunds = await driversAmount.findOne({ driver_username: driverUsername });
  console.log("VERIFYYYYYYYYYYYYY");
  console.log(driverFunds.amount);
  if (driverFunds.amount >= amount){
    return true;
  } else{
    return false;
  }
}

async function discountAmountToDriver(driverUsername,amount){
  let amountFloat = parseFloat(amount);
  let previousValue = await driversAmount.findOne({ driver_username: driverUsername });
  const newAmount = previousValue.amount - amountFloat;
  const options = { upsert: true };
  const updateDoc = {
      $set: {
        amount: newAmount,
      },
    };
  driversAmount.updateOne( { driver_username: driverUsername },updateDoc,options);
}

exports.saveAmountToDriver = saveAmountToDriver;
exports.verifyFunds = verifyFunds;
exports.discountAmountToDriver = discountAmountToDriver;