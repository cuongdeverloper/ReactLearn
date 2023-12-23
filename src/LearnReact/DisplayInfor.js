import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import './DisplayInfor.scss';
import logoReact from '../logo.svg';

// class DisplayInfor extends React.Component {

//     constructor(propss) {
//         super(propss);
//         this.state = {
//             showHideListName: true,
//         }
//     }

//     handleShowHide = () => {
//         this.setState({
//             showHideListName: !this.state.showHideListName,
//         })
//     }

//     render() {
//         const { users } = this.props;
//         return (
//             <div className="display-infor-container">
//                 This is my test about PROPS.
//                 <img className="logoReact" src={logoReact} />
//                 <br /><br />
//                 <>
//                     <button onClick={() => this.handleShowHide()} >
//                         {this.state.showHideListName ? "hide" : "show"}
//                     </button>
//                 </>
//                 {
//                     this.state.showHideListName &&
//                     (<>
//                         {users.map((data) => {
//                             return (
//                                 <div key={data.id} className={Number(data.age) > 20 ? "fontBig" : "fontSmall"} >
//                                     My name is {data.name} and I'am {data.age}
//                                     <button onClick={() => this.props.removeUser(data.id)}>X</button>
//                                 </div>
//                             );
//                         })}
//                     </>)
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { users } = props;

    const [isShowHideListUser, setShowHideListUser] = useState(true);
    const [car, setCar] = useState({

    });

    const handleShowHide = () => {
        setShowHideListUser(!isShowHideListUser);
    }


    const [count, setCount] = useState(0);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCount((count) => count + 1);
    //       }, 1000);
    // });

    const [value, setValue] = useState(0);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation(() => value * 2)
    }, [value]);


    return (
        <div className="display-infor-container">
            This is my test about PROPS.
            <>
                <p>Number: {value}</p>
                <button onClick={() => setValue(v => v + 1)}>Click
                </button>
                <p>calculation: {calculation}</p>
            </>
            {/* <><h1>Some examples of useEffect: {count}</h1></> */}
            <img className="logoReact" src={logoReact} />
            <br /><br />
            <>
                <button onClick={() => handleShowHide()} >
                    {isShowHideListUser ? "Hide users" : "Show users"}
                </button>
            </>
            {
                isShowHideListUser &&
                (<>
                    {users.map((data) => {
                        return (
                            <div key={data.id} className={Number(data.age) > 20 ? "fontBig" : "fontSmall"} >
                                My name is {data.name} and I'am {data.age}
                                <button onClick={() => props.removeUser(data.id)}>X</button>
                            </div>
                        );
                    })}
                </>)
            }
        </div>
    )

}


export default DisplayInfor;