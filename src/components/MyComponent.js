import React from "react";

class MyComponent extends React.Component {
    //JSX
    state = {
        name: 'Cuong',
        address: '73QB',
        age : 19,
    };
    render(){
        return(
            <div>
                My first component
                <br></br>
                My name is {this.state.name} and I'am from {this.state.address}
                <br></br>
                {
                    Math.random() 
                }
            </div>
        )
    }
}
export default MyComponent;