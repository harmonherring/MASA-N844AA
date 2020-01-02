import React from 'react';

import { Button, Form, Input, FormGroup, Label } from 'reactstrap';

import { history } from 'utils';

class LoginContents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            error: false,
        }
    }

    updateStateVar = (event, variableName) => {
        this.setState({
            [variableName]: event.target.value
        });
    }

    login = () => {
        if (!(this.state.username && this.state.password)) {
            this.props.raiseError("Missing username or password");
            return;
        }
        let init = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": this.state.username, 
                "password": this.state.password
            })
        }
        
        fetch("https://api-dev.masa.herri.ng/auth/login", init)
        .then((response) => response.json())
        .then((jsonresponse) => {
            if (jsonresponse.status === "success") {
                history.push('/')
            } else {
                this.props.raiseError(jsonresponse.message);
            }
        });
    }

    register = () => {
        this.setState({
            error: false
        });
        if (!(this.state.password && this.state.password2 && this.state.email && this.state.username)) {
            this.props.raiseError("All fields are required");
            return;
        }
        if (this.state.password != this.state.password2) {
            this.props.raiseError("Passwords don't match");
            return;
        }
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
                "email": this.state.email
            })
        }
        fetch("https://api-dev.masa.herri.ng/users/", init)
        .then(response => response.json())
        .then((jsonresponse) => {
            if (jsonresponse.status != "success") {
                this.props.raiseError(jsonresponse.message);
            } else {
                this.props.raiseSuccess("Account created, please wait for activation");
            }
        })
    }

    render = () => {
        if (!this.props.registration) {
            return (
                <div className="login_contents">
                    <h1 className="title">Login</h1>
                    <Form>
                        <FormGroup>
                            <Label for="username_field" className="label">Username/Email</Label>
                            <Input type="text" name="username" className="form_input" id="username_field" placeholder="AzureDiamond" onChange={(event) => this.updateStateVar(event, "username")} value={this.state.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password_field" className="label">Password</Label>
                            <Input type="password" name="password" className="form_input" id="password_field" placeholder="hunter2" onChange={(event) => this.updateStateVar(event, "password")} value={this.state.password}/>
                        </FormGroup>
                        <Button color="primary" className="continue" onClick={() => this.login()}>Login</Button>
                    </Form>
                </div>
            )
        } else {
            return (
                <div className="login_contents">
                    <h1 className="title">Register</h1>
                    <Form>
                        <FormGroup>
                            <Label for="email_field" className="label">Email</Label>
                            <Input type="email" name="email" className="form_input" id="email_field" placeholder="AzureDiamond@gmail.com" onChange={(event) => this.updateStateVar(event, "email")} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="username_field" className="label">Username</Label>
                            <Input type="text" name="username" className="form_input" id="username_field" placeholder="AzureDiamond" onChange={(event) => this.updateStateVar(event, "username")} value={this.state.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password_field" className="label">Password</Label>
                            <Input type="password" name="password" className="form_input" id="password_field" placeholder="hunter2" onChange={(event) => this.updateStateVar(event, "password")} value={this.state.password}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password2_field" className="label">Confirm Password</Label>
                            <Input type="password" name="password2" className="form_input" id="password2_field" placeholder="hunter2" onChange={(event) => this.updateStateVar(event, "password2")} value={this.state.password2}/>
                        </FormGroup>
                        <Button color="primary" className="continue" onClick={() => this.register()}>Register</Button>
                    </Form>
                </div>
            )
        }
    }
}

export default LoginContents;
