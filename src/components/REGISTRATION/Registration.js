import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import web3,{privateKey} from "../../web3";
import HDwalletprovider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

const ethCrypto=require('eth-crypto');
class registration extends Component {
  state = {};
  async componentDidMount(){
    if(typeof web3.currentProvider!=='undefined'){
      
      var accounts=await web3.eth.getAccounts();
      var account=accounts[0];
      const identity=ethCrypto.createIdentity();
      // console.log(account.length);
      // console.log(privateKey.length);
      // console.log(identity.length)
      // console.log(identity.publicKey.length);
      

      // console.log(address);
      var message="hello";
      const encrypted=await ethCrypto.encryptWithPublicKey(
        identity.publicKey,
        message
      );
      // console.log(encrypted);
      var decrypted=await ethCrypto.decryptWithPrivateKey(
        identity.privateKey,
        encrypted
      );
      console.log(decrypted);
      // var newAccount=web3.eth.accounts.create("devansh");
      // console.log(newAccount);
      // var publicKey=newAccount.address;
      // var privateKey=newAccount.privateKey;
      // console.log(publicKey.length);
      // console.log(privateKey.length);
      // var provider=new HDwalletprovider(
      //   privateKey,
      //   'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
      // );

      // web3=new Web3(provider);
      // var accounts=await web3.eth.getAccounts();
      // console.log(accounts[0]);


    }
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
      </Form>
    );
  }
}

export default registration;
