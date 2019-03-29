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

module.exports=(app)=>{
    app.use(session({
        key:"user_sid",
        secret:"sometext",
        resave:false,
        saveUninitialized: false,
        // store:new MongoStore({
        //     url:'mongodb://localhost:27017/MedEasy',
        //     autoRemove:false
        // })
    }));
    app.get("/signupws",(req,res)=>{
        res.render("signupws",{message:null});
    });

    app.post("/signupws",async (req,res)=>{
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        // var public_key=JSON.parse(req.body.public_key);
        var gender=req.body.gender;
        if(gender==="male"){
            gender=0
        }else{
            gender=1
        }
        var marraigeStatus=1;

        // Creating identity
        var identity=createIdentity();
        console.log(identity);
        var newPublicKey=identity.publicKey;
        var newCompressed=ethCrypto.publicKey.compress(
            newPublicKey
        );
        
        // Setting provider and web3
        const provider=new HDwalletprovider(
            "6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7",
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
        );
        const web3=new Web3(provider);

        // Deploying smart contract
        var contract=await new web3.eth.Contract(abi).deploy({data:byteCode,arguments:[newCompressed,first_name,last_name,dob,gender,marraigeStatus]}).send({
            from:"0x2248d96D13198CC52274f30F029C241c87b5a23c",
            gas:'4700000'
        });
        
        // getting address of deployed smart contracts
        var contractAddress=contract.options.address;
        var path=__dirname+"/"+identity.address+".txt";
        var data={
            identity:identity,
            familyAddress:contractAddress
        };

        // Setting up sessions
        req.session.identity=identity;
        req.session.address=contractAddress;
        console.log(req.session.identity);

        // res.render("home",{});
        res.redirect("/home");
        
        // fs.writeFileSync(path,JSON.stringify(data),'utf8',(err)=>{
        //     console.log(err);
        // });


        
        // res.setHeader('Content-disposition', 'attachment; filename=' + identity.address+".txt");
        // res.setHeader("Location",'http://localhost:3000/')
        // res.download(path,identity.address+'.txt',(err)=>{
        //     if(err){
        //         console.log(err);
        //     }
        // });
    
        
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