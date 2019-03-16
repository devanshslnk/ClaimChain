import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import Web3 from 'web3';
// import GPG from 'gpg/lib/gpg';
// gpg = new GPG();
// var gpg = require('gpg');
// web3 = new Web3();
class registration extends Component {

  state = {
    test_string : "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa010xF2CD2AA0c7926743B1D4310b2BC984a0a453c3d416032019041320",
  }

  Enc = async(event)=>{
    const test_string = this.state.test_string;
    console.log(test_string);
    //Method 1 failed
    // gpg.encrypt(test_string,['--recipient', '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'], function(err, encrypted){
    //   console.log(err);
    //   const encryptedString = encrypted.toString();
    //   console.log(encryptedString);
    // });    
    //Method 2 passed but only for symmetric keys
    // var CryptoJS = require("crypto-js");
 
    // // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(test_string, '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01');
     
    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("Hola"); 
    // console.log(plaintext); 
    
    // Method 3 eth-crypto
    const EthCrypto = require('eth-crypto');

    // create identitiy with key-pairs and address
    const alice = EthCrypto.createIdentity();
    console.log("identity");
    console.log(alice);
    const secretMessage = test_string;
    const encrypted = await EthCrypto.encryptWithPublicKey(
        alice.publicKey, // encrypt with alice's publicKey
        secretMessage
    );
    console.log("encrypted");
    console.log(encrypted);
    const decrypted = await EthCrypto.decryptWithPrivateKey(
        alice.privateKey,
        encrypted
    );
    console.log("decrypted");
    console.log(decrypted);    
    if(decrypted === secretMessage) console.log('sucess');
  }

  Acc = async(event) =>{
    // console.log(web3.eth.accounts.create());
  }
  
  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="something@idk.cool"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="don't tell!"
          />
        </FormGroup>
        <Button>Submit</Button>
        <br></br>
        <Button onClick={ this.Acc }>Create Acc</Button>
        <br></br>
        <Button onClick={ this.Enc }>Encrypt Data</Button>
      </Form>
    );
  }
}

export default registration;
