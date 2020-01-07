import React from 'react';

import { Button } from 'reactstrap';

class RegistrationContents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registration: false,
        }
    }

    render = () => {
        if (this.props.registration) {
            return (
                <div className="register_box">
                    <h4>Already have an account?</h4>
                    <Button id="sign_up" outline onClick={() => this.props.modifyRegistration(false)}>Log in</Button>
                </div>
            );
        } else {
            return (
                <div className="register_box">
                    <h4>Need an account?</h4>
                    <Button id="sign_up" outline onClick={() => this.props.modifyRegistration(true)}>Register now</Button>
                </div>
            );
        }
    }
}

export default RegistrationContents;
