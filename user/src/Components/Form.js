import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';
import axios from 'axios';
import './Form.css';

class friendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    addFriend = () => {
        const { firstName, lastName, age } = this.state;
        axios
            .post('http://localhost:27017/api/friends', { firstName, lastName, age })
            .then((response) => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    age: '',
                });
            })
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            onChange={ this.handleInputChange }
                            required />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            placeholder="Last Name" 
                            onChange={ this.handleInputChange }
                            required />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            type="number" 
                            name="age" 
                            id="age" 
                            placeholder="Age" 
                            onChange={ this.handleInputChange }
                            required />
                    </FormGroup>

                    <Button type='submit' onClick={ this.addFriend }>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default friendForm;