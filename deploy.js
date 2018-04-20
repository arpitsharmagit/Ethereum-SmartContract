const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {Inbox, Lottery} =require('./compile');

const config = require('config');

const infuraKey = config.get('infuraKey');
const mnemonic = config.get('mnemonic');

const network = `https://rinkeby.infura.io/${infuraKey}`

const provider = new HDWalletProvider(
    mnemonic,
    network
);
const web3 = new Web3(provider);

const deployInbox = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy Inbox Contract from account',accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(Inbox.interface))
        .deploy({data:Inbox.bytecode,arguments:["Hi there!"]})
        .send({from:accounts[0],gas:'1000000'});
    console.log("Contract Inbox deployed to ",result.options.address);
}
deployInbox();

const deployLottery = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy Lottery from account',accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(Lottery.interface))
        .deploy({data:Lottery.bytecode})
        .send({from:accounts[0],gas:'1000000'});
    console.log("Contract Lottery deployed to ",result.options.address);
}
deployLottery();