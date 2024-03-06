// Import Styles
import "../../Styles/Admin/PasanganCalon.css";

// Import Components
import AdminNavBar from "./Components/AdminNavBar";
import SideBar from "./Components/SideBar";

// Import Images
import Loading from "../../Assets/loading.gif";

//
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  ListGroup,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasanganCalon = () => {
  const Navigate = useNavigate();
  const [kandidatData, setKandidatData] = useState([]);
  const [buttonHapusLoading, setButtonHapusLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [show, setShow] = useState(false);
  const [ketuaValue, setKetuaValue] = useState("");
  const [wakilValue, setWakilValue] = useState("");
  const [mottoValue, setMottoValue] = useState("");
  const [visiMisiValue, setVisiMisiValue] = useState("");
  const [gambarFile, setGambarFile] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [buttonTambahLoading, setButtonTambahLoading] = useState(false);
  const [showEdit, setShowEdit] = useState([]);
  const [buttonEditLoading, setButtonEditLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user.accessToken")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("user.accessToken")}`;
      axios.defaults.headers.common["Accept"] = "application/json";
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/v2/auth/statusToken`)
        .then((ress) => {
          if (ress.data.statusToken !== true) return Navigate("/admin/login");
        })
        .catch((err) => {
          console.error(err);
          return Navigate("/admin/login");
        });
    } else Navigate("/admin/login");

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("user.accessToken")}`;
    axios.defaults.headers.common["Accept"] = "application/json";
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v2/kandidat/index`)
      .then((ress) => {
        setKandidatData(ress.data.kandidat);
      })
      .catch((err) => console.error(err));

    const updatedShow = Array.from({ length: 10 }, (_, index) => ({
      [index]: false,
    })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    setShowEdit(updatedShow);
    setIsReload(false);
  }, [isReload, Navigate]);

  const HandleHapus = (id, nomor) => {
    Swal.fire({
      title: "",
      text: `Anda yakin ingin menghapus Paslon ${nomor}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((ress) => {
      if (ress.isConfirmed) {
        setButtonHapusLoading(true);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common["Accept"] = "application/json";
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/v2/kandidat/destroy/${id}`
          )
          .then((ress) => {
            setButtonHapusLoading(false);
            setIsReload(true);
          })
          .catch((err) => console.error(err));
      }
    });
    return 1;
  };

  const HandleTambah = () => {
    if (
      ketuaValue === "" ||
      ketuaValue.length === 0 ||
      ketuaValue === null ||
      ketuaValue === undefined
    ) {
      return Swal.fire({
        title: "Opss!",
        text: "Ketua is required",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (
      wakilValue === "" ||
      wakilValue.length === 0 ||
      wakilValue === null ||
      wakilValue === undefined
    ) {
      return Swal.fire({
        title: "Opss!",
        text: "Wakil is required",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (
      mottoValue === "" ||
      mottoValue.length === 0 ||
      mottoValue === null ||
      mottoValue === undefined
    ) {
      return Swal.fire({
        title: "Opss!",
        text: "Motto is required",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (
      visiMisiValue === "" ||
      visiMisiValue.length === 0 ||
      visiMisiValue === null ||
      visiMisiValue === undefined
    ) {
      return Swal.fire({
        title: "Opss!",
        text: "Visi Misi is required",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (
      gambarFile === "" ||
      gambarFile === 0 ||
      gambarFile === null ||
      gambarFile === undefined
    ) {
      return Swal.fire({
        title: "Opss!",
        text: "Gambar is required",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (!gambarFile.type.includes("image")) {
      return Swal.fire({
        title: "Opss!",
        text: "Gambar: Only image files are allowed",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (
      videoFile === "" ||
      videoFile === 0 ||
      videoFile === null ||
      videoFile === undefined
    ) {
      return Swal.fire({
        title: "Opss!",
        text: "Video is required",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else if (!videoFile.type.includes("video")) {
      return Swal.fire({
        title: "Opss!",
        text: "Video: Only video files are allowed",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }

    setButtonTambahLoading(true);

    console.log(gambarFile);

    const formData = new FormData();
    formData.append("ketua", ketuaValue);
    formData.append("wakil", wakilValue);
    formData.append("motto", mottoValue);
    formData.append("visi_misi", visiMisiValue);
    formData.append("gambar", gambarFile);
    formData.append("video", videoFile);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("user.accessToken")}`;
    axios.defaults.headers.common["Accept"] = "application/json";
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v2/kandidat/store`, formData)
      .then((ress) => {
        setButtonTambahLoading(false);
        setShow(false);
        setIsReload(true);

        if (ress.data.message !== "Kandidat store success") {
          return Swal.fire({
            title: "Opss!",
            text: ress.data.message,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }

        return Swal.fire({
          title: "Success!",
          text: "Berhasil menambah Paslon",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data.message === "Invalid field") {
          setButtonTambahLoading(false);
          Swal.fire({
            title: "Opss!",
            text:
              err.response.data.errors.ketua ||
              err.response.data.errors.wakil ||
              err.response.data.errors.motto ||
              err.response.data.errors.visi_misi ||
              err.response.data.errors.gambar ||
              err.response.data.errors.video,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }
      });
    return 1;
  };

  const HandleEdit = (index, id) => {
    setButtonEditLoading(true);

    const formData = new FormData();
    if (ketuaValue) formData.append("ketua", ketuaValue);
    if (wakilValue) formData.append("wakil", wakilValue);
    if (mottoValue) formData.append("motto", mottoValue);
    if (visiMisiValue) formData.append("visi_misi", visiMisiValue);
    if (gambarFile) formData.append("gambar", gambarFile);
    if (videoFile) formData.append("video", videoFile);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("user.accessToken")}`;
    axios.defaults.headers.common["Accept"] = "application/json";
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v2/kandidat/update/${id}`,
        formData
      )
      .then((ress) => {
        setButtonEditLoading(false);
        setIsReload(true);

        if (ress.data.message !== "Kandidat update success") {
          return Swal.fire({
            title: "Opss!",
            text: ress.data.message,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }

        return Swal.fire({
          title: "Success!",
          text: `Berhasil mengedit Paslon ${index}`,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data.message === "Invalid field") {
          setButtonEditLoading(false);
          Swal.fire({
            title: "Opss!",
            text:
              err.response.data.errors.ketua ||
              err.response.data.errors.wakil ||
              err.response.data.errors.motto ||
              err.response.data.errors.visi_misi ||
              err.response.data.errors.gambar ||
              err.response.data.errors.video,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }
      });
  };

  const TambahPaslonClose = () => {
    setKetuaValue("");
    setWakilValue("");
    setMottoValue("");
    setVisiMisiValue("");
    setGambarFile(null);
    setGambarPreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setShow(false);
  };
  const TambahPaslonShow = () => {
    setKetuaValue("");
    setWakilValue("");
    setMottoValue("");
    setVisiMisiValue("");
    setGambarFile(null);
    setGambarPreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setShow(true);
  };

  const HandleInputChange = (id, value) => {
    switch (id) {
      case 1:
        setKetuaValue(value);
        break;

      case 2:
        setWakilValue(value);
        break;

      case 3:
        setMottoValue(value);
        break;

      case 4:
        setVisiMisiValue(value);
        break;

      case 5:
        setGambarFile(value);
        if (value) {
          const imageUrl = URL.createObjectURL(value);
          setGambarPreview(imageUrl);
        }
        break;

      case 6:
        setVideoFile(value);
        if (value) {
          const videoUrl = URL.createObjectURL(value);
          setVideoPreview(videoUrl);
        }
        break;

      default:
        break;
    }
  };

  const handleCloseEdit = (index) => {
    setKetuaValue("");
    setWakilValue("");
    setMottoValue("");
    setVisiMisiValue("");
    setGambarFile(null);
    setGambarPreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setShowEdit((prevShow) => ({
      ...prevShow,
      [index]: false,
    }));
  };
  const handleShowEdit = (index) => {
    setKetuaValue("");
    setWakilValue("");
    setMottoValue("");
    setVisiMisiValue("");
    setGambarFile(null);
    setGambarPreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setShowEdit((prevShow) => ({
      ...prevShow,
      [index]: true,
    }));
  };

  return (
    <section id="PasanganCalon" className="Admin d-flex">
      <SideBar Active={2} />
      <div className="ContainerContent">
        <AdminNavBar />
        <div className="Content">
          <div className="d-flex align-items-center justify-content-between pe-5 mb-3">
            <h3 className="fw-bold text-primary">Pasangan Calon</h3>
            <Button variant="primary" onClick={TambahPaslonShow}>
              Tambah Paslon
            </Button>
          </div>
          <div className="row">
            {kandidatData.map((item, index) => (
              <div
                key={index}
                className="col d-flex align-items-center justify-content-center"
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
                  <Card.Body className="d-flex align-item-center justify-content-center gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleShowEdit(index + 1)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={() => HandleHapus(item.id, index + 1)}
                      disabled={buttonHapusLoading}
                    >
                      {buttonHapusLoading ? (
                        <img
                          src={Loading}
                          alt="Loading"
                          width={20}
                          height={20}
                        />
                      ) : null}
                      Hapus
                    </Button>
                  </Card.Body>
                </Card>
                {/* Modal */}
                <Modal
                  show={showEdit[index + 1]}
                  onHide={() => handleCloseEdit(index + 1)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Paslon {index + 1}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FloatingLabel
                      controlId="floatingKetua"
                      label="Ketua"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Ketua"
                        defaultValue={item.ketua}
                        onChange={(e) => HandleInputChange(1, e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingWakil"
                      label="Wakil"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Wakil"
                        defaultValue={item.wakil}
                        onChange={(e) => HandleInputChange(2, e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingMotto"
                      label="Motto"
                      className="mb-3"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Motto"
                        defaultValue={item.motto}
                        style={{ height: "100px" }}
                        onChange={(e) => HandleInputChange(3, e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingVisiMisi"
                      label="Visi Misi"
                      className="mb-3"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Visi Misi"
                        defaultValue={item.visi_misi}
                        style={{ height: "100px" }}
                        onChange={(e) => HandleInputChange(4, e.target.value)}
                      />
                    </FloatingLabel>
                    <Form.Group controlId="formGambar" className="mb-3">
                      <Form.Label>Gambar</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          HandleInputChange(5, e.target.files[0])
                        }
                      />
                      <div className="file-container mt-3">
                        <img
                          src={
                            gambarPreview ||
                            `${process.env.REACT_APP_API_URL}/uploads/gambar/${item.gambar}`
                          }
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group controlId="formVideo">
                      <Form.Label>Video</Form.Label>
                      <Form.Control
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          HandleInputChange(6, e.target.files[0])
                        }
                      />
                      <div className="file-container mt-3">
                        <video
                          src={
                            videoPreview ||
                            `${process.env.REACT_APP_API_URL}/uploads/video/${item.video}`
                          }
                          alt=""
                          className="w-100"
                          controls={
                            videoPreview ||
                            `${process.env.REACT_APP_API_URL}/uploads/video/${item.video}`
                          }
                        />
                      </div>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => HandleEdit(index + 1, item.id)}
                      className="d-flex align-items-center justify-content-center gap-2"
                      disabled={buttonEditLoading}
                    >
                      {buttonEditLoading ? (
                        <img
                          src={Loading}
                          alt="Loading"
                          width={20}
                          height={20}
                        />
                      ) : null}
                      Edit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={TambahPaslonClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pasangan Calon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingKetua"
            label="Ketua"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Ketua"
              onChange={(e) => HandleInputChange(1, e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingWakil"
            label="Wakil"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Wakil"
              onChange={(e) => HandleInputChange(2, e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingMotto"
            label="Motto"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Motto"
              style={{ height: "100px" }}
              onChange={(e) => HandleInputChange(3, e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingVisiMisi"
            label="Visi Misi"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Visi Misi"
              style={{ height: "100px" }}
              onChange={(e) => HandleInputChange(4, e.target.value)}
            />
          </FloatingLabel>
          <Form.Group controlId="formGambar" className="mb-3">
            <Form.Label>Gambar</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => HandleInputChange(5, e.target.files[0])}
            />
            <div className="file-container mt-3">
              <img src={gambarPreview} alt="" className="w-100" />
            </div>
          </Form.Group>
          <Form.Group controlId="formVideo">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              accept="video/*"
              onChange={(e) => HandleInputChange(6, e.target.files[0])}
            />
            <div className="file-container mt-3">
              <video
                src={videoPreview}
                alt=""
                className="w-100"
                controls={videoPreview}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={HandleTambah}
            className="d-flex align-items-center justify-content-center gap-2"
            disabled={buttonTambahLoading}
          >
            {buttonTambahLoading ? (
              <img src={Loading} alt="Loading" width={20} height={20} />
            ) : null}
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default PasanganCalon;
