import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {DeleteApi} from '../../../../services/ApiServices'
import { toast } from 'react-toastify';
const ModalDeleteUser = (props) => {
  const {show, setShow, dataDelete} = props;

  const handleClose = () => setShow(false);


  const handleDeleteUser = async() => {
    const data = await DeleteApi(dataDelete.id);
    // console.log('check' + resAdd.data);
    /* Add validation off information user */
    if (data && data.EC === 0) {
        toast.success(data.EM);
        handleClose();
        props.setCurrentPage(1);
        await props.fetchListUserWithPagination(1);
    }
    if (data && data.EC !== 0) {
        toast.error(data.EM);
    }
}
 
  return (
    <>  
      <Modal show={show} 
      onHide={handleClose}
      backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete: {dataDelete.email} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose(); handleDeleteUser(); }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDeleteUser

