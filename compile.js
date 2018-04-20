const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol');

const sourceInbox = fs.readFileSync(inboxPath,"utf8");
const sourceLottery = fs.readFileSync(lotteryPath,"utf8");

module.exports = {
    Inbox: solc.compile(sourceInbox,1).contracts[":Inbox"],
    Lottery: solc.compile(sourceLottery,1).contracts[":Lottery"]
};