// Import Styles
import "../../Styles/Admin/AdminHome.css";

// Import Components
import AdminNavBar from "./Components/AdminNavBar";
import SideBar from "./Components/SideBar";

// 
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Person, PersonVcard, Inboxes } from 'react-bootstrap-icons';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const AdminHome = () => {
    const Navigate = useNavigate();
    const [ kandidatData, setKandidatData ] = useState([]);
    const [ pemilihData, setPemilihData ] = useState([]);
    const [ votingData, setVotingData ] = useState([]);

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
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.get(`${process.env.REACT_APP_API_URL}/api/v2/kandidat/index`).then((ress) => {
            setKandidatData(ress.data.kandidat);
        }).catch((err) => console.error(err));
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pemilih/index`).then((ress) => {
            setPemilihData(ress.data.pemilih);
        }).catch((err) => console.error(err));
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("user.accessToken")}`;
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.get(`${process.env.REACT_APP_API_URL}/api/v2/voting/index`).then((ress) => {
            setVotingData(ress.data.voting);
        }).catch((err) => console.error(err));
    }, [Navigate]);

    const KandidatDataChart = Array.from({ length: kandidatData.length }, (_, index) => `Paslon ${index + 1}`);
    const data = {
        labels: KandidatDataChart,
        datasets: [
            {
                label: 'Paslon',
                data: kandidatData.map((kandidat, index) => {
                    return votingData.filter(voting => voting.kandidats_id === index + 1).length;
                }),
                backgroundColor: ["#192655", "#3876BF", "#E1AA74", "#F3F0CA", "#F99417", "#4D4C7D"],
            }
        ]
    }    
    const options = {
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: false,
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    return (
        <section id="AdminHome" className="Admin d-flex">
            <SideBar Active={1}/>
            <div className="ContainerContent">
                <AdminNavBar/>
                <div className="Content">
                    <h3 className="fw-bold text-primary">Dasboard</h3>
                    <div className="d-flex gap-5">
                        <div className="boxData">
                            <div className="Icons bg-primary d-flex align-items-center justify-content-center">
                                <Person size={40} color="white"/>
                            </div>
                            <div className="Body">
                                <h6 className="p-0 m-0">Pasangan Calon</h6>
                                <h4 className="p-0 m-0 fw-bold">{kandidatData.length}</h4>
                            </div>
                        </div>
                        <div className="boxData">
                            <div className="Icons bg-danger d-flex align-items-center justify-content-center">
                                <PersonVcard size={40} color="white"/>
                            </div>
                            <div className="Body">
                                <h6 className="p-0 m-0">Pemilih</h6>
                                <h4 className="p-0 m-0 fw-bold">{pemilihData.length}</h4>
                            </div>
                        </div>
                        <div className="boxData">
                            <div className="Icons bg-warning d-flex align-items-center justify-content-center">
                                <Inboxes size={40} color="white"/>
                            </div>
                            <div className="Body">
                                <h6 className="p-0 m-0">Voting</h6>
                                <h4 className="p-0 m-0 fw-bold">{votingData.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="boxDoughnut">
                        <h3 className="fw-bold text-primary">Statistics</h3>
                        <Pie data={data} options={options}></Pie>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminHome;