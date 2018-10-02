import React from 'react';
import { Slave } from 'react-syncing';
import { TextField, Button } from '@material-ui/core';
import swal from 'sweetalert';


import image from '../images/bgrey.jpg';

export default class ProfilePlayer extends Slave {

    constructor() {
        super()

        this.getProfilePlayer = this.getProfilePlayer.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: {}
        }

    }

    didMount() {
        this.getProfilePlayer()
    }


    getProfilePlayer() {
        const url = `//server.nviano.es/vistaperfil-player`;
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
                    user: res.result
                })
                console.log(res.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleUpdate() {
        const url = `//server.nviano.es/jugador/modificar`;
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
                    email: this.state.email,
                    telefono: this.state.telefono,
                    peso: this.state.peso,
                    altura: this.state.altura,
                    avatar: this.state.avatar
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.ok) {
                        this.set({ ok: true })
                        swal("Buen trabajo", "Perfil modificado correctamente", "success");

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

            <div style={{ display: "flex" }} >
                <div onClick={() => document.querySelector('#avatar').click()}
                    style={{
                        width: '23.5%',
                        height: '80px',
                        marginTop: '200px',
                        marginLeft: '350px'
                    }}>
                    <img
                        style={{
                            width: "100%", borderStyle: 'solid', borderColor: 'black',
                            borderWidth: 5
                        }}
                        src={this.state.user.avatar}
                        value={this.state.avatar}
                        onChange={this.handleChange('avatar')}
                    ></img>
                    <h1 style={{ marginLeft: 100 }}>{this.state.user.nombre + ' ' + this.state.user.apellidos}</h1>
                </div>



                <div style={{
                    marginTop: 200.5,
                    marginLeft: "11.8%",
                    width: 400,
                    transform: "translateX(-50%)",
                    padding: '13px',
                    backgroundColor: 'white',
                    opacity: 0.7


                }}>

                    <form style={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap', width: 300 }}>

                        <TextField
                            label={this.state.user.email || ''}
                            value={this.state.email || ''}
                            onChange={this.handleChange('email')}
                            type="email"
                            margin="normal"
                            helperText="Email"
                        />

                        <TextField
                            label={this.state.user.telefono || ''}
                            value={this.state.telefono || ''}
                            onChange={this.handleChange('telefono')}
                            type="number"
                            margin="normal"
                            helperText="Teléfono"
                        />
                        <TextField
                            label={this.state.user.altura || ''}
                            value={this.state.altura || ''}
                            onChange={this.handleChange('altura')}
                            margin="normal"
                            type="text"
                            helperText="altura"
                        />
                        <TextField
                            label={this.state.user.peso || ''}
                            value={this.state.peso || ''}
                            onChange={this.handleChange('peso')}

                            helperText="peso"
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar"
                            type="file"
                        />
                        <Button
                            color="secondary"
                            style={{ marginTop: 50, width: 100 }}
                            onClick={this.handleUpdate}
                            variant="outlined">
                            Modificar
                            </Button>

                    </form>
                </div>

                <img src={image} style={{ width: '100%', position: 'absolute', opacity: 0.8, zIndex: -10 }} />
            </div>
        );
    }
}    
