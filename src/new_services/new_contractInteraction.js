const config = require("../config");
const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const walletService = require("./new_wallet");
const { tripsPaid } = require("../database/database");
const driversPayments = require("./driverPayments");

async function getContract(config, wallet) {
    /*console.log(config.contractAddress);
    console.log(config.contractAbi);
    console.log(wallet);*/
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

async function deposit(riderUsername, amountToSend,driverUsername,tripID) {
    console.log("LLEGUEEEEE");
    riderWallet = await walletService.getRiderWallet(riderUsername);
    //const ownerWallet = await walletService.getDeployerWallet();
    const basicPayments = await getContract(config, riderWallet);
    console.log("LLEGUEEEEEEE 2");
    const tx = await basicPayments.deposit({
      value: await ethers.utils.parseEther(amountToSend.toString()).toHexString(),
    });
    tx.wait(1).then(
      receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "DepositMade") {
          //Una vez confirmada la transaccion
          //guardar, etc
          deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
          };
          const doc = {
            rider_username: riderUsername,
            amount: amountToSend,
            driver_username: driverUsername,
            tripID: tripID
          }
          driversPayments.saveAmountToDriver(driverUsername,amountToSend);
          tripsPaid.insertOne(doc);
        } else {
          //falla la transaccion
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
      },
    );
    return tx;
  };


async function withdraw(driverUsername, amountToWithdraw) {
    console.log("LLEGUEEEEE WITHDRAWW");
    const driverWallet = await walletService.getDriverWallet(driverUsername);
    const ownerWallet = await walletService.getDeployerWallet();
    const basicPayments = await getContract(config, ownerWallet);
    //new_contract = basicPayments.connect(ownerWallet);
    console.log("LLEGUEEEEEEE WITHDRAW 22");
    const tx = await basicPayments.sendPayment(
        driverWallet.address,
        await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),{
            gasLimit: 100000,
        }
    );
    tx.wait(1).then(
        receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
            //Una vez confirmada la transaccion
            //guardar, etc
            deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
            };
            driversPayments.discountAmountToDriver(driverUsername,amountToWithdraw);
        } else {
            //falla la transaccion
            console.error(`Payment not created in tx ${tx.hash}`);
        }
        },
        error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
        },
    );
    return tx;
};

const getDepositReceipt =
  ({}) =>
  async depositTxHash => {
    return deposits[depositTxHash];
  };

exports.deposit = deposit;
exports.withdraw = withdraw;

