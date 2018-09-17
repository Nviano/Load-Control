import React from 'react';
import { Slave } from 'react-syncing';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import image from '../images/team.jpg';

let id = 0;

export default class TeamStaff extends Slave {
    constructor() {
        super()

        this.getPlayerClub = this.getPlayerClub.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.state = {
            players: [],
            player: {},
        }
    }

    didMount() {
        this.getPlayerClub();

    }

    getPlayerClub() {
        const url = `http://localhost:8000/team`;
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
                    players: res.result
                })
                console.log(res.result);
            })
            .catch(error => {
                console.log(error)
            })
    }

    deletePlayer(idPersona) {
        const url = `http://localhost:8000/persona/delete`;

        fetch(url, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idPersona: idPersona })

        })
            .then((res) => res.json())
            .then(res => {
                if (res.ok) {
                    this.getPlayerClub()
                    this.set({
                        player: res.result

                    })
                    swal({
                        title: "¿Estas seguro?",
                        text: "Una vez eliminado,no podrás recuperarlo",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                swal("Tu jugador ha sido eliminado del equipo", {
                                    icon: "success",
                                });
                            } else {
                                swal("Tu jugador sigue en el equipo");
                            }
                        });
                }

                console.log(res.result);
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { players } = this.state;
        return (
            <div>
                <img style={{ opacity: 0.1, width: "100%", position: 'absolute' }} src={image}></img>

                <div style={{ backgroundColor: 'rgba(0,0,0,0)', width: '100%' }}>

                    <Paper style={{
                        width: '100%',
                        overflowX: 'auto',
                        backgroundColor: 'rgba(0,0,0,0)'
                    }}>
                        <Table style={{ minWidth: 700, marginTop: '10%', opacity: 1 }} key={id}>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell style={{ color: 'white' }}>Nombre</TableCell>
                                    <TableCell style={{ color: 'white' }} numeric>Posición</TableCell>
                                    <TableCell style={{ color: 'white' }} numeric>Altura</TableCell>
                                    <TableCell style={{ color: 'white' }} numeric>Peso</TableCell>
                                    <TableCell numeric></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ backgroundColor: '#E8EEEE' }}>
                                {players && players.map && players.map(player => {
                                    return (
                                        <TableRow key={player.idPersona} >
                                            <TableCell component="th" scope="player">
                                                {player.nombre + ' ' + player.apellidos}
                                            </TableCell>
                                            <TableCell numeric>{player.posicion}</TableCell>
                                            <TableCell numeric>{player.altura}</TableCell>
                                            <TableCell numeric>{player.peso}</TableCell>
                                            <TableCell numeric>
                                                <Button variant='contained' style={{ opacity: 0.8 }} color='primary' onClick={() => { this.props.history.push('/report-player/' + player.idPersona) }}>Ver</Button>
                                                <Button variant='contained' style={{ backgroundColor: '#FF9F1E', marginLeft: '15px', opacity: 0.8 }} onClick={() => { this.props.history.push('/chart/' + player.idPersona) }}>Gráfica</Button>
                                                <Button variant='outlined' style={{ marginLeft: '15px', opacity: 0.8 }} color='secondary' onClick={() => { this.deletePlayer(player.idPersona) }}>Eliminar</Button>
                                            </TableCell>
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
}






