import { useState } from "react";
import "./App.css";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  const [uploadMessage, setUploadMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);


  // -------------------------
  // SELECT PDF
  // -------------------------
  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setDocumentId(null);
    setUploadMessage("");
    setAnswer("");
    setQuestion("");
  };


  // -------------------------
  // UPLOAD PDF
  // -------------------------
  const handleUpload = async () => {

    if (!selectedFile) {

      setUploadMessage("Please select a PDF first.");

      return;
    }

    setUploading(true);
    setUploadMessage("");
    setAnswer("");

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      const response = await fetch(
        "https://documentqa-j8ny.onrender.com/api/documents/upload",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setDocumentId(data.documentId);
      setUploadMessage(data.message);

    } catch (error) {

      console.error(error);

      setUploadMessage(
        "Unable to upload PDF. Please try again."
      );

    } finally {

      setUploading(false);
    }
  };


  // -------------------------
  // ASK QUESTION
  // -------------------------
  const handleAskQuestion = async () => {

    if (!documentId) {

      setAnswer("Please upload a PDF first.");

      return;
    }

    if (!question.trim()) {

      setAnswer("Please enter a question.");

      return;
    }

    setAsking(true);
    setAnswer("");

    try {

      const response = await fetch(
        "https://documentqa-j8ny.onrender.com/api/documents/ask",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            documentId: documentId,
            question: question
          })
        }
      );

      if (!response.ok) {
        throw new Error("Question request failed");
      }

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {

      console.error(error);

      setAnswer(
        "Unable to get an answer. Please try again."
      );

    } finally {

      setAsking(false);
    }
  };


  return (

    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            ✦
          </div>

          <span>DocuMind</span>

        </div>

        <div className="nav-label">
          AI PDF Q&A
        </div>

      </header>


      {/* MAIN */}

      <main className="main-container">

        {/* HERO */}

        <section className="hero">

          <div className="badge">
            ✦ AI-powered document assistant
          </div>

          <h1>
            Ask questions about<br />
            <span>your documents.</span>
          </h1>

          <p>
            Upload a PDF and get clear answers
            from its content using AI.
          </p>

        </section>


        {/* UPLOAD CARD */}

        <section className="card">

          <div className="section-header">

            <div>

              <h2>Upload document</h2>

              <p>
                Select a PDF file to get started.
              </p>

            </div>

          </div>


          <div className="upload-area">

            <div className="pdf-icon">
              PDF
            </div>

            <h3>
              {selectedFile
                ? selectedFile.name
                : "Choose a PDF document"}
            </h3>

            <p>
              PDF files only · Upload one document at a time
            </p>

            <label className="choose-button">

              Choose PDF

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                hidden
              />

            </label>

          </div>


          {selectedFile && (

            <div className="selected-file">

              <div className="file-info">

                <div className="small-pdf">
                  PDF
                </div>

                <div>

                  <strong>
                    {selectedFile.name}
                  </strong>

                  <span>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>

                </div>

              </div>

              <button
                className="upload-button"
                onClick={handleUpload}
                disabled={uploading}
              >

                {uploading
                  ? "Uploading..."
                  : "Upload"}

              </button>

            </div>

          )}


          {uploadMessage && (

            <div
              className={
                documentId
                  ? "success-message"
                  : "error-message"
              }
            >

              {documentId ? "✓" : "!"}

              <span>
                {uploadMessage}
              </span>

            </div>

          )}

        </section>


        {/* QUESTION CARD */}

        <section
          className={`card question-card ${
            !documentId ? "disabled-card" : ""
          }`}
        >

          <div className="section-header">

            <div>

              <h2>Ask a question</h2>

              <p>
                Ask anything related to your uploaded document.
              </p>

            </div>

            {documentId && (

              <div className="ready-badge">
                ● Ready
              </div>

            )}

          </div>


          <div className="question-box">

            <textarea
              placeholder={
                documentId
                  ? "What would you like to know?"
                  : "Upload a PDF to start asking questions..."
              }
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              disabled={!documentId}
              onKeyDown={(event) => {

                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {

                  event.preventDefault();

                  if (documentId && !asking) {
                    handleAskQuestion();
                  }

                }

              }}
            />

            <button
              className="ask-button"
              onClick={handleAskQuestion}
              disabled={
                !documentId ||
                asking ||
                !question.trim()
              }
            >

              {asking
                ? "Thinking..."
                : "Ask"}

              {!asking && " →"}

            </button>

          </div>

          <div className="question-hint">
            Press Enter to ask · Shift + Enter for a new line
          </div>

        </section>


        {/* ANSWER */}

        {answer && (

          <section className="answer-card">

            <div className="answer-header">

              <div className="ai-avatar">
                ✦
              </div>

              <div>

                <h2>AI Answer</h2>

                <span>
                  Based on your uploaded document
                </span>

              </div>

            </div>


            <div className="answer-content">
              {answer}
            </div>

          </section>

        )}

      </main>


      {/* FOOTER */}

      <footer>

        <span>
          DocuMind
        </span>

        <span>
          AI-powered PDF question answering
        </span>

      </footer>

    </div>
  );
}

export default App;