import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
    Container,
    Col,
    Row,
    Alert } from 'reactstrap';
import LoginContents from './LoginContents';
import RegistrationContents from './RegistrationContents';
import { history } from 'utils';
import './login.css';
import 'assets/css/fonts.css';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            registration: false,
            error: false,
            errorMessage: "",
            success: false,
            successMessage: "",
        }
    }

    componentDidMount = () => {
        this.checkAuth();
    }

    checkAuth = () => {
        let init = {
            credentials: "include"
        }
        fetch("https://api-dev.masa.herri.ng/auth/check", init)
        .then((response) => {
            if (response.status === 200) {
                history.push('/')
            }
        })
    }

    modifyRegistration = (registrationState) => {
        this.setState({
            registration: registrationState,
        });
    }

    raiseError = (errorMessage) => {
        this.setState({
            success: false,
            error: true,
            errorMessage: errorMessage
        });
    }

    raiseSuccess = (successMessage) => {
        this.setState({
            error: false,
            success: true,
            successMessage: successMessage
        });
    }

    render() {
            return(
                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 3}}>
                            <div className="login_box">
                                <LoginContents registration={this.state.registration} raiseError={this.raiseError} raiseSuccess={this.raiseSuccess} />
                                {
                                    this.state.error ? (
                                        <Alert className="status_danger" color="danger">{this.state.errorMessage}</Alert>
                                    ) : this.state.success ? (
                                        <Alert className="status_success" color="success">{this.state.successMessage}</Alert>
                                    ) : (
                                        <></>
                                    )
                                }
                                <RegistrationContents registration={this.state.registration} modifyRegistration={this.modifyRegistration} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            );
    }
}

export default withRouter(Login)
