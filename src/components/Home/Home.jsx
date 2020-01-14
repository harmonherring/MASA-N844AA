import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import { masafetch, isAuthed, history } from 'utils';

import { Button } from 'reactstrap';

import './home.css';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: false,
            success: false
        }
    }

    componentDidMount = () => {
        if (isAuthed()) {
            console.log("Authed");
        } else {
            console.log("Not Authed");
        }
    }

    test = () => {
        let init = {
            credentials: "include"
        };
        fetch("https://api-dev.masa.herri.ng/auth/check", init)
        .then((response) => {
            if (response.status === 200) {
                console.log(response.status);
                this.setState({
                    test: true,
                    success: true
                });
            } else {
                this.setState({
                    test: true,
                    success: false
                });
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                test: true,
                success: false
            });
        });
    }

    logout = () => {
        let init = {
            method: "DELETE",
            credentials: "include"
        }
        fetch("https://api-dev.masa.herri.ng/auth/logout", init)
        .then((response) => {
            history.push('/login')
        })
    }

    render() {
        return(
            <Container>
                <Row>
                    <Button className="test_button" color="primary" onClick={() => history.push('/login')}>Login</Button>
                    <Button className="test_button" color="danger" onClick={() => this.logout()}>Logout</Button>
                </Row>
                <Row>
                    <button className="button" color="primary" onClick={() => history.push('/display')}>Display</button>
                </Row>
                <Row>
                    <button className="button" color="primary" onClick={() => this.test()}>Test Login</button>
                    {
                        this.state.test ? (
                            this.state.success ? (
                                <h1 style={{color: "green", textAlign: "center", width: "100%"}}>Success</h1>
                            ) : (
                                <h1 style={{color: "red", textAlign: "center", width: "100%"}}>Failure</h1>
                            )
                        ) : (
                            <></>
                        )
                    }
                </Row>
            </Container>
        );
    }
}

export default Test;
