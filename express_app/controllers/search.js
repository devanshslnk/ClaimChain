const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwallterprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

module.exports=(app)=>{
    app.get("/search",async (req,res)=>{
        res.render("search",{message:null});
    });
    app.post("/search",async (req,res)=>{
        var publicKey=req.body.search;    
        var provider=new HDwallterprovider(
            '0xe87d48e461fc33004613d990b6009662afcf7b12321d479d3ad2e53933309a51',
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
        );      
        var web3=new Web3(provider);
        var contract=new web3.eth.Contract(abi,address);
        var numberOfChildren=await contract.methods.getChildrenLength(publicKey).call();
        var children=[];
        // var child=await contract.methods.getChild(publicKey,0).call();
        console.log(numberOfChildren);
        // console.log(child);
        for(var i=0;i<numberOfChildren;i++){
            var child=await contract.methods.getChild(publicKey,i).call();
            console.log(child);
            children.push(child);

        }
        
        console.log(children);
        
        //Parent Search

        var numberOfParent=await contract.methods.getParentLength(publicKey).call();
        var parents=[];
        console.log(numberOfParent);
        for(var i=0;i<numberOfParent;i++){
            var parent=await contract.methods.getParent(publicKey,i).call();
            console.log(parent);
            parents.push(parent);

        }
        
        console.log(parents);

        res.render("search",{message:null});
    });
}