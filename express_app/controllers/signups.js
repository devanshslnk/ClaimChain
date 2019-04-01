const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
// const cookie=require("cookie-parser");

const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const byteCode=require("../family_tree_details").bytecode;
const createIdentity=require("./create_identity");

require("dotenv").config();

module.exports=(app)=>{

    app.get("/signups",(req,res)=>{
        if(req.session.identity!== undefined){
            res.redirect("/home");
        }
        else{
        res.render("signups",{message:null});
        }
    });

    app.post("/signups",async (req,res)=>{
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        var cipher_text=JSON.parse(req.body.cipher_text);
        var parentPrivateKey=req.body.privateKey;
        var gender=req.body.gender;
        if(gender==="male"){
            gender=0
        }else{
            gender=1
        }
        console.log(first_name,last_name,dob,cipher_text,parentPrivateKey,gender);
        var first_name1=req.body.first_name;
        var last_name1=req.body.last_name;
        var dob1=req.body.dob;
        var cipher_text1=JSON.parse(req.body.cipher_text);
        var parentPrivateKey1=req.body.privateKey;
        var gender1=req.body.gender;
        if(gender1==="male"){
            gender1=0
        }else{
            gender1=1
        }
        console.log(first_name1,last_name1,dob1,cipher_text1,parentPrivateKey1,gender1);

        var marraigeStatus=1;

        // Creating identity
        var identity=createIdentity();

        console.log(identity);
        var newPublicKey=identity.publicKey;
        var newCompressed=ethCrypto.publicKey.compress(
            newPublicKey
        );
        identity.compressed=newCompressed;
        // Setting provider and web3
        const provider=new HDwalletprovider(
            process.env.PRIVATE_KEY,
            process.env.ROPSTEN_INFURA
        );
        const web3=new Web3(provider);

        // Deploying smart contract
        var contract=await new web3.eth.Contract(abi).deploy({data:byteCode,arguments:[newCompressed,first_name,last_name,dob,gender,marraigeStatus]}).send({
            from:"0x2248d96D13198CC52274f30F029C241c87b5a23c",
            gas:'4700000'
        });
        
        //getting address of deployed smart contracts
        var contractAddress=contract.options.address;
        
        //Adding wife
        var identity1 = createIdentity();
        var newPublicKey1=identity1.publicKey;
        var newCompressed1=ethCrypto.publicKey.compress(
            newPublicKey1
        );
        identity1.compressed=newCompressed1;
        
        const contract1=new  web3.eth.Contract(abi,contractAddress);

        var contractWife = await contract1.methods.mairrage(newCompressed1,newCompressed).send({
            from:"0x2248d96D13198CC52274f30F029C241c87b5a23c",
            gas:'4700000'
        });

        console.log(contractWife);
        // Setting up sessions
        req.session.identity=identity;
        req.session.contractAddress=contractAddress;
        
        console.log(req.session);
        


        //writing to a file
        var path=__dirname+"/"+identity.compressed+".txt";
        
        var data={
            identity:identity,
            familyAddress:contractAddress,
            identity1:identity1
        };
    
        fs.writeFileSync(path,JSON.stringify(data),'utf8',(err)=>{
            console.log(err);
        });


        // download file
        // res.setHeader('Content-disposition', 'attachment; filename=' + identity.address+".txt");
        res.download(path,identity.compressed+'.txt',(err)=>{
            if(err){
                console.log(err);
            }else{
                
            }
        });

});

    app.get("/logout",(req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }        
        });
        res.redirect("/");
    });
}