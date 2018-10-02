import React from 'react';
import { Slave } from 'react-syncing';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonTableTraining from './ButtonTableTraining';





let id = 0;

export default class TrainingsPlayer extends Slave {
    constructor() {
        super()

        this.getTrainings = this.getTrainings.bind(this);

        this.state = {
            trainings: [],

        }
    }

    didMount() {
        this.getTrainings()
    }

    getTrainings() {
        const url = `//server.nviano.es/trainings-player`;
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((res) => res.json())
            .then(res => {

                this.set({
                    trainings: res.result
                })
                console.log(res.result);
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {

        return (

            <Paper style={{
                width: '100%',
                marginTop: '100px',
                overflowX: 'auto',
            }}>
                <Table style={{ minWidth: 700 }} key={id}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'black' }} >
                            <TableCell style={{ color: 'white' }}>Fecha</TableCell>
                            <TableCell style={{ color: 'white' }} numeric>Sesión</TableCell>
                            <TableCell style={{ color: 'white' }} numeric>Duración</TableCell>
                            <TableCell style={{ color: 'white' }} numeric></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.trainings.map(training => {
                            return (
                                <TableRow style={{ backgroundColor: "default" }} key={training.idTraining} >
                                    <TableCell component="th" scope="training">
                                        {new Date(training.fecha).toLocaleDateString('es-ES')}
                                    </TableCell>
                                    <TableCell numeric>{training.sesion}</TableCell>
                                    <TableCell numeric>{training.duracion}</TableCell>
                                    <TableCell numeric><ButtonTableTraining idTraining={training.idTraining} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}





