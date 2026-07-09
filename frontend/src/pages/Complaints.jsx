import { useNavigate } from "react-router-dom";
function Complaints() {
  const navigate = useNavigate();
  return (
    <>
      <section className="complaints-hero">

        <div className="complaints-content">

          <h1>Complaints</h1>

          <p className="complaints-description">
            Lodge complaints, track their status, and stay updated on resolutions.
          </p>

        </div>

      </section>
      <section className="complaint-actions">

        <div className="complaint-card track-card"
          onClick={() => navigate("/track-complaint")}>
          <span>TRACK</span>
          <h2>Track Complaint</h2>
          <p>Check the live status of your submitted complaints.</p>

          <div className="arrow">→</div>
        </div>

        <div className="complaint-card lodge-card"
          onClick={() => navigate("/lodge-complaint")}>

          <span>CITIZEN SERVICES</span>

          <h2>Lodge New Complaint</h2>

          <p>
            Report civic issues and help improve your city.
          </p>

          <div className="bottom-row">
            <span>Submit Now</span>
            <div className="arrow">→</div>
          </div>
        </div>

      </section>
    </>
  );
}

export default Complaints;