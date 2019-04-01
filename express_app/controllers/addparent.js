const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

module.exports=(app)=>{

    app.get("/addparent",(req,res)=>{
        res.render("addparent",{message:null});
    });

    app.post("/addparent",async (req,res)=>{
        console.log("posted1");
        var contractaddr=req.body.contractaddr;
        var mypubkey=req.body.mypubkey;
        var fatherpubkey=req.body.fatherpubkey;
        var motherpubkey=req.body.motherpubkey;
        console.log(contractaddr,mypubkey,fatherpubkey,motherpubkey);
        try 
        {   
            var provider=new HDwalletprovider(
                mypubkey,
                'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
            );
            const web3=new Web3(provider);
            const accounts=await web3.eth.getAccounts();
            const contract=new web3.eth.Contract(abi,contractaddr);
            
            const myAddress = EthCrypto.publicKey.toAddress(
                mypubkey
            );

            var mypubkeyCompressed=ethCrypto.publicKey.compress(mypubkey);
            var fatherCompressed=ethCrypto.publicKey.compress(fatherpubkey);
            var motherCompressed=ethCrypto.publicKey.compress(motherpubkey);
            
            console.log(mypubkeyCompressed,fatherCompressed,motherCompressed);
            var contractReceiptFather=await contract.methods.addFather(fatherCompressed,mypubkeyCompressed).send({
                "from":myAddress
            });
            console.log(contractReceiptFather);
            var contractReceiptMother=await contract.methods.addMother(motherCompressed,mypubkeyCompressed).send({
                "from":myAddress
            });
            console.log(contractReceiptMother);
            

            res.render("addparent",{message:"success"});
        }
        catch(err){
            console.log(err)
            res.render("addparent",{message:"BAD MAC"});
        }
    });
}