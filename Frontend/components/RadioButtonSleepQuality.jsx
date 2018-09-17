import React from 'react';
import { Slave } from 'react-syncing';
import Radio from '@material-ui/core/Radio';


export default class RadioButtonSleepQuality extends Slave {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            sleep: '3'

        };
    }

    handleChange(event) {
        this.set({
            sleep: event.target.value
        });
    }

    render() {

        return (
            <div style={{ marginTop: '30px' }}>
                <label>Dormí Fatal</label>
                <Radio
                    checked={this.state.sleep === '1'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="1"
                    name="radio-button-demo"
                    aria-label="A"
                />
                <Radio
                    checked={this.state.sleep === '2'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="2"
                    name="radio-button-demo"
                    aria-label="B"
                />
                <Radio
                    checked={this.state.sleep === '3'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="3"
                    name="radio-button-demo"
                    aria-label="C"

                />
                <Radio
                    checked={this.state.sleep === '4'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="4"
                    color="default"
                    name="radio-button-demo"
                    aria-label="D"
                />
                <Radio
                    checked={this.state.sleep === '5'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="5"
                    color="default"
                    name="radio-button-demo"
                    aria-label="E"
                />
                <label>Excelente</label>
            </div>
        );
    }
}

