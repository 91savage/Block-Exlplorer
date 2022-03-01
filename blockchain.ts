// Block 이라는 class 설정 ㅎ
class Block {
    
    //블록 구조의 필수적인 요소 구현 ㅎ
    public index: number;
    public hash: string;
    public previousHash: string;
    public timestamp: number;
    public data: string;

    constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

//genesis block 은 하드코딩 ㅎ 
const genesisBlock: Block = new Block(
//위의 블록구조 처럼 index, hash, previousHash, timestamp, data 순으로 정보가 기입되어 있음 ㅎ
    0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', null, 1465154705, 'my genesis block!!'
);

// 제네시스 블록을 가장 먼저 받아온다. 블록체인 저장을 시작하는 과정.
const blockchain: Block[] = [genesisBlock];

// 블록을 생성하는 과정 ㅎ
const generateNextBlock = (blockData: string) => {
    const previousBlock: Block = getLatestBlock();              //새로운 블록을 만들 때 전 블록을 현체인의 마지막 블록 설정
    const nextIndex: number = previousBlock.index +1;           // index를 설정하는 과정 ㅎ
    const nextTimestamp: number = new Date().getTime() / 1000;  // timestamp 를 설정하는 과정

    //calculateHash 으로 해시값 계산 ㅎ 
    const nextHash: string = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    //class의 Block 에 맞게 index, hash, previoushash, timestamp, data 순으로 정보 기입 하고, hash는 위의 nextHash값을 가져 옴ㅎ 
    const newBlock: Block = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
    return newBlock;
};



// Class Block 의 요소들로 hash 값을 계산하는 과정 ㅎ
const calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
