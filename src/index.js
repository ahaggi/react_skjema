import React, { Component } from 'react';
import ReactDOM from 'react-dom';



export default class ConfirmationPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            value:""
        }

    }
    handleChange = (e) => {
        console.log('************')
        let value = e.target.value  
        this.setState({value:value});
    }
    
    // componentDidUpdate(prevProps , prevState){
    //     console.log(prevProps.value + ' ****** ' + this.props.value)
    //     if(prevProps.value !== this.props.value){
    //         this.setState({
    //             isValid: true
    //         });
    //     }
    // }

    render() {
        return (
            <div className="DateField">
                <p> {this.state.value} </p>
                <input type={"text"} value={this.state.value} onChange={this.handleChange}  />
                
            </div>
        );
    }
}
ReactDOM.render(<ConfirmationPage />, document.getElementById('root'));