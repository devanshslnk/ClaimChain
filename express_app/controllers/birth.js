const Web3=require('web3');
const ethCryto=require('eth-crypto');
const HDwalletprovider=require("truffle-hdwallet-provider");
const createIdentity=require("./create_identity");

    // { address: '0x7e258B72aBB2cad96137f43ae11Fcb32601AffDe',
    // compressed:020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c
//   privateKey:
//    '0xe87d48e461fc33004613d990b6009662afcf7b12321d479d3ad2e53933309a51',
//   publicKey:
//    '0a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8cda6650e475788f3487cc035e426f414d0e97085a45c5e5fa9a391afd59425d84' }
    
// "020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c","Devansh","solanki",1,1,1

module.exports=(app)=>{
    
    app.get("/birth",async (req,res)=>{
        
        // const provider=

  
        // console.log(compressed);
        // var decompressed=ethCryto.publicKey.decompress(
        //     compressed
        // );
        // // console.log(decompressed);
        res.render('birth_form',{});


    });
    app.post("/birth",async (req,res)=>{
        var fatherKey=req.body.father_public_key;
        var timestamp=Date.now();
        var identity=createIdentity();
        var decompressed=ethCryto.publicKey.decompress(
            fatherKey
        );
        var newPublicKey=identity.publicKey;
        var newCompressed=ethCryto.publicKey.compress(
            newPublicKey
        );  
        
        var message=identity.privateKey+"#"+decompressed+"#"+timestamp;
        var encrypted=await ethCryto.encryptWithPublicKey(
            decompressed,
            message
        );
        
        res.render("result",{encrypted_message:JSON.stringify(encrypted)});
        // var decrypted=await ethCryto.decryptWithPrivateKey(
        //     '0xe87d48e461fc33004613d990b6009662afcf7b12321d479d3ad2e53933309a51',
        //     encrypted
        // );
        // // console.log(message);
        // console.log(decrypted);

        // {"iv":"53e1ec3dc573c77eb793d974b104f843","ephemPublicKey":"0467224156cdbccc07a7f854b727240a74bc9c472a852b9d8e4e73cf8baacb09b11c4d6bd666ed2ff4d927180273e95e0064eac41d85b64324cd8856dd8f601351","ciphertext":"f458dd0290da9a8951741849cb914bd7ef9ffa0c7092085e057a5535b43a810b7683aa30df8decb7807c064310c9fdc7b9c022d998b97d5533202e1c76b2ba7f2a5475074e883ef78825f2ac87f2335c427c868c5a14d70137aa6e9299899b9c6c9b30fa77a9b08c14aad14100c715c0b63a36f44816d88cdc64656758a9ebcd98d823209423ef80549a912a53aa72f74260daacba79784f6ba0825c483c74124f2dafc8285d06ffffd426435d54f641aceecc88c329d8544b98d8173646e23fea308aa5b31271b90e1fc65f3e5ad7d5fd55d6b6f52702d3fd4440cf37b4e2f1","mac":"be0cee5f052d456b25f7960326a1d7d7af7e09bcccf2a6ff826862ad8faa1922"}
    });
    
}