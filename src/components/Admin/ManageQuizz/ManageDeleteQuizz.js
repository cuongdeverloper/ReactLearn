import { DeleteQuestionApi } from "../../../services/ApiServices";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
const ManageDeleteQuizz = (props) =>{ 
    const {show, setShow, dataDelete} = props;
    const handleClose = () => setShow(false);
  
//   console.log(dataDelete)
    const handleDeleteQuiz = async() => {
      const data = await DeleteQuestionApi(dataDelete.id);
      // console.log('check' + resAdd.data);
      /* Add validation off information user */
      if (data && data.EC === 0) {
          toast.success(data.EM);
          handleClose();
          props.fetchListQuizz();
        //   props.setCurrentPage(1);
        //   await props.fetchListUserWithPagination(1);
      }
      if (data && data.EC !== 0) {
          toast.error(data.EM);
      }
    // alert('2')
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
          <Modal.Body>Do you want to delete: {dataDelete.name}  </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { handleClose(); handleDeleteQuiz(); }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default ManageDeleteQuizz