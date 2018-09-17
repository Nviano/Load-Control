import React from 'react';
import { Slave } from 'react-syncing';



export default class RadioCustomButton extends Slave {

    constructor() {
        super()
        this.state = {
            selectedValue: '3'

        };
    }

    handleChange(selectedValue) {
        return event => {
            this.set({
                [selectedValue]: event.target.value
            });
        };
    }

    render() {

        return (
            <div>
                <label>1</label>
                <input
                    type="radio"
                    name="example2"
                    value="1"
                    onChange={this.handleChange} />


                <input
                    type="radio"
                    name="example2"
                    value="2"
                    onChange={this.handleChange} />


                <input
                    type="radio"
                    name="example2"
                    value="3"
                    onChange={this.handleChange} />


                <input
                    type="radio"
                    name="example2"
                    value="4"
                    onChange={this.handleChange} />


                <input
                    type="radio"
                    name="example2"
                    value="5"
                    onChange={this.handleChange} />
                <label>5</label>

            </div>
        );
    }
}

