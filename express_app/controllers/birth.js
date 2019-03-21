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

        // {"iv":"c934b0fa46cd23f52e9d36167200697e","ephemPublicKey":"04332d5ff64e26bc84fd2672fd4f2d9f85d957dd69f2f3e34a8838f9cc36c5cac22845a60c71bfe438083d0b22a11212c442497ef5d2d317940f541694ac165acc","ciphertext":"bf47128f98911d69a19d452da6b92b911cde62e70a5874caba2d7fe76016e5de3aa72b843d57e56efdb522259fdafeca89d526fc85e186002cf6ab5ab4ab6f88ea2f6f7d37028e5ed531e4790201c80cd2472a4b975c2f7a966a56b3a7092f7deea8d2134d22896556f000d291aac1ec211b256819522185ee03b52e76a5b24f0ba675ae97c0a6208970198c2fbfa4982a587454fe83ee753a589a1f8aa9c8817c0473033616fc449d9e4269cb0d148ec17ed24e5c75d09819aac3b9047fc12ac35e8e146d9a4a0341fd78719cc9f1a56bd2190d2d4fa9b87e2a16b42f8f8423","mac":"a4f42a80119dbdfdff16697605705a07f637a25cf746ae9b487d1cb0210bee34"}

    });
    
}