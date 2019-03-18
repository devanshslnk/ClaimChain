
const ethCrypto=require('eth-crypto');


module.exports=(app)=>{

    app.get("/registeration",(req,res)=>{
        res.send("registeration");
    });
}