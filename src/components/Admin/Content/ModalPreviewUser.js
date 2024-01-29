import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPreviewUser = (props) => {

    const { show, setShow, dataPreview } = props;
    const [img, setImg] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataPreview)) {

            setImg(`data:image/jpeg;base64,${dataPreview.image}`);;
        }

    }, [dataPreview]);
    const handleClose = () => {
        setShow(false);

    };




    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={img} alt="User Preview" />
                        <Card.Body>
                            <Card.Title>UserName : {dataPreview.username}</Card.Title>
                            <Card.Text>
                                <label ></label>
                                <label>{dataPreview.role}</label>
                               
                                
                                
                            </Card.Text>
                            
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}



export default ModalPreviewUser

