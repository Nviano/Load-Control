import React from 'react';
import { withRouter } from 'react-router-dom';
import { Slave } from 'react-syncing';
import CJS from 'chart.js';


import image from '../images/board2.jpg';



export default withRouter(class Chart extends Slave {
    constructor(props) {
        super(props)
        this.getPlayerClub = this.getPlayerClub.bind(this);

        props.match.params.id;
        this.state = {
            reports: []


        }
    }


    didMount() {
        this.getPlayerClub()
    }

    getPlayerClub() {
        const url = `//${process.env.SERVER}/report-player`;
        fetch(url, {
            method: 'Post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPersona: this.props.match.params.id,
            })
        })
            .then((res) => res.json())
            .then(res => {
                this.set({
                    reports: res.result
                })
                console.log(res.result)
                new CJS("myChart", {
                    type: 'line',
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    min: 0, // minimum value
                                    max: 130 // maximum value
                                }
                            }]
                        }
                    },
                    data: {
                        labels: res.result.map(r => new Date(r.fecha).toLocaleDateString('es-ES')),
                        datasets: [

                            {
                                label: "RPE",

                                fill: true,
                                borderColor: '#F08080',
                                backgroundColor: res.result.map(() => "rgba(255,0,0,0.5)"),
                                data: res.result.map(r => r.RPE)
                            },
                            {
                                label: "Duración",

                                fill: true,
                                borderColor: '#00CED1',
                                backgroundColor: res.result.map(() => "rgba(0,206,209,0.5)"),
                                data: res.result.map(r => r.duracion)
                            }
                        ]
                    },
                });
                // new CJS("myChart2", {
                //     type: 'bar',
                //     options: {
                //         responsive: true,
                //         maintainAspectRatio: false,
                //         scales: {
                //             yAxes: [{
                //                 display: true,
                //                 ticks: {
                //                     min: 0, // minimum value
                //                     max: 10 // maximum value
                //                 }
                //             }]
                //         }
                //     },
                //     data: {
                //         labels: res.result.map(r => new Date(r.fecha).toLocaleDateString('es-ES')),
                //         datasets: [
                //             {
                //                 label: "RPE",
                //                 backgroundColor: res.result.map(() => "rgba(255,0,0,0.5)"),
                //                 data: res.result.map(r => r.RPE)
                //             },
                //             {
                //                 label: "Sleep",
                //                 data: res.result.map(r => r.sleep)
                //             }
                //         ]
                //     },
                // });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div style={{ maxHeight: 500, marginTop: 150 }}>

                <canvas id="myChart" width="400" height="400"></canvas>
                {/* <canvas id="myChart2" width="400" height="400"></canvas> */}
            </div>
        );
    }
})






