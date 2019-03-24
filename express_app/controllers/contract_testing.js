const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const ethCrypto=require("eth-crypto");
;module.exports=async (app)=>{
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
}