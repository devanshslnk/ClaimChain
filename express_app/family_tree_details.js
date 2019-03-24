

const abi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "child",
				"type": "string"
			},
			{
				"name": "father",
				"type": "string"
			}
		],
		"name": "addChild",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "publicKey",
				"type": "string"
			},
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "dob",
				"type": "int128"
			},
			{
				"name": "gender",
				"type": "int8"
			},
			{
				"name": "marriageStatus",
				"type": "int8"
			}
		],
		"name": "addFamilyMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "father",
				"type": "string"
			},
			{
				"name": "son",
				"type": "string"
			}
		],
		"name": "addFather",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "mother",
				"type": "string"
			},
			{
				"name": "son",
				"type": "string"
			}
		],
		"name": "addMother",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "wife",
				"type": "string"
			},
			{
				"name": "husband",
				"type": "string"
			}
		],
		"name": "divorce",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "wife",
				"type": "string"
			},
			{
				"name": "husband",
				"type": "string"
			}
		],
		"name": "mairrage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "deceased",
				"type": "string"
			},
			{
				"name": "deathCerti",
				"type": "string"
			}
		],
		"name": "onDeath",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "publicKey",
				"type": "string"
			},
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "dob",
				"type": "int128"
			},
			{
				"name": "gender",
				"type": "int8"
			},
			{
				"name": "marriageStatus",
				"type": "int8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "check",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "int8"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "publicKey",
				"type": "string"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getChild",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "getChildrenLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfFamilyMemmber",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const address="0x3dd235f0722c89c81ff6316b1aa95887d413b1c6";

module.exports.abi=abi;
module.exports.address=address;