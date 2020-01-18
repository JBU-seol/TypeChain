import * as CryptoJS from "crypto-js"

class Block {
    static calculateBlockHash = (
        index:number, 
        previousHash: string, 
        timestamp: number, 
        data: string
        ) : string => 
        CryptoJS.SHA256( index + previousHash + timestamp + data).toString();

    static ValidateStructure = (aBlock : Block) : boolean => 
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";
    
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor (
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const generalBlock:Block = new Block(0,"2524342","","First Block",123456);

let blockchain: Block[] = [generalBlock];

const getBlockChain = (): Block[] => blockchain;

const getLatesBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatesBlock();
    const newIndex: number = previousBlock.index + 1;
    const preHash: string = previousBlock.hash;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        preHash,
        newTimeStamp,
        data
    );
    const newBlock : Block = new Block(newIndex,newHash,preHash,data,newTimeStamp);
    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock : Block) : string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

const isBlockValid = (candidateBlock : Block, previousBlock : Block) : boolean => {
    if ( !Block.ValidateStructure(candidateBlock)){
        return false;
    }else if ( previousBlock.index + 1 !== candidateBlock.index){
        return false;
    }else if ( previousBlock.hash !== candidateBlock.previousHash){
        return false;
    }else if ( getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    }else{
        return true;
    }
};

const addBlock = (candidateBlock : Block) : void => {
    if( isBlockValid(candidateBlock, getLatesBlock())) {
        blockchain.push(candidateBlock);
    }else {
        console.log("add Block False");
    }
};

createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");

console.log(blockchain);

export {};