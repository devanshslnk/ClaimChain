import React, { Component } from 'react';

import Routes from './components/Routes';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class App extends Component {
  
  render() {
    return (
      // <Form inline>
      //   <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      //     <Label for="exampleEmail" className="mr-sm-2">
      //       Email
      //     </Label>
      //     <Input
      //       type="email"
      //       name="email"
      //       id="exampleEmail"
      //       placeholder="something@idk.cool"
      //     />
      //   </FormGroup>
      //   <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      //     <Label for="examplePassword" className="mr-sm-2">
      //       Password
      //     </Label>
      //     <Input
      //       type="password"
      //       name="password"
      //       id="examplePassword"
      //       placeholder="don't tell!"
      //     />
      //   </FormGroup>
      //   <Button>Submit</Button>
      // </Form>

      <div>
        <Routes/>

      </div>

    );
  }
}

export default App;



// first name middle and last birthday gender spouse (yes/no) children (yes/no) parents(compulsory)
// options ( self/ spouse/ parents/ chiledern/ )