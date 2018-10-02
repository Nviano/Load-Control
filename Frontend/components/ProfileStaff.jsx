import React from 'react';
import { Slave } from 'react-syncing';
import { TextField, Button } from '@material-ui/core';


import image from '../images/bgrey.jpg';

export default class ProfileStaff extends Slave {

    constructor() {
        super()

        this.getProfileStaff = this.getProfileStaff.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: {},
        }
    }

    didMount() {
        this.getProfileStaff()
    }

    getProfileStaff() {
        const url = `//${process.env.SERVER}/vistaperfil-staff`;
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((res) => res.json())
            .then(res => {
                console.log("user", res.result)
                this.set({
                    user: res.result
                })
                console.log(res.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(name) {
        return event => {
            const user = this.state.user;
            user[name] = event.target.value
            this.set({
                user: user,
            });
        };
    }

    handleUpdate() {
        const url = `//${process.env.SERVER}/jugador/modificar`;
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
                    nombre: this.state.user.nombre,
                    apellidos: this.state.user.apellidos,
                    email: this.state.user.email,
                    telefono: this.state.user.telefono,
                    idPersona: this.state.user.idPersona,
                    avatar: this.state.user.avatar
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




    render() {
        return (
            <div style={{ display: "flex" }} >
                <div onClick={() => document.querySelector('#avatar').click()}
                    style={{
                        width: '28.3%',
                        height: '80px',
                        marginTop: '200px',
                        marginLeft: '390px'
                    }}>
                    <img
                        style={{
                            width: "75%", borderStyle: 'solid', borderColor: 'black',
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
                    marginLeft: "5%",
                    width: 400,
                    transform: "translateX(-50%)",
                    padding: '13px',
                    backgroundColor: 'white',
                    opacity: 0.7

                }}>

                    <form style={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap', width: 300 }}>
                        <TextField
                            value={this.state.user.nombre}
                            onChange={this.handleChange('nombre')}
                            margin="normal"
                            helperText="Nombre"
                        />
                        <TextField
                            value={this.state.user.apellidos}
                            onChange={this.handleChange('apellidos')}
                            margin="normal"
                            helperText="Apellidos"
                        />
                        <TextField
                            value={this.state.user.email}
                            onChange={this.handleChange('email')}
                            type="email"
                            margin="normal"
                            helperText="Email"
                        />

                        <TextField
                            value={this.state.user.telefono}
                            onChange={this.handleChange('telefono')}
                            type="number"
                            margin="normal"
                            helperText="Teléfono"
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
                <img src={image} style={{ position: 'absolute', opacity: 0.8, zIndex: -10, width: '100%' }} />

            </div>

        );
    }
}    
