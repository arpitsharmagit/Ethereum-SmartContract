const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile').Lottery;

let lottery;
let accounts;

beforeEach(async ()=>{
    accounts = await new web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode})
        .send({from:accounts[0],gas:'1000000'});
});

describe("Lottery Contract",()=>{
    it("should deployes a contract",()=>{
        assert.ok(lottery.options.address)
    });
    it("should allow to enter one player",async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0],players[0]);
        assert.equal(players.length,1);
    });
    it("should allow to enter multiple players",async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02','ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02','ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
        assert.equal(players.length,3);
    });
    it("requires a minimum amount of ether to enter", async ()=>{
        try{
            await lottery.methods.enter.send({
                from: accounts[0],
                value: 200
            });
            assert(false);
        }
        catch(err){
            assert.ok(err);
        }
    });
    it("only manager can call pick winner", async()=>{
        try{
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }
        catch(err){
            assert.ok(err);
        }
    });
    it("sends money to the winner and reset the array of player", async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        })
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({from: accounts[0]})
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;
                
        assert(difference> web3.utils.toWei('1.8','ether'));
    });
});
