import { useEffect, useState } from "react";
import { GetAllQuestionApi } from "../../../services/ApiServices";
import { Button, Table } from "react-bootstrap";
const TableListQuizz = (props) => {
    const{listQuizz} = props
    
    return(
        <>
            
           <Table striped="columns" bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Difficulty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizz && listQuizz.length > 0 && listQuizz.map((item, index) => {
                        return (
                            <tr key={`table-quizz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <Button className="btn btn-primary mx-1" onClick={() => props.handleButtonModalUpdateUser(item)}>Update</Button>
                                    <Button className="btn btn-danger mx-1" onClick={()=> props.handleButtonModalDeleteUser(item)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                    {listQuizz && listQuizz.length === 0 && <tr>
                        <td colSpan={'4'}>Not found data</td>
                    </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}
export default TableListQuizz