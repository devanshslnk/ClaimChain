pragma solidity ^0.4.0;

contract FamilyTree{
        
        int256 public numberOfFamilyMemmber;
        
        
        
        struct FamilyNode{
            int256 id;
            string
            publicKey;
            string
            firstName;
            string
            lastName;
            int128 dob;
            int128 dod;
            int8 gender;
            string
            spouse;
            int8 marriageStatus;
            string
            [] parents;
            string
            [] children;
            int256 numberOfChildren;
            string
            deathCerti;
            
        }
        
        mapping (string
        =>FamilyNode) familyTree;
        
        constructor(
        
            string
            publicKey,
            string
            firstName,
            string
            lastName,
            int128 dob,
            int8 gender,
            int8 marriageStatus
            ) public {
            
            string
            [] memory parents;
            string
            [] memory  children;
 
            FamilyNode memory node=FamilyNode(
                    0,
                    publicKey,
                    firstName,
                    lastName,
                    dob,
                    -1,
                    
                    gender,
                    "",
                    marriageStatus,
                    parents,
                    children,
                    0,
                    ""
                    
                );
                
                familyTree[publicKey]=node;
                numberOfFamilyMemmber++;
                
                
        }
        function addFamilyMember
            (string
            publicKey,
            string
            firstName,
            string
            lastName,
            int128 dob,
      
            int8 gender,
     
            int8 marriageStatus
            ) public {
                string
                [] memory parents;
                string
                [] memory children;
                familyTree[publicKey]=FamilyNode(
                    numberOfFamilyMemmber,
                    publicKey,
                    firstName,
                    lastName,
                    dob,
                    -1,
                    
                    gender,
                    "",
                    marriageStatus,
                    parents,
                    children,
                    0,
                    ""
                    
                );
                
                       
                
            }
            
        function addFather(string
        father,string
        son) public {
            familyTree[son].parents.push(father);
            familyTree[father].children.push(son);
            
            // add mother as well
            if(bytes(familyTree[father].spouse).length!=0 && familyTree[son].parents.length==1){
            
                familyTree[familyTree[father].spouse].children.push(son);
                familyTree[son].parents.push(familyTree[father].spouse);
            }
            
        }
        function addMother(string
        mother,string
        son) public {
            familyTree[son].parents.push(mother);
            familyTree[mother].children.push(son);
            
            // add father as well 
            if(bytes(familyTree[mother].spouse).length !=0 && familyTree[son].parents.length==1){
                familyTree[familyTree[mother].spouse].children.push(son);
                familyTree[son].parents.push(familyTree[mother].spouse);
            }
        }
        
        function addChild(string
        child,string
        father) public {
            familyTree[father].children.push(child);
            familyTree[child].parents.push(father);
            
            // add the other parent
            if(bytes(familyTree[father].spouse).length!=0){
                familyTree[familyTree[father].spouse].children.push(child);
                familyTree[child].parents.push(familyTree[father].spouse);
            }
        }
        
        function onDeath(string
        deceased,string
        deathCerti) public {
            familyTree[deceased].dod=-1;
            familyTree[deceased].deathCerti=deathCerti;
            
            
        }
        
        
        function mairrage(string
        wife,string
        husband) public{
            familyTree[husband].spouse=wife;
            familyTree[husband].marriageStatus=1;
            
            familyTree[wife].spouse=husband;
            familyTree[wife].marriageStatus=1;
            
        }
        
        function divorce(string
        wife,string
        husband) public {
            familyTree[husband].marriageStatus=-1;
            familyTree[wife].marriageStatus=-1;
        }
        
        
        
        function check() public view returns (int256){
            return numberOfFamilyMemmber;
            
        }
        function get(string publicKey) public view returns (string,string,int8){
            FamilyNode memory node=familyTree[publicKey];
            return (
                node.firstName,
                node.lastName,
                node.gender
                );
        }   
        
        
        
    
    
}