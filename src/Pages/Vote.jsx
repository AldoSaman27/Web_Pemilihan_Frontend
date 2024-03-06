// Import Styles
import "../Styles/Vote.css";

// Import Components
// import NavigationBar from "../Components/NavigationBar";

// Import Images
import Loading from "../Assets/loading.gif";

//
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Container,
  Card,
  ListGroup,
  Modal,
  Form,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";

const Vote = () => {
  const [kandidatData, setKandidatData] = useState([]);
  const [kandidatNomor, setKandidatNomor] = useState("");
  const [pilihKandidatId, setPilihKandidatId] = useState("");
  const [votingCode, setVotingCode] = useState("");
  const [show, setShow] = useState(false);
  const [alertIsHide, setAlertIsHide] = useState(true);
  const [alertValue, setAlertValue] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const HandlePilih = (nomor, id) => {
    setKandidatNomor(nomor);
    setPilihKandidatId(id);
    setShow(true);
    return 1;
  };

  const HandleSubmit = () => {
    if (
      votingCode === "" ||
      votingCode === 0 ||
      votingCode === undefined ||
      votingCode === null
    ) {
      setAlertValue("Voting code is required!");
      setAlertIsHide(false);
      return 1;
    }

    setAlertIsHide(true);
    setButtonLoading(true);

    const formData = new FormData();
    formData.append("voting_code", votingCode);
    formData.append("kandidats_id", pilihKandidatId);
    axios.defaults.headers.common["Accept"] = `application/json`;
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v2/voting/store`, formData)
      .then((ress) => {
        setButtonLoading(false);
        setAlertValue("");
        setVotingCode("");

        if (ress.data.message !== "Voting store success") {
          setAlertValue(ress.data.message);
          setAlertIsHide(false);
          return 1;
        }

        setShow(false);

        Swal.fire({
          title: "Success!",
          text: "Terima kasih telah menggunakan hak pilih anda!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      })
      .catch((err) => console.error(err));
    return 1;
  };

  const HandleVotingCodeChange = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === 0 ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      setAlertValue("Voting code is required!");
      setAlertIsHide(false);
      return 1;
    }

    setVotingCode(e.target.value);
    setAlertIsHide(true);
    return 1;
  };

  useEffect(() => {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v2/kandidat/index`)
      .then((ress) => {
        setKandidatData(ress.data.kandidat);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* <NavigationBar/> */}
      <section id="Vote">
        <Container className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="fw-bold text-center mt-3 text-primary">
            PEMILIHAN KETUA OSIS & WAKIL KETUA OSIS
          </h2>
          <h2 className="fw-bold text-center text-primary">
            SMK NEGERI 3 GORONTALO
          </h2>
          <h2 className="fw-bold text-center mb-3 text-primary">
            PERIODE 2024 - 2025
          </h2>
          <div className="row">
            {kandidatData &&
              kandidatData.map((item, index) => (
                <div
                  key={index}
                  className="col m-4 d-flex align-items-center justify-content-center"
                >
                  <Card style={{ width: "18rem" }} className="mb-3">
                    <Card.Img
                      variant="top"
                      src={`${process.env.REACT_APP_API_URL}/uploads/gambar/${item.gambar}`}
                      height="200"
                    />
                    <Card.Body>
                      <Card.Title className="m-0 p-0">
                        Paslon {index + 1}
                      </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>{item.ketua}</ListGroup.Item>
                      <ListGroup.Item>{item.wakil}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body className="d-flex align-item-center justify-content-center">
                      <Button
                        variant="primary"
                        onClick={() => HandlePilih(index + 1, item.id)}
                      >
                        Pilih
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Pilih Paslon {kandidatNomor}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Alert
                  key="danger"
                  variant="danger"
                  className={alertIsHide ? "d-none" : null}
                >
                  {alertValue}
                </Alert>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Voting Code"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="VSG2CsFJ"
                    onChange={HandleVotingCodeChange}
                  />
                </FloatingLabel>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Batal
                </Button>
                <Button
                  variant="primary"
                  className="d-flex align-items-center justify-content-center gap-2"
                  onClick={HandleSubmit}
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <img src={Loading} alt="Loading" width={20} height={20} />
                  ) : null}
                  Pilih
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Vote;
