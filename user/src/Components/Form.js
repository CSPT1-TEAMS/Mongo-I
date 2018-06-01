import React from 'react';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';
import axios from 'axios';
import './Form.css';

export default class Example extends React.Component {
    render() {
        return (
            <Container>
            <Form>
                <FormGroup>
                    <Input type="text" name="firstName" id="firstName" placeholder="First Name" required/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" required/>
                </FormGroup>
                    <FormGroup>
                        <Input type="number" name="age" id="age" placeholder="Age" required />
                    </FormGroup>
                
                <Button>Submit</Button>
            </Form>
            </Container>
        );
    }
}