// Import Styles
import "../Styles/Waktu.css";

// 
import { Container } from "react-bootstrap";

const Waktu = () => {
    return (
        <section id="Waktu" className="bg-primary">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold text-center mt-5 mb-3 text-white">MENUJU PEMILIHAN</h1>
                <div className="Waktu d-flex gap-5">
                    <div className="box d-flex flex-column align-items-center justify-content-center">
                        <h1 className="fw-bold text-white">00</h1>
                        <p className="fw-bold text-white">HARI</p>
                    </div>
                    <div className="box d-flex flex-column align-items-center justify-content-center">
                        <h1 className="fw-bold text-white">00</h1>
                        <p className="fw-bold text-white">JAM</p>
                    </div>
                    <div className="box d-flex flex-column align-items-center justify-content-center">
                        <h1 className="fw-bold text-white">00</h1>
                        <p className="fw-bold text-white">MENIT</p>
                    </div>
                    <div className="box d-flex flex-column align-items-center justify-content-center">
                        <h1 className="fw-bold text-white">00</h1>
                        <p className="fw-bold text-white">DETIK</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Waktu;