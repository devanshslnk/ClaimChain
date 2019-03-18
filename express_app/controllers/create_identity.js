const ethCrypto=require('eth-crypto');
module.exports=()=>{
    var identity=ethCrypto.createIdentity();
    console.log(identity.address);
    return identity;
}