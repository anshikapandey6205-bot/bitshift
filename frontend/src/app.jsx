import React, { useState } from "react";

import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import DocumentUpload from "./components/DocumentUpload";
import RiskCard from "./components/RiskCard";
import DetectionList from "./components/DetectionList";
import BeforeAfter from "./components/BeforeAfter";
import PrivacyPolicies from "./components/PrivacyPolicies";

import { scanText } from "./utils/scanner";

function App() {
    const [prompt, setPrompt] = useState("");

    const [scanResult, setScanResult] = useState({
        riskScore: 0,
        detections: [],
        protectedText: "",
        status: "Waiting for scan",
    });

    const [policies, setPolicies] = useState({
        redactEmail: true,
        redactPhone: true,
        redactFinancial: true,
        redactCredentials: true,
        redactPersonal: true,
    });

    const [isScanning, setIsScanning] = useState(false);

    function handleScan() {
        if (!prompt.trim()) {
            setScanResult({
                riskScore: 0,
                detections: [],
                protectedText: "",
                status: "Enter a prompt first",
            });

            return;
        }

        setIsScanning(true);

        setTimeout(() => {
            const result = scanText(prompt, policies);

            setScanResult(result);
            setIsScanning(false);
        }, 500);
    }

    function handleClear() {
        setPrompt("");

        setScanResult({
            riskScore: 0,
            detections: [],
            protectedText: "",
            status: "Waiting for scan",
        });
    }

    function handleDocumentText(text, fileName) {
        setPrompt(text);

        setScanResult({
            riskScore: 0,
            detections: [],
            protectedText: "",
            status: `${fileName} loaded — ready to scan`,
        });
    }

    return (
        <div className="app">

            <Header />

            <main className="main-container">

                {/* HERO */}
                <section className="hero-section">

                    <div className="section-label">
                        AI PRIVACY FIREWALL
                    </div>

                    <h1>
                        Protect sensitive data
                        <br />
                        before it reaches AI.
                    </h1>

                    <p>
                        PRIVASHIELD scans prompts and documents
                        for sensitive information before they
                        are processed by an AI model.
                    </p>

                </section>


                {/* PROMPT SCANNER */}
                <PromptInput
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onScan={handleScan}
                    onClear={handleClear}
                    isScanning={isScanning}
                />


                {/* DOCUMENT UPLOAD */}
                <DocumentUpload
                    onTextExtracted={handleDocumentText}
                />


                {/* RISK + DETECTIONS */}
                <div className="dashboard-grid">

                    <RiskCard
                        riskScore={scanResult.riskScore}
                        status={scanResult.status}
                    />

                    <DetectionList
                        detections={scanResult.detections}
                    />

                </div>


                {/* BEFORE / AFTER */}
                <BeforeAfter
                    originalText={prompt}
                    protectedText={scanResult.protectedText}
                />


                {/* PRIVACY POLICIES */}
                <PrivacyPolicies
                    policies={policies}
                    setPolicies={setPolicies}
                />


                {/* SAFE MESSAGE */}
                <section className="safe-message">

                    <div className="safe-message-icon">
                        ✓
                    </div>

                    <div>

                        <strong>
                            Your privacy comes first.
                        </strong>

                        <p>
                            PRIVASHIELD analyzes content before
                            sensitive information can reach an
                            AI model.
                        </p>

                    </div>

                </section>

            </main>


            <footer className="app-footer">

                <strong>
                    PRIVASHIELD
                </strong>

                <span>
                    AI Privacy Firewall
                </span>

            </footer>

        </div>
    );
}

export default App;