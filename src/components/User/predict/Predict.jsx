import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/predict_styles.css"; 

function Predict() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://web-production-89eae.up.railway.app/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while processing the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackClick = () => {
    navigate("/user/home", { state: { scrollToFeedback: true } });
  };

  return (
    <div className="predict-container">
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <button
          className="btn btn-dark"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => navigate(-1)} 
        >
          <i className="bi bi-arrow-left" style={{ marginRight: "5px" }}></i>
          Back
        </button>
      </div>
      <header className="predict-header">
        <h1>Upload and Predict Your Hand!</h1>
        <p>The more accurate the photo you upload, the higher the percentage will be.</p>
      </header>

      <div className="predict-form-container">
        <form onSubmit={handleSubmit}>
          <div className="predict-form-group">
            <label className="file-label">
              Choose file or Drag and Drop Here
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button className="button-predict" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Upload and Predict now!"}
          </button>
        </form>
      </div>

      {prediction && (
        <div className="predict-result-container">
          <h3>Result</h3>
          <div className="predict-result-section">
            <div className="result-predict">
              <h5>Result Predict</h5>
              <p>{prediction.predicted_sign}</p>
            </div>
            <div className="result-accuracy">
              <h5>Accuracy</h5>
              <p>{(prediction.accuracy * 100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="feedback-section">
             <a
                className="feedback-text-link"
                onClick={handleFeedbackClick}
              >
               Give Feedback
                </a>
            </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
