import React, { useState } from "react";


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