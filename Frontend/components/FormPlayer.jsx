import React from 'react';
import { Slave } from 'react-syncing';
import { withRouter } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';
import ButtonSelectClub from './ButtonSelectClub';
import swal from 'sweetalert';

import image from '../images/bgFormPlayer.jpg';

const posicion = [
    {
        value: 'base',
        label: 'Base',
    },
    {
        value: 'alero',
        label: 'Alero',
    },
    {
        value: 'ala-pivot',
        label: 'Ala-Pivot',
    },
    {
        value: 'escolta',
        label: 'Escolta',
    },
    {
        value: 'pivot',
        label: 'Pivot',
    },
];

export default withRouter(class FormPlayer extends Slave {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.getClub = this.getClub.bind(this);

        this.state = {
            nombre: '',
            apellidos: '',
            email: '',
            password: '',
            pais: '',
            fechaNacimiento: '',
            telefono: '',
            clubes: [],
            club: '',
            altura: '',
            peso: '',
            posicion: 'base',


        }


    }
    didMount() {
        this.getClub();
    }


    getClub() {
        const url = `http://localhost:8000/club/`;
        axios.get(url)
            .then(res => {
                this.set({

                    clubes: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    };




    handleRegister() {
        const url = `http://localhost:8000/addPersona`;

        const reader = new FileReader();
        reader.readAsDataURL(window.document.querySelector("#avatar").files[0]);
        reader.onload = () => {
            fetch(url, {
                method: 'post',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    apellidos: this.state.apellidos,
                    pais: this.state.pais,
                    fechaNacimiento: this.state.fechaNacimiento,
                    telefono: this.state.telefono,
                    club: this.state.club,
                    clubes: this.state.clubes,
                    altura: this.state.altura,
                    peso: this.state.peso,
                    posicion: this.state.posicion,
                    email: this.state.email,
                    password: this.state.password,
                    avatar: reader.result
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.ok) {
                        this.set({ ok: true })
                        swal("Bién Hecho", "Registro creado correctamente", "success");
                        this.props.history.push("/login")
                    } else {
                        this.set({ error: true, errorMsg: res.error })
                        swal("Error", res.error, "error");

                    }
                })
                .catch(console.log)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

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
            <div style={{
                display: 'flex',
                flexFlow: 'column ,nowrap'
            }}>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'column ,nowrap',
                        width: '50%',
                        flex: 'row',
                        opacity: 0.8
                    }}>
                    <img style={{ opacity: 0.7, width: "100%" }} src={image}></img>

                </div>

                <div
                    style={{
                        width: '50%',
                        height: '60vw',
                        flex: 'row-reverse'
                    }}>
                    <h1 style={{
                        marginLeft: "25%",
                        marginTop: '20%',
                        fontWeight: 'bolder',
                        fontSize: '40px'

                    }}>Únete a Load Control</h1>
                    <div style={{
                        marginTop: 50,
                        marginLeft: "70%",
                        width: '100%',
                        transform: "translateX(-50%)",
                        padding: '15px',
                    }}>

                        <form style={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap', width: 500 }}>
                            <TextField
                                label="Nombre"
                                value={this.state.nombre}
                                onChange={this.handleChange('nombre')}
                                margin="normal"
                            />
                            <TextField
                                label="Apellidos"
                                value={this.state.apellidos}
                                onChange={this.handleChange('apellidos')}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                type="email"
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                value={this.state.password}
                                type="password"
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />
                            <TextField
                                label="Fecha de Nacimiento"
                                value={this.state.fechaNacimiento}
                                onChange={this.handleChange('fechaNacimiento')}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                label="Teléfono"
                                value={this.state.telefono}
                                onChange={this.handleChange('telefono')}
                                type="number"
                                margin="normal"
                            />
                            <TextField
                                label="Pais"
                                value={this.state.pais}
                                onChange={this.handleChange('pais')}
                                margin="normal"
                            />


                            <TextField
                                label="Peso"
                                value={this.state.peso}
                                onChange={this.handleChange('peso')}
                                type="number"
                                margin="normal"
                            />
                            <TextField
                                label="Altura"
                                value={this.state.altura}
                                onChange={this.handleChange('altura')}
                                type="number"
                                margin="normal"
                            />

                            <TextField
                                select
                                label="Posición"
                                value={this.state.posicion}
                                onChange={this.handleChange('posicion')}

                                helperText="Seleccion tu posición"
                                margin="normal"
                            >
                                {posicion.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <ButtonSelectClub
                                club={this.state.club}
                                clubes={this.state.clubes || []}
                                handleClub={(e) => { this.set({ club: e.target.value }) }}
                            />
                            <div style={{ marginTop: 30 }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="avatar"
                                    type="file"
                                />
                                <label htmlFor="avatar">
                                    <Button variant="contained" component="span">
                                        Upload Profile Image
                                    </Button>
                                </label>
                            </div>
                            <Button
                                color="secondary"
                                style={{ marginTop: 50, width: 100 }}
                                onClick={this.handleRegister}
                                variant="contained">
                                Registrar
                            </Button>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
})   