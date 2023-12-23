import React, { useState } from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//     //JSX

//     state = {
//         listUsers: [

//         ]
//     }

//     addNewUsers = (newUser) => {
//         this.setState({
//             listUsers: [newUser, ...this.state.listUsers],
//         });
//         console.log(newUser)
//     }

//     render() {
//         return (
//             <div>
//                 <UserInfor addUsers={this.addNewUsers} />
//                 <DisplayInfor users={this.state.listUsers} />
//             </div>
//         )
//     }
// }


const MyComponent = (props) => {
    //JSX
  
    const[listUser,setListUser] = useState([])

    const addNewUsers = (newUser) => {
        setListUser([newUser,...listUser]);
        console.log(newUser)
    }
    const removeUsers = (id) => {
        let listUserClone = [...listUser];
        listUserClone = listUserClone.filter(item => 
            item.id !== id);
        setListUser(listUserClone);
    };


        return (
            <>
                <UserInfor addUsers={addNewUsers} />
                <DisplayInfor users={listUser}
                    removeUser={removeUsers} />
            </>
        );
    };

export default MyComponent;