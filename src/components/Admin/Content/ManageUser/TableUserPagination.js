import ReactPaginate from 'react-paginate'
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';

const TableUserPagination = (props) => {
    const { listUser,pageCount } = props;
    
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUserWithPagination(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${+event.selected + 1}, `);
    };
   

    return (
        <>
            <Table striped="columns" bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <Button className="btn btn-secondary mx-1" onClick={() => props.handleButtonPreviewUser(item)}>View</Button>
                                    <Button className="btn btn-primary mx-1" onClick={() => props.handleButtonUpdateUser(item)}>Update</Button>
                                    <Button className="btn btn-danger mx-1" onClick={() => props.handleButtonDeleteUser(item)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length === 0 && <tr>
                        <td colSpan={'4'}>Not found data</td>
                    </tr>
                    }
                </tbody>
            </Table>
            <div className='TableUserPagination-paginate'>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}    /* Fix bug paginate */
            
            />
            </div>
        </>
    )
}
export default TableUserPagination;