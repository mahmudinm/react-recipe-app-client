import React from 'react';
import {
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

const Form = ({ handleSearch }) => {
  return (
    <FormGroup className="mb-3">
      <InputGroup className="input-group-alternative">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Search..." type="email" style={{ height: '55px' }} onChange={handleSearch}/>
      </InputGroup>
    </FormGroup>            
  )
}

export default Form;