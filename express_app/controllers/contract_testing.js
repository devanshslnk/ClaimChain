const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const ethCrypto=require("eth-crypto");
module.exports=async (app)=>{
    app.get("/contract_test",async (req,res)=>{

        const provider=new HDwalletprovider(
            "6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7",
            // identity.privateKey,
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
        );
        

        web3=new Web3(provider);
        if(web3.currentProvider!=='undefined'){
            console.log("provider is set");
        }
        
        
        const accounts=await web3.eth.getAccounts();
        console.log(accounts[0]);
        const contract=new  web3.eth.Contract(abi,address);
        // var member=await contract.methods.get('020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c').call();

        var lengthOfChildren=await contract.methods.getChildrenLength('020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c').call();
        var child=await contract.methods.getChild('020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c',0).call();
        var totalNumber =await contract.methods.numberOfFamilyMemmber().call();

        console.log(totalNumber);
        console.log(lengthOfChildren)        
        console.log(child);
        res.send("contract_test");
  

    });

    app.get("/data",async (req,res)=>{
        const provider=new HDwalletprovider(
            '6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7',
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
        );
        const web3= new Web3(provider);
        var parentCompressed='020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c';


// Parent
        // { address: '0x7e258B72aBB2cad96137f43ae11Fcb32601AffDe',
// compressed:020a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8c
//      privateKey:
//      '0xe87d48e461fc33004613d990b6009662afcf7b12321d479d3ad2e53933309a51',
//      publicKey:
//    '0a2e2b6145747022cf4d43c58572fb88c886352446ffd5ef1118577dc3797f8cda6650e475788f3487cc035e426f414d0e97085a45c5e5fa9a391afd59425d84' }

//child
// {"iv":"53e1ec3dc573c77eb793d974b104f843","ephemPublicKey":"0467224156cdbccc07a7f854b727240a74bc9c472a852b9d8e4e73cf8baacb09b11c4d6bd666ed2ff4d927180273e95e0064eac41d85b64324cd8856dd8f601351","ciphertext":"f458dd0290da9a8951741849cb914bd7ef9ffa0c7092085e057a5535b43a810b7683aa30df8decb7807c064310c9fdc7b9c022d998b97d5533202e1c76b2ba7f2a5475074e883ef78825f2ac87f2335c427c868c5a14d70137aa6e9299899b9c6c9b30fa77a9b08c14aad14100c715c0b63a36f44816d88cdc64656758a9ebcd98d823209423ef80549a912a53aa72f74260daacba79784f6ba0825c483c74124f2dafc8285d06ffffd426435d54f641aceecc88c329d8544b98d8173646e23fea308aa5b31271b90e1fc65f3e5ad7d5fd55d6b6f52702d3fd4440cf37b4e2f1","mac":"be0cee5f052d456b25f7960326a1d7d7af7e09bcccf2a6ff826862ad8faa1922"}
// child:1
// private key :0x69b3ff4f37114bff58a0e6e7bfed1fe2de3fa5c68dfcc18fa6f06028b09dff9b
// public key:e41ee5cb75e44ea105381e45df2c47a58ac162fdf21ef423e620368d67b3696e124b4086d398fef0d56747380522738439cbded47a37bb76a08f908ce340a7ae
// compressed :02e41ee5cb75e44ea105381e45df2c47a58ac162fdf21ef423e620368d67b3696e
// var first_name="Mihir";
// var last_name="Shah";
// var gender=1;
// var dob=1;
            // var children=[{
                
            // }];


            var compressed=ethCrypto.publicKey.compress(
                'e41ee5cb75e44ea105381e45df2c47a58ac162fdf21ef423e620368d67b3696e124b4086d398fef0d56747380522738439cbded47a37bb76a08f908ce340a7ae'
            );         
            console.log(compressed);

    });
}