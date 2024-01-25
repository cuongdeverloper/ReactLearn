import { Button, Table } from "react-bootstrap";
const TableUsers = (props) => {
  const { listUser } = props;
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
                <td><Button>View</Button></td>
              </tr>


            )
          })}
          {listUser && listUser.length === 0 && <tr>
            <td colSpan={'4'}>Not found data</td>
          </tr>

          }
        </tbody>
      </Table>
    </>
  )
}
export default TableUsers;