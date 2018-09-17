import React from 'react';
import { Slave } from 'react-syncing';


import image from '../images/home.jpg';

export default class IndexPage extends Slave {
    render() {
        return (
            <div>
                <img style={{ width: "100%" }} src={image}></img>
            </div>
        );
    }
}    