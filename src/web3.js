import Web3 from 'web3';
import HDwalletprovider from 'truffle-hdwallet-provider';
import ethCrypto from 'eth-crypto';

let web3;
const entropy = Buffer.from('devansh', 'utf-8');
const identity=ethCrypto.createIdentity();
console.log(identity);

const provider=new HDwalletprovider(
    '6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7',
    // identity.privateKey,
    'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
);


web3=new Web3(provider);
if(web3.currentProvider!=='undefined'){
    console.log("provider is set");
}


const privateKey='6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7';
// const privateKey=identity.privateKey;
export default web3;
export {privateKey};

