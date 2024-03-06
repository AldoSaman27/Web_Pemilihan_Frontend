// Import Components
import AdminNavBar from "./Components/AdminNavBar";
import SideBar from "./Components/SideBar";

// Import Images
import Loading from "../../Assets/loading.gif";

// 
import axios from "axios";
import Swal from 'sweetalert2';
import { Button, Modal, Form, FloatingLabel, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pemilih = () => {
    const Navigate = useNavigate();
    const [ showTambah, setShowTambah ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ buttonTambahLoading, setButtonTambahLoading ] = useState(false);
    const [ buttonHapusLoading, setButtonHapusLoading ] = useState(false);
    const [ buttonEditLoading, setButtonEditLoading ] = useState(false);
    const [ namaValue, setNamaValue ] = useState("");
    const [ pemilihData, setPemilihData ] = useState([]);
    const [ dataReload, setDataReload ] = useState(false);

    const handleCloseTambah = () => setShowTambah(false);
    const handleShowTambah = () => setShowTambah(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    useEffect(() => {
        if (localStorage.getItem("user.accessToken")) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("user.accessToken")}`;
            axios.defaults.headers.common["Accept"] = "application/json";
            axios.post(`${process.env.REACT_APP_API_URL}/api/v2/auth/statusToken`).then((ress) => {
                if (ress.data.statusToken !== true) return Navigate("/admin/login");
            }).catch((err) => {
                console.error(err);
                return Navigate("/admin/login");
            });
        } else Navigate("/admin/login");
    
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pemilih/index`).then((ress) => {
            setPemilihData(ress.data.pemilih);
        }).catch((err) => console.error(err))

        setDataReload(false);
    }, [ dataReload, Navigate ]);

    const HandleTambah = () => {
        if (namaValue === "" || namaValue.length === 0 || namaValue === null || namaValue === undefined) {
            return Swal.fire({
                title: 'Opss!',
                text: 'Nama is required',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
            });
        }

        setButtonTambahLoading(true);

        const formData = new FormData();
        formData.append("nama", namaValue);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.post(`${process.env.REACT_APP_API_URL}/api/v2/pemilih/store`, formData).then((ress) => {
            setButtonTambahLoading(false);
            setDataReload(true);

            if (ress.data.message !== "Pemilih store success") {
                Swal.fire({
                    title: 'Opss!',
                    text: ress.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
                return 1;
            }

            Swal.fire({
                title: 'Success!',
                text: ress.data.message,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
            });

            setShowTambah(false);
            setNamaValue("");
        }).catch((err) => {
            console.error(err);
            if (err.response.data.message === "Invalid field") {
                setButtonTambahLoading(false);
                Swal.fire({
                    title: 'Opss!',
                    text: err.response.data.errors.nama,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }
        });
    }

    const HandleHapus = (item) => {
        Swal.fire({
            title: '',
            text: `Anda yakin ingin menghapus Pemilih: ${item.nama}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then((ress) => {
            if (ress.isConfirmed) {
                setButtonHapusLoading(true);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("user.accessToken")}`;
                axios.defaults.headers.common['Accept'] = 'application/json';
                axios.delete(`${process.env.REACT_APP_API_URL}/api/v2/pemilih/destroy/${item.id}`).then((ress) => {
                    setButtonHapusLoading(false);
                    setDataReload(true);
                }).catch((err) => console.error(err));
            }
        })
    }

    const HandleEdit = (item) => {
        if (namaValue === "" || namaValue.length === 0 || namaValue === null || namaValue === undefined) {
            return Swal.fire({
                title: 'Opss!',
                text: 'Nama is required',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
            });
        }

        setButtonEditLoading(true);

        const formData = new FormData();
        formData.append("nama", namaValue);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.post(`${process.env.REACT_APP_API_URL}/api/v2/pemilih/update/${item.id}`, formData).then((ress) => {
            setButtonEditLoading(false);
            setDataReload(true);

            if (ress.data.message !== "Pemilih update success") {
                return Swal.fire({
                    title: 'Opss!',
                    text: ress.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }

            Swal.fire({
                title: 'Success!',
                text: ress.data.message,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
            });

            setShowEdit(false);
            setNamaValue("");
        }).catch((err) => {
            console.error(err);
            if (err.response.data.message === "Invalid field") {
                setButtonEditLoading(false);
                Swal.fire({
                    title: 'Opss!',
                    text: err.response.data.errors.nama,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                });
            }
        });
    }

    return (
        <section id="Pemilih" className="Admin d-flex">
            <SideBar Active={3}/>
            <div className="ContainerContent">
                <AdminNavBar/>
                <div className="Content">
                    <div className="d-flex align-items-center justify-content-between pe-5 mb-3">
                        <h3 className="fw-bold text-primary">Pemilih</h3>
                        <Button variant="primary" onClick={handleShowTambah}>Tambah Pemilih</Button>
                    </div>
                    <Table striped border={1}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Voting Code</th>
                                <th style={{ width: 250 }}>Menu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pemilihData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.uniqcode}</td>
                                    <td className="d-flex align-items-center gap-2">
                                        <Button variant="primary" onClick={handleShowEdit}>Edit</Button>
                                        <Button variant="danger" onClick={() => HandleHapus(item)} disabled={buttonHapusLoading} className="d-flex align-items-center justify-content-center gap-2">
                                            {buttonHapusLoading ? (
                                                <img src={Loading} alt="Loading" width={20} height={20} />
                                            ) : null}
                                            Delete
                                        </Button>
                                    </td>
                                    <Modal show={showEdit} onHide={handleCloseEdit}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Pemilih</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <FloatingLabel controlId="floatingNama" label="Nama">
                                                <Form.Control type="text" placeholder="Nama" defaultValue={item.nama} onChange={(e) => setNamaValue(e.target.value)} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingVotingCode" label="VotingCode" className="mt-2">
                                                <Form.Control type="text" placeholder="VotingCode" defaultValue={item.uniqcode} disabled />
                                            </FloatingLabel>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={() => HandleEdit(item)} disabled={buttonEditLoading} className="d-flex align-items-center justify-content-center gap-2">
                                                {buttonEditLoading ? (
                                                    <img src={Loading} alt="Loading" width={20} height={20} />
                                                ) : null}
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Modal show={showTambah} onHide={handleCloseTambah}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Pemilih</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingNama" label="Nama">
                        <Form.Control type="text" placeholder="Nama" onChange={(e) => setNamaValue(e.target.value)} />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={HandleTambah} className="d-flex align-items-center justify-content-center gap-2" disabled={buttonTambahLoading}>
                        {buttonTambahLoading ? (
                            <img src={Loading} alt="Loading" width={20} height={20} />
                        ) : null}
                        Tambah
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default Pemilih;