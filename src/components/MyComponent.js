import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    //JSX

    state = {
        listUsers: [
            
        ]
    }

    addNewUsers=(newUser) => {
        //    console.log(newUser)
        this.setState({
            listUsers: [... this.state.listUsers, newUser],
        });
    }

    render() {
        return (
            <div>
                <UserInfor addUsers={this.addNewUsers} />
                <DisplayInfor users={this.state.listUsers} />
            </div>
        )
    }
}
export default MyComponent;