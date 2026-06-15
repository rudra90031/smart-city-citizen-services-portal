function LodgeComplaint() {
  return (
    <section className="lodge-form-section">

      <h1>Lodge New Complaint</h1>

      <p>
        Report civic issues and help improve your city.
      </p>

      <form className="form-grid">

        <div className="form-group">
          <label>Complaint Title</label>
          <input
            type="text"
            placeholder="Street Light Not Working"
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select>
            <option>Street Light</option>
            <option>Road Damage</option>
            <option>Water Supply</option>
            <option>Garbage Collection</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Location</label>

          <input
            type="text"
            placeholder="Sector 15, Near City Park"
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            placeholder="Describe the issue..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Submit Complaint →
        </button>

      </form>

    </section>
  );
}

export default LodgeComplaint;