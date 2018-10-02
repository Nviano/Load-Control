import React from 'react';
import { Slave } from 'react-syncing'
import { TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import RadioButtonSleepQuality from './RadioButtonSleepQuality';
import RadioButtonRPE from './RadioButtonRPE';
import swal from 'sweetalert';

import image from '../images/kobbie.jpg';
import imgRPE from '../images/carga-rpe.jpg';
import imgPain from '../images/dolor.jpg';

const color = "black";

export default withRouter(class FormTrainingPlayer extends Slave {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleRegisterTraining = this.handleRegisterTraining.bind(this);


        this.state = {
            sleep: '',
            RPE: '',
            info: '',
            trainingId: ''
        }
    }

    handleRegisterTraining() {
        const url = `//${process.env.SERVER}/addTrainingPlayer`;

        fetch(url, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sleep: this.state.sleep,
                RPE: this.state.RPE,
                info: this.state.info,
                idClub: this.state.idClub,
                idTraining: this.props.match.params.idTraining,
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.ok) {
                    this.set({ ok: true })
                    swal("Buen trabajo", "Reporte creado correctamente", "success");
                    this.props.history.push("/trainings-player")
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
                        transform: "translateX(-50%)",
                        position: "absolute",
                    }}>
                    <h1 style={{
                        marginTop: '100px',
                        marginLeft: '220px',
                        fontWeight: 'bolder',
                        fontSize: '40px',
                        color

                    }}>Rellena tu reporte</h1>

                    <h4 style={{ color, marginRight: '30px', marginLeft: '30px' }}>Contesten las preguntas a continuación,
                    este cuestionario nos ayuda a registrar las cargas de entrenamiento y a obtener VUESTRA sensación percibida
                    de esfuerzo lo cual es fundamental
                    en nuestra planificación, además de otra información importante sobre vuestro status y rendimiento.
                    Gracias!!</h4>
                    <div style={{
                        marginTop: 50,
                        marginLeft: "50%",
                        width: 500,
                        transform: "translateX(-50%)",
                        padding: '15px',
                        color
                    }}>
                        <div style={{ marginLeft: "50%", width: 700, transform: "translateX(-50%)", color }}>

                            <form style={{ flexWrap: 'wrap' }}>
                                <label style={{ fontSize: '25px' }}>Calidad del sueño</label>
                                <RadioButtonSleepQuality color={color} />
                                <div style={{ marginTop: '40px', fontSize: '25px' }}>Escala de Esfuerzo Percibido</div>
                                <label>En una escala de 1 a 10 cómo sentiste tu cuerpo de fatigado al final de la sesión</label>
                                <RadioButtonRPE color={color} />
                                <div
                                    style={{
                                        marginTop: '50px',

                                        width: '100%',
                                        height: '33.2vw',

                                    }}>
                                    <img style={{ width: "100%" }} src={imgRPE}></img>
                                </div>

                                <TextField
                                    label="¿Sentiste algún dolor? Di dónde"
                                    rowsMax="4"
                                    inputProps={{ style: { color } }}
                                    InputProps={{
                                        style: { color },
                                    }}
                                    FormHelperTextProps={{ style: { color } }}
                                    InputLabelProps={{ style: { color } }}
                                    style={{ width: '700px', marginTop: '50px', color }}
                                    value={this.state.info}
                                    onChange={this.handleChange('info')}

                                    margin="normal"
                                    helperText="Puntúa de 1 a 10 ¿Algún dolor o molestia durante o al terminar la sesión?"
                                />

                                <div
                                    style={{
                                        marginTop: '30px',
                                        marginBottom: '20px',
                                        width: '100%',
                                        height: '18vw',
                                    }}>
                                    <img style={{ width: "100%" }} src={imgPain}></img>

                                </div>

                                <Button style={{ marginTop: 50, width: '700px' }} onClick={this.handleRegisterTraining} variant="contained" color="secondary">Registrar</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})


