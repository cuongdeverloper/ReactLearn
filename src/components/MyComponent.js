import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    //JSX

    state = {
        listUsers: [

        ]
    }

    addNewUsers = (newUser) => {
        this.setState({
            listUsers: [newUser, ...this.state.listUsers],
        });
        console.log(newUser)
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