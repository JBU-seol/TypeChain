"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.ValidateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";
const generalBlock = new Block(0, "2524342", "", "First Block", 123456);
let blockchain = [generalBlock];
const getBlockChain = () => blockchain;
const getLatesBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatesBlock();
    const newIndex = previousBlock.index + 1;
    const preHash = previousBlock.hash;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, preHash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, preHash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.ValidateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatesBlock())) {
        blockchain.push(candidateBlock);
    }
    else {
        console.log("add Block False");
    }
};
createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");
console.log(blockchain);
//# sourceMappingURL=index.js.map