// Import Styles
import '../Styles/Home.css';

// Import Components
import NavigationBar from "../Components/NavigationBar";

// Import Pages
import Kandidat from './Kandidat';
import Waktu from './Waktu';

const Home = () => {
    return (
        <>
            <NavigationBar/>
            <section id="Home">
                <div className="home-background"></div>
                <div className="home-content">
                    <h1>PEMILIHAN</h1>
                    <h1>KETUA & WAKIL KETUA OSIS</h1>
                    <h2>SMKN 3 GORONTALO</h2>
                </div>
            </section>
            <Kandidat/>
            <Waktu/>
        </>
    )
}

export default Home;