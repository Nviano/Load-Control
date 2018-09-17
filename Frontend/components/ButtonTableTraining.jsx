import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'


export default withRouter(function ButtonTablePlayer({ history, idTraining }) {
    return (
        <div>
            <Button onClick={() => { history.push("/report-triaining-player/" + idTraining) }} variant="contained" size="small" color="primary" >
                Reporte
            </Button>

        </div>
    );
})


