import { FaShieldAlt, FaMapMarkedAlt, FaClipboardList, FaBolt } from "react-icons/fa";

function About() {
  return (
    <section className="about-page">

      <div className="about-hero">

        <p>ABOUT THE PLATFORM</p>

        <h1>
          Smart City <br />
          Citizen Services Portal
        </h1>

        <span>
          A unified digital platform designed to connect citizens with
          government services through transparency, efficiency and
          technology.
        </span>

      </div>

      <div className="about-content">

        <div className="about-block">

          <small>WHO WE ARE</small>

          <h2>Building Smarter Cities Through Digital Governance</h2>

          <p>
            Smart City Citizen Services Portal is a centralized platform
            that enables citizens to access essential municipal services
            from one place. Citizens can register complaints, track issue
            progress, request public services and communicate directly with
            authorities without visiting multiple government offices.
          </p>

        </div>

        <div className="about-grid">

          <div className="feature-card">
            <FaClipboardList size={32}/>
            <h3>Complaint Management</h3>
            <p>
              Register civic issues online and monitor every stage of
              resolution.
            </p>
          </div>

          <div className="feature-card">
            <FaMapMarkedAlt size={32}/>
            <h3>GIS Location Mapping</h3>
            <p>
              Pinpoint complaint locations accurately using interactive
              maps.
            </p>
          </div>

          <div className="feature-card">
            <FaShieldAlt size={32}/>
            <h3>Secure Platform</h3>
            <p>
              Protected authentication and secure access for citizens and
              administrators.
            </p>
          </div>

          <div className="feature-card">
            <FaBolt size={32}/>
            <h3>Fast Resolution</h3>
            <p>
              Streamlined workflow helps departments resolve issues
              efficiently.
            </p>
          </div>

        </div>

        <div className="mission-wrapper">

          <div>

            <small>MISSION</small>

            <h3>
              Deliver transparent, accessible and technology-driven public
              services for every citizen.
            </h3>

          </div>

          <div>

            <small>VISION</small>

            <h3>
              Create a connected smart city where every public issue is
              reported, monitored and resolved digitally.
            </h3>

          </div>

        </div>

        <div className="workflow">

          <small>HOW IT WORKS</small>

          <div className="steps">

            <div>
              <h2>01</h2>
              <p>Register/Login</p>
            </div>

            <div>
              <h2>02</h2>
              <p>Submit Complaint</p>
            </div>

            <div>
              <h2>03</h2>
              <p>Track Progress</p>
            </div>

            <div>
              <h2>04</h2>
              <p>Issue Resolved</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;