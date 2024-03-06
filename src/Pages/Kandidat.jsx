// Import Styles
import "../Styles/Kandidat.css";

// 
import axios from 'axios';
import { Button, Container, Card, ListGroup, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Kandidat = () => {
    const [ kandidatData, setKandidatData ] = useState([]);
    const [ show, setShow ] = useState([]);

    useEffect(() => {
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.get(`${process.env.REACT_APP_API_URL}/api/v2/kandidat/index`).then((ress) => {
            setKandidatData(ress.data.kandidat);
        }).catch((err) => console.error(err));

        const updatedShow = Array.from({ length: 10 }, (_, index) => ({
            [index]: false
        })).reduce((acc, obj) => ({ ...acc, ...obj }), {});
        
        setShow(updatedShow);
    }, []);

    const handleClose = (index) => {
        setShow((prevShow) => ({
            ...prevShow,
            [index]: false
        }));
    };

    const handleShow = (index) => {
        setShow((prevShow) => ({
            ...prevShow,
            [index]: true
        }));
    };

    return (
        <section id="Kandidat">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold text-center mt-5 mb-3 text-primary">PASANGAN CALON</h1>
                <div className="row">
                    {kandidatData.map((item, index) => (
                        <div key={index} className="col m-4 d-flex align-items-center justify-content-center">
                            <Card style={{ width: '18rem' }} className="mb-3">
                                <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}/uploads/gambar/${item.gambar}`} height="200" />
                                <Card.Body>
                                    <Card.Title className="m-0 p-0">Paslon {index+1}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{item.ketua}</ListGroup.Item>
                                    <ListGroup.Item>{item.wakil}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body className="d-flex align-item-center justify-content-center">
                                    <Button variant="primary" onClick={() => handleShow(index+1)}>Detail</Button>
                                </Card.Body>
                            </Card>
                            {/* Modal */}
                            <Modal show={show[index+1]} onHide={() => handleClose(index+1)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Paslon {index+1}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <video src={`${process.env.REACT_APP_API_URL}/uploads/video/${item.video}`} width="100%" className="mb-2" autoPlay loop></video>
                                    <h5>{item.ketua} & {item.wakil}</h5>
                                    <h6>Motto</h6>
                                    <p>{item.motto}</p>
                                    <h6>Visi & Misi</h6>
                                    <p>{item.visi_misi}</p>
                                </Modal.Body>
                            </Modal>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Kandidat;