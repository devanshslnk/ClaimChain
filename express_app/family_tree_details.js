const abi=[
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
			}
		],
		"payable": false,
		"stateMutability": "view",
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
	}
]

const address="0xf4d6e8140f176f57c842c86d46f4a594897553fd";
module.exports.abi=abi;
module.exports.address=address;