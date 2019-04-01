const abi=require("../family_tree_details").abi;
// const address=require("../family_tree_details").address;
const HDwallterprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

require("dotenv").config();

module.exports=(app)=>{
    app.get("/viewfamily",async (req,res)=>{
        var compressed=req.session.identity.compressed;
        var provider=new HDwallterprovider(
            process.env.PRIVATE_KEY,
            process.env.ROPSTEN_INFURA    
        );      
        var web3=new Web3(provider);
        var address=req.session.contractAddress;
        var contract=new web3.eth.Contract(abi,address);
        var numberOfChildren=await contract.methods.getChildrenLength(compressed).call();
        var children=[];
        var childrenDetail=[];
        console.log(numberOfChildren);
        
        for(var i=0;i<numberOfChildren;i++){
            var child=await contract.methods.getChild(compressed,i).call();
            children.push(child);

        }

        for(var child in children){
            
            var detail=await contract.methods.get(children[child]).call();
          
            childrenDetail.push(detail);
        }
        //Parent Search

        var numberOfParent=await contract.methods.getParentLength(compressed).call();
        var parents=[];
        var parentDetail=[]
        console.log(numberOfParent);
        for(var i=0;i<numberOfParent;i++){

            var parent=await contract.methods.getParent(compressed,i).call();
        
            parents.push(parent);

        }
        for(var parent in parents){
            var detail=await contract.methods.get(parents[parent]).call();
            parentDetail.push(detail);
        }
    

    
        res.render("search",{parents:parentDetail,children:childrenDetail,message:"done"});

    });
  
}