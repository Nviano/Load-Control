import React from 'react';
import { Slave } from 'react-syncing';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';


export default withRouter(class ButtonMenuHomeStaff extends Slave {
    render() {

        return (
            <div>

                <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/profile-staff") }} >
                    Perfil
                </Button>
                <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/team-staff") }} >
                    Equipo
                </Button>
                <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/report-triaining-staff") }} >
                    Entrenamientos
                </Button>
                <Button
                    style={{ color: "white", flexGrow: "2" }}
                    onClick={() => {
                        this.props.history.push("/home");
                    }}
                >
                    {this.state.nombre || ""}
                </Button>
            </div>
        );
    }
})


