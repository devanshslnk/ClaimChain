const Web3=require('web3');
const ethCryto=require('eth-crypto');
const HDwalletprovider=require("truffle-hdwallet-provider");
const createIdentity=require("./create_identity");
const session=require("express-session");
    // { address: '0x7e258B72aBB2cad96137f43ae11Fcb32601AffDe',
    // compressed:020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c
//   privateKey:
//    '0xe87d48e461fc33004613d990b6009662afcf7b12321d479d3ad2e53933309a51',
//   publicKey:
//    '0a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8cda6650e475788f3487cc035e426f414d0e97085a45c5e5fa9a391afd59425d84' }
    
// "020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c","Devansh","solanki",1,1,1

module.exports=(app)=>{
    
    app.get("/birth",async (req,res)=>{
        console.log(req.session);
        var fatherKey=req.session.identity.compressed;
        console.log(fatherKey);
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
       

        // {"iv":"53e1ec3dc573c77eb793d974b104f843","ephemPublicKey":"0467224156cdbccc07a7f854b727240a74bc9c472a852b9d8e4e73cf8baacb09b11c4d6bd666ed2ff4d927180273e95e0064eac41d85b64324cd8856dd8f601351","ciphertext":"f458dd0290da9a8951741849cb914bd7ef9ffa0c7092085e057a5535b43a810b7683aa30df8decb7807c064310c9fdc7b9c022d998b97d5533202e1c76b2ba7f2a5475074e883ef78825f2ac87f2335c427c868c5a14d70137aa6e9299899b9c6c9b30fa77a9b08c14aad14100c715c0b63a36f44816d88cdc64656758a9ebcd98d823209423ef80549a912a53aa72f74260daacba79784f6ba0825c483c74124f2dafc8285d06ffffd426435d54f641aceecc88c329d8544b98d8173646e23fea308aa5b31271b90e1fc65f3e5ad7d5fd55d6b6f52702d3fd4440cf37b4e2f1","mac":"be0cee5f052d456b25f7960326a1d7d7af7e09bcccf2a6ff826862ad8faa1922"}
        // {"iv":"dc29e405b24a080e186f81d6384f9786","ephemPublicKey":"045cd2a462415a911fd313d174027b94c9f254516cdf4b5234549fde3227ce7b63c5756be5c3a7a7fc3d95df7fb2d573996ef4ea8915db691c34fd67ebb454c7da","ciphertext":"02cd47d1ffaca8dc33ac7d012f10d5d31ea5e5ce589841a315b5421321cd08d9eb1b2e0b0c453f05a2f2c14993831139e53a15af349da8171c87378c62669ff91d4a7f37a9cf8d6939ca982f40d61db15fb878a330e9b3476486809b9ac41deeecc7f9186d02feee1ad6e767d34a5f3a4c0951e14a88f5cdefcbed6b22348d87142e5b2a02251d421829a4f445ae194f7ef432e5f35642db1894588c9fc11b4a670c8ad9ec090f5efb350a7306158c28cebf2e613594c6e3181fa1c9140a6337466d060a0bfb2a9c9ea6d533bb264e6cbf6b5f6500f420b9951467d16c062283","mac":"da40a312a8210388b584a1652ea16549516a9c7bdfec4fe89760b54d362f0ede"}
        
        // main test
        // {"iv":"65790bda361cf432842dff7049e3e097","ephemPublicKey":"04beee1e30ffc14e0ec2a4976ff7ed92d6bb5f225dd84b0d7de4b06f4fa7f28628dc8fa718f7c5c43c1ace3a795c5a2ddd358f4eaec2c03bd5f1aa85544e768c72","ciphertext":"a6eadd5b2f82e18fe860fbc504a29118022330e17e557754c98478621189d6faccb7cf9d943fd8d52ec1735a29ecb76a211bbc8f139c6a713d7d6a2a48a53bd5b3a084cd3a63da62786736f8e53e3769c285ba268cd73b66c3ec5b006274954796dfbab8735c089ac2fcfb19adf1c0963182566279332d2ef2ec0cfcba60f2e3c3cd30231fd91077ffdc6181262c00194eaebf5388cbcbec2662850b46b4c2916ac5da5be8f1c20a1ea3ba90df36749877b1ec0187a36600436458db9cb8780ecd0f9d5e69b9ecba370a9a65668bfa41c00b92fe88c865909f4fd1c0092a1d50","mac":"eeb6a5473a90849769ebaf9908db2bc4b7f4e1047f07c6b8e8ae7ff156dd41c6"}
    });
    
}