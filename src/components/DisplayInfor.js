import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import './DisplayInfor.scss'
class DisplayInfor extends React.Component {

    state = {
        showHideListName: true,
    }

    handleShowHide = () => {
        this.setState({
            showHideListName: !this.state.showHideListName,
        })
    }

    render() {
        const { users } = this.props;
        return (
            <div className="display-infor-container">
                This is my test about PROPS.
                <br /><br />
                <div>
                    <button onClick={()=> this.handleShowHide()} >
                    {this.state.showHideListName ? "hide" : "show"} 
                    </button>
                </div>
                {
                    this.state.showHideListName &&
                    (<div>
                        {users.map((data) => {
                            return (
                                <div key={data.id} className={Number(data.age) > 20 ? "fontBig" : "fontSmall"} >
                                    My name is {data.name} and I'am {data.age}
                                </div>
                            );
                        })}
                    </div> )
                }
            </div>
        )
    }
}
export default DisplayInfor;