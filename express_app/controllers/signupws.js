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
    app.use(session({
        key:"user_sid",
        secret:"sometext",
        resave:false,
        saveUninitialized: false,

    }));
    app.get("/signupws",(req,res)=>{
        if(req.session.identity!== undefined){
            res.redirect("/home");
        }
        else{
        res.render("signupws",{message:null});
        }
    });

    app.post("/signupws",async (req,res)=>{

        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        var gender=req.body.gender;
    
        console.log(typeof dob);

        if(gender==="male"){
            gender=0
        }else{
            gender=1
        }
        var marraigeStatus=0;

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
        

        // Setting up sessions
        req.session.identity=identity;
        req.session.contractAddress=contractAddress;
        
        console.log(req.session);
        

        //writing to a file
        var path=__dirname+"/"+identity.compressed+".txt";
     
        var data={
            identity:identity,
            familyAddress:contractAddress
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