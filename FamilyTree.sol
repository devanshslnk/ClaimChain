pragma solidity ^0.4.0;

contract FamilyTree{
        
        int256 public numberOfFamilyMemmber;
        
        
        
        struct FamilyNode{
            int256 id;
            address publicKey;
            bytes32 firstName;
            bytes32 lastName;
            int128 dob;
            int128 dod;
            int8 status;
            int8 gender;
            string birthCerti;
            string adhaar;
            address spouse;
            int8 marriageStatus;
            address[] parents;
            address[] children;
            int256 numberOfChildren;
            string deathCerti;
            
        }
        
        mapping (address=>FamilyNode) familyTree;
        
        constructor(
        
            address publicKey,
            bytes32 firstName,
            bytes32 lastName,
            int128 dob,
            int8 gender,
            string birthCerti,
            string adhaar,
            int8 marriageStatus
            ) public {
            
            address[] memory parents;
            address[] memory  children;
 
            FamilyNode memory node=FamilyNode(
                    0,
                    publicKey,
                    firstName,
                    lastName,
                    dob,
                    0,
                    -1,
                    gender,
                    birthCerti,
                    adhaar,
                    0x0,
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
            (address publicKey,
            bytes32 firstName,
            bytes32 lastName,
            int128 dob,
            string birthCerti,
            int8 gender,
            string adhaar,
            int8 marriageStatus
            ) public {
                address[] memory parents;
                address[] memory children;
                familyTree[publicKey]=FamilyNode(
                    numberOfFamilyMemmber,
                    publicKey,
                    firstName,
                    lastName,
                    dob,
                    0,
                    -1,
                    gender,
                    birthCerti,
                    adhaar,
                    0x0,
                    marriageStatus,
                    parents,
                    children,
                    0,
                    ""
                    
                );
                
                       
                
            }
            
        function addFather(address  father) public {
            familyTree[msg.sender].parents.push(father);
            familyTree[father].children.push(msg.sender);
            
            // add mother as well
            if(familyTree[father].spouse!=0x0 && familyTree[msg.sender].parents.length==1){
            
                familyTree[familyTree[father].spouse].children.push(msg.sender);
                familyTree[msg.sender].parents.push(familyTree[father].spouse);
            }
            
        }
        function addMother(address mother) public {
            familyTree[msg.sender].parents.push(mother);
            familyTree[mother].children.push(msg.sender);
            
            // add father as well 
            if(familyTree[mother].spouse!=0x0 && familyTree[msg.sender].parents.length==1){
                familyTree[familyTree[mother].spouse].children.push(msg.sender);
                familyTree[msg.sender].parents.push(familyTree[mother].spouse);
            }
        }
        
        function addChild(address child) public {
            familyTree[msg.sender].children.push(child);
            familyTree[child].parents.push(msg.sender);
            
            // add the other parent
            if(familyTree[msg.sender].spouse!=0x0){
                familyTree[familyTree[msg.sender].spouse].children.push(child);
                familyTree[child].parents.push(familyTree[msg.sender].spouse);
            }
        }
        
        function onDeath(address deceased,string deathCerti) public {
            familyTree[deceased].status=-1;
            familyTree[deceased].deathCerti=deathCerti;
            
            
        }
        
        
        function mairrage(address wife,address husband) public{
            familyTree[husband].spouse=wife;
            familyTree[husband].marriageStatus=1;
            
            familyTree[wife].spouse=msg.sender;
            familyTree[wife].marriageStatus=1;
            
        }
        
        function divorce(address wife,address husband) public {
            familyTree[husband].marriageStatus=-1;
            familyTree[wife].marriageStatus=-1;
        }
        
        
        
        function check() public view returns (int256){
            return numberOfFamilyMemmber;
            
        }
        
        
        
    
    
}