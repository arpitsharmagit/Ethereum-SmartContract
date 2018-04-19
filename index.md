## Welcome to Ethereum and Smart Contract World

This is a boilerplate for developing, testing and deploying ethereum Smart Contracts to Main/Test networks. It can cut the time for setting up environment and you can focus on developing Smart Contract. 

### Technologies/Packages used

This project is developed using Node.js so we have used below mentioned packages.

1. Solc@0.4.22 *for compiling interfaces(.sol) files*
2. ganache-cli@6.1.0 *local test network with 10 ether accounts*
3. web3@1.0.0-beta.26 *library to interact with ethernet using ABL and bytecode generated from solc*
4. mocha@5.1.1 *testing library for testing our Smart Contracts*
5. truffle-hdwallet-provider@0.0.3 *wallet provider library to manage contract deployement in Main/Rinkeby/TestNetwork*
6. config@1.30.0 *for reading application config file*

### Install metamask and get some ether

Install [MetaMask Chrome Extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and create account on MetaMask.
Get some eather from [rinkeby-faucet.com](http://rinkeby-faucet.com)

*Please note mnemonics to somewhere safe while creating account on MetaMask as this would be required to test with Real ethereum networks.*

### SignUp to infura.io

For testing the contracts on real network, you need to create account in [*infura.io*](http://infura.io) which provide access to Main/Rinkeby and other ethereum networks. Once you successfully signup you will receive an email with key and urls of ethereum networks.

### Project Structure

```
-Inbox
  -config
    -Development.json
  -contrats
    -Inbox.sol
  -test
    -Inbox.test.js
  compile.js
  deploy.js
  package.js
```

### Building Project

1. Git Clone https://github.com/arpitsharmagit/Ethereum-SmartContract.git
2. Navigate to Inbox folder.
3. Type ```npm install``` on command line.

### Deploy to Rinkeby

```npm run deploy```

### Support or Contact

Having trouble with building or any query? [Email](mailto:mr.arpit.sharma@hotmail.com) and I’ll help you sort it out.
