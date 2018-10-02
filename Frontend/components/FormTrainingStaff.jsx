import React from 'react';
import { Slave } from 'react-syncing'
import { TextField, Button, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

import image from '../images/players.jpg'

const sesion = [
    {
        value: 'morning',
        label: 'Mañana',
    },
    {
        value: 'afternoon',
        label: 'Tarde',
    },
    {
        value: 'game',
        label: 'Partido',
    },
];

const color = "black";

export default withRouter(class FormTrainingStaff extends Slave {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleRegisterTraining = this.handleRegisterTraining.bind(this);


        this.state = {
            fecha: '',
            sesion: '',
            duracion: '',

        }


    }

    handleRegisterTraining() {
        const url = `//${process.env.SERVER}/addTrainingStaff`;

        fetch(url, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fecha: this.state.fecha,
                sesion: this.state.sesion,
                duracion: this.state.duracion,
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.ok) {
                    this.set({ ok: true })
                    swal("Bién Hecho", "Reporte creado correctamente", "success");
                    this.props.history.push("/home")
                } else {
                    this.set({ error: true, errorMsg: res.error })
                    swal("Error", res.error, "error");
                }
            })
            .catch(console.log)
    }


    handleChange(name) {
        return event => {
            this.set({
                [name]: event.target.value,
            });
        };
    }

    render() {


        return (
            <div >
                <div
                    style={{
                        width: '100%',
                        height: '103vh',
                        position: "fixed",
                        backgroundColor: "rgba(0,0,0,1)",
                    }}>
                    <img style={{ opacity: 0.7, width: "100%" }} src={image}></img>
                </div>
                <div
                    style={{
                        width: '50vw',
                        left: "50%",
                        transform: "translateX(-30%)",
                        position: "absolute",
                    }}>
                    <h1 style={{
                        marginTop: '130px',
                        marginLeft: '150px',
                        fontWeight: 'bolder',
                        fontSize: '40px',
                        color

                    }}>Registra tu entrenamiento</h1>

                    <h3 style={{ color, marginRight: '30px', marginLeft: '45px', marginTop: '80px' }}>Completa los datos del entrenamiento
                    para controlar el estado y la progresión de tus jugadores.</h3>
                    <div style={{
                        marginTop: 50,
                        marginLeft: "50%",
                        width: 500,
                        transform: "translateX(-50%)",
                        padding: '15px',
                        color
                    }}>
                        <div style={{ marginLeft: "50%", width: 700, transform: "translateX(-50%)", color }}>

                            <form style={{ display: 'flex', flexWrap: 'wrap', flexDirection: "column" }}>
                                <TextField
                                    label="Fecha de Entrenamiento"
                                    value={this.state.fecha}
                                    onChange={this.handleChange('fecha')}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                                <TextField
                                    select
                                    label="Sesión"
                                    value={this.state.sesion}
                                    onChange={this.handleChange('sesion')}

                                    helperText="Seleccion tipo de sesión"
                                    margin="normal"
                                >
                                    {sesion.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Duración"
                                    value={this.state.duracion}
                                    onChange={this.handleChange('duracion')}
                                    type="number"
                                    margin="normal"
                                />



                                <Button style={{ marginTop: 50 }} onClick={this.handleRegisterTraining} variant="contained" color='secondary'>Registrar</Button>

                            </form >

                        </div>
                    </div>
                </div>
            </div>

        );
    }
})




