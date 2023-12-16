import React from "react";
class UserInfor extends React.Component{
    state = {
        id:'',
        name: '',
        age : '',
    };
    onClickFunction(event){
        alert('Onclick')
        // console.log(event);
        this.setState({
           name : 'Chovy',
           age : Math.floor((Math.random()* 100) + 1),

        });
    }

    changeNameFromInputName(event) {
        // console.log(event.target.value);
        this.setState({
            name:event.target.value,
        });
    }

    changeAgeFromInputAge(event){
        this.setState({
            age: event.target.value,
        });
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state);
        this.props.addUsers({
            id:Math.floor((Math.random()*100)+1),
            name:this.state.name,
            age:this.state.age,
        });
    }
    
    render(){
        return(
            <div>
                My first component<br></br>
                My name is {this.state.name} and I'am {this.state.age} from {this.state.address}<br></br>              
                <button onClick={(event) =>{this.onClickFunction(event)}}>Click here !</button>
              
              <form onSubmit={(event)=>{this.handleOnSubmit(event)}}>
                <label>Your name</label>
                <input type="text" 
                //    value={this.state.name} 
                   onChange={(event) => {this.changeNameFromInputName(event)}}>
                </input>

                <label>Your age</label>
                <input type="text" maxLength={2}
                //    value={this.state.age} 
                   onChange={(event) => {this.changeAgeFromInputAge(event)}} >
                </input>
                
                <button>Submit</button>
              </form>
            </div>
        );
    }
} 

export default UserInfor;