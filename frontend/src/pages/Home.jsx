import AuthSection from "../components/AuthSection";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <section className="hero">
                <div className="hero-content">
                    <div className="hero-title">
                        <h2>Welcome to</h2>

                        <h1 className="smart-city">
                            Smart City
                        </h1>

                        <h1 className="portal-title">
                            Citizen Services Portal
                        </h1>
                    </div>

                    <p>
                        Access all government services in one place.
                        Easy. Transparent. Efficient.
                    </p>
                </div>
                <section className="services" id="services">

                    <div className="services-strip">

                        <div className="service-item">
                            SERVICES
                        </div>

                        <div className="service-item">
                            Complaints ↗
                        </div>

                        <div className="service-item">
                            Certificates ↗
                        </div>

                        <div className="service-item">
                            Bills ↗
                        </div>

                        <div className="service-item">
                            Emergency ↗
                        </div>

                        <div className="service-item">
                            Tracking ↗
                        </div>

                    </div>
                </section>
            </section>

            <AuthSection />
        </>
    );
}

export default Home;