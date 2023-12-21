import React, { useState } from "react";

// class UserInfor extends React.Component {
//     state = {
//         id: null,
//         name: '',
//         age: '',
//     };
//     onClickFunction(event) {
//         alert('Onclick')
//         // console.log(event);
//         this.setState({
//             name: 'Chovy',
//             age: Math.floor((Math.random() * 100) + 1),

//         });
//     }

//     changeNameFromInputName(event) {
//         // console.log(event.target.value);
//         this.setState({
//             name: event.target.value,
//         });
//     }

//     changeAgeFromInputAge(event) {
//         this.setState({
//             age: event.target.value,
//         });
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         // console.log(this.state);
//         this.props.addUsers({
//             // id:Math.floor((Math.random()*100)+1),
//             id: this.state.id++,
//             name: this.state.name,
//             age: this.state.age,
//         });
//     }

//     render() {
//         return (
//             <div>
//                 My first component<br></br>
//                 My name is {this.state.name} and I'am {this.state.age}<br></br>
//                 <button onClick={(event) => { this.onClickFunction(event) }}>Click here !</button>

//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <label>Your name</label>
//                     <input type="text"
//                         //    value={this.state.name} 
//                         onChange={(event) => { this.changeNameFromInputName(event) }}>
//                     </input>

//                     <label>Your age</label>
//                     <input type="text" maxLength={2}
//                         //    value={this.state.age} 
//                         onChange={(event) => { this.changeAgeFromInputAge(event) }} >
//                     </input>

//                     <button>Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }


const  UserInfor = (props) => {

    const{addUsers} = props;

    const[name,setName] = useState('');
    const[age,setAge] = useState('');
    const[id,setId] = useState(1);
    const changeNameFromInputName = (event) => {
        // console.log(event.target.value);
        setName(event.target.value);
    }

    const changeAgeFromInputAge = (event) => {
        setAge(event.target.value);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        addUsers({
            id:Math.floor((Math.random()*10000)+1),
            name: name,
            age: age,
        });
    }

   
        return (
            <>
                My first component<br></br>
                My name is {name} and I'am {age}<br></br>
                <form onSubmit={(event) => {handleOnSubmit(event) }}>
                    <label>Your name</label>
                    <input type="text"
                        //    value={this.state.name} 
                        onChange={(event) => { changeNameFromInputName(event) }}>
                    </input>

                    <label>Your age</label>
                    <input type="text" maxLength={2}
                        //    value={this.state.age} 
                        onChange={(event) => {changeAgeFromInputAge(event) }} >
                    </input>

                    <button>Submit</button>
                </form>
            </>
        );
    }


export default UserInfor;