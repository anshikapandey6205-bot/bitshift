import React from "react";

function BeforeAfter({ originalText = "", protectedText = "" }) {
    return (
        <section className="panel before-after-panel">
            <div className="section-label">
                PROTECTION RESULT
            </div>

            <div className="panel-title-row">
                <div>
                    <h2>
                        Before & After
                    </h2>

                    <p>
                        See how PRIVASHIELD transforms sensitive
                        information before it reaches AI.
                    </p>
                </div>
            </div>

            <div className="before-after-grid">

                <div className="text-preview">
                    <div className="preview-header">
                        <span>
                            ORIGINAL PROMPT
                        </span>

                        <span className="preview-badge original">
                            UNSAFE
                        </span>
                    </div>

                    <div className="preview-content">
                        {originalText ? (
                            originalText
                        ) : (
                            <span className="placeholder-text">
                                Your original prompt will appear here.
                            </span>
                        )}
                    </div>
                </div>


                <div className="text-preview protected-preview">
                    <div className="preview-header">
                        <span>
                            PROTECTED PROMPT
                        </span>

                        <span className="preview-badge protected">
                            SAFE
                        </span>
                    </div>

                    <div className="preview-content">
                        {protectedText ? (
                            protectedText
                        ) : (
                            <span className="placeholder-text">
                                Your protected prompt will appear here
                                after scanning.
                            </span>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default BeforeAfter;