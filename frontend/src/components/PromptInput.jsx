import React from "react";

function PromptInput({
    prompt,
    setPrompt,
    onScan,
    onClear,
    isScanning,
}) {
    return (
        <section className="panel prompt-panel">
            <div className="section-label">
                PROMPT SCANNER
            </div>

            <div className="panel-title-row">
                <div>
                    <h2>
                        What do you want to send to AI?
                    </h2>

                    <p>
                        Enter a prompt and PRIVASHIELD will check
                        it for sensitive information.
                    </p>
                </div>

                <div className="local-badge">
                    ● LOCAL SCAN
                </div>
            </div>

            <textarea
                className="prompt-input"
                value={prompt}
                onChange={(event) =>
                    setPrompt(event.target.value)
                }
                placeholder={
                    "Example: My name is Rahul Kumar, my email is rahul@gmail.com and my phone is 9876543210. Please summarize this."
                }
                rows={7}
            />

            <div className="prompt-actions">
                <button
                    className="secondary-button"
                    type="button"
                    onClick={onClear}
                >
                    CLEAR
                </button>

                <button
                    className="primary-button"
                    type="button"
                    onClick={onScan}
                    disabled={isScanning}
                >
                    {isScanning
                        ? "SCANNING..."
                        : "SCAN & PROTECT"}
                </button>
            </div>

            <div className="input-note">
                PRIVASHIELD scans your text locally before it
                reaches an AI model.
            </div>
        </section>
    );
}

export default PromptInput;