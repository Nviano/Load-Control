import React from 'react';
import { Slave } from 'react-syncing';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';


export default withRouter(class ButtonMenuHomePlayer extends Slave {
    render() {

        return (
            <div>

                <Button style={{ color: "white", flexGrow: 1 }} onClick={() => { this.props.history.push("/home") }} >
                    {this.state.nombre}
                </Button>
                <Button style={{ color: "white", }} onClick={() => { this.props.history.push("/profile") }} >
                    Perfil
                </Button>
                <Button style={{ color: "white", }} onClick={() => { this.props.history.push("/trainings-player") }} >
                    Entrenamientos
                </Button>
            </div>
        );
    }
})


