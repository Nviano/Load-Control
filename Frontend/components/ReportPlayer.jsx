import React from 'react';
import { withRouter } from 'react-router-dom';
import { Slave } from 'react-syncing';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import image from '../images/reportbg.png';

let id = 0;
const color = 'white';
const opacity = 0.5;

export default withRouter(class TeamStaff extends Slave {
    constructor() {
        super()

        this.getPlayerClub = this.getPlayerClub.bind(this);

        this.state = {
            reports: []


        }
    }

    didMount() {
        this.getPlayerClub()
    }

    getPlayerClub() {
        const url = `//server.nviano.es/report-player`;
        fetch(url, {
            method: 'Post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPersona: this.props.match.params.idPersona,

            })

        })
            .then((res) => res.json())
            .then(res => {

                this.set({
                    reports: res.result
                })
                console.log(res.result);
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {

        return (
            <div>
                <div style={{ opacity: 0.7, width: "100%", position: 'absolute', zIndex: -1 }}>
                    <img style={{ width: "100%" }} src={image}></img>
                </div>
                <div style={{ backgroundColor: "rgba(0,0,0,0)", width: '100%', zIndex: 10 }}>
                    <Paper style={{
                        width: '100%',
                        overflowX: 'auto',
                        backgroundColor: 'rgba(0,0,0,0)'
                    }}>
                        <Table style={{ minWidth: 700, marginTop: '6%', opacity: 1 }} key={id}>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell style={{ color }}>Fecha</TableCell>
                                    <TableCell style={{ color }} numeric>RPE</TableCell>
                                    <TableCell style={{ color }} numeric>Descanso</TableCell>
                                    <TableCell style={{ color }} numeric>Información adicional</TableCell>
                                    {/* <TableCell style={{ color }} numeric></TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.reports.map(report => {
                                    return (
                                        <TableRow style={{ backgroundColor: "black", opacity }} key={report.idTrainingReport} >
                                            <TableCell style={{ color }} component="th" scope="report">
                                                {new Date(report.fecha).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell style={{ color, }} numeric>{report.RPE}</TableCell>
                                            <TableCell style={{ color }} numeric>{report.sleep}</TableCell>
                                            <TableCell style={{ color }} numeric>{report.info}</TableCell>
                                            {/* <TableCell style={{ color }} numeric><Button
                                                style={{ color }}
                                                variant='contained'
                                                color='primary'
                                                onClick={() => { this.props.history.push('/report/' + report.idTrainingReport) }}>
                                                Ver</Button></TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

            </div>
        );
    }
})






