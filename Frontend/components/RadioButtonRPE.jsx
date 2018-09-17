import React from 'react';
import { Slave } from 'react-syncing';
import Radio from '@material-ui/core/Radio';




class RadioButtonRPE extends Slave {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            RPE: '5'

        };
    }


    handleChange(event) {
        this.set({
            RPE: event.target.value
        });
    }

    render() {


        return (
            <div style={{ marginTop: '20px' }}>
                <label>Reposo</label>
                <Radio
                    checked={this.state.RPE === '1'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="1"
                    name="radio-button-demo"
                    aria-label=""
                />
                <Radio
                    checked={this.state.RPE === '2'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="2"
                    name="radio-button-demo"
                    aria-label="2"
                />
                <Radio
                    checked={this.state.RPE === '3'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="3"
                    name="radio-button-demo"
                    aria-label="3"

                />
                <Radio
                    checked={this.state.RPE === '4'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="4"
                    color="default"
                    name="radio-button-demo"
                    aria-label="4"
                />
                <Radio
                    checked={this.state.RPE === '5'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="5"
                    color="default"
                    name="radio-button-demo"
                    aria-label="5"
                />
                <Radio
                    checked={this.state.RPE === '6'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="6"
                    name="radio-button-demo"
                    aria-label="6"
                />
                <Radio
                    checked={this.state.RPE === '7'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="7"
                    name="radio-button-demo"
                    aria-label="7"
                />
                <Radio
                    checked={this.state.RPE === '8'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="8"
                    name="radio-button-demo"
                    aria-label="8"

                />
                <Radio
                    checked={this.state.RPE === '9'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="9"
                    color="default"
                    name="radio-button-demo"
                    aria-label="9"
                />
                <Radio
                    checked={this.state.RPE === '10'}
                    onChange={this.handleChange}
                    style={{ color: this.props.color }}
                    value="10"
                    color="default"
                    name="radio-button-demo"
                    aria-label="10"
                />

                <label>Extremo</label>
            </div>
        );
    }
}



export default RadioButtonRPE;