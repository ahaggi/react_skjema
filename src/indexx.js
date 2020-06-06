import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class SelectInput extends Component {
    constructor(props) {
            super(props);
    
            this.state = {
                isValid: this.validate(props.value)
            }
        }
    
        validate(value) {
            if (value === undefined) {
                return true;
            }
            
            let validity = (this.props.validator === undefined || this.props.validator(value)) && !(this.props.required && value.length === 0);
            
            this.props.onValidStateChange(validity);
            return validity;
        }
    
        render() {
            const options = props.optios.map((option, index) => (
                <> <option 
                    key={index}
                    value={option.value}
                    checked={option.checked}/> {option.value} </>)
            );
            return (
                <div className="SelectInput">
                    <p>
                        <label htmlFor={this.props.id}>
                            {this.props.label}
                            {this.props.required && (<span>*</span>)}
                        </label>
                    </p>
                    <select
                        className={this.state.isValid ? '' : 'invalid'}
                        id={this.props.id}
                        type={this.props.type}
                        value={this.props.value}
                        onChange={(event) => {
                            let value = event.target.value;
    
                            if (this.validate(value)) {
                                this.setState({
                                    isValid: true
                                });
                            }
    
                            this.props.onChange(value);
                        }}
                        onBlur={(event) => {
                            this.setState({
                                isValid: this.validate(event.target.value)
                            });
                        }}
                    > {options} </select>

                    {!this.state.isValid &&
                        <p className="errorMessage">{'Feil i skogen.'}</p>
                    }
                </div>
            )
        }
    }

//Radio eller checkbox
function MinInputMultiChoice(props) {
    const items = props._values.map((v, index) => (
        <span> <input type={v.type}
            key={index}
            name={v.name}
            value={v.value}
            checked={v.checked}
            onChange={() => props.setOnChange_Clbk(index)}/> {v.name} </span>)
    );
    return (
        <React.Fragment>{items}</React.Fragment>);
}

class Skjema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values:[
                { "value":"option1", "checked":true},
                { "value":"option2", "checked":true},
                { "value":"option3", "checked":true},
                { "value":"option4", "checked":true}
            ]
        }
        this.handleChange = (index) => {

            let _values = this.state.values.slice()
            _values[index]["checked"]= !this.state.values[index]["checked"] 

            this.setState({ values: _values })

        }

    }


    render() {
        return (
            <div>
                <legned>
                    {/* val {this.renderTxInput("text", "text1", ["val1"])}
                    <p>val2 {this.state.data["name"]}</p>
                    <br /> */}
                    <MinInputMultiChoice _values={this.state.values}  setOnChange_Clbk={this.handleChange.bind(this)} />
                    <p>{JSON.stringify(this.state.values)}</p>
                </legned>
            </div>
        );
    }
}
ReactDOM.render(<Skjema />, document.getElementById('root'));