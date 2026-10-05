import React from "react";

function RiskCard({ riskScore = 0, status = "Waiting for scan" }) {
    let riskLevel = "SAFE";

    if (riskScore >= 70) {
        riskLevel = "CRITICAL";
    } else if (riskScore >= 40) {
        riskLevel = "HIGH";
    } else if (riskScore > 0) {
        riskLevel = "MEDIUM";
    }

    return (
        <section className="panel risk-panel">
            <div className="section-label">
                PRIVACY RISK
            </div>

            <div className="risk-content">
                <div className="risk-score">
                    {riskScore}
                    <span>/100</span>
                </div>

                <div className="risk-info">
                    <div className="risk-level">
                        {riskLevel}
                    </div>

                    <div className="risk-status">
                        {status}
                    </div>
                </div>
            </div>

            <div className="risk-bar">
                <div
                    className="risk-bar-fill"
                    style={{
                        width: `${riskScore}%`,
                    }}
                ></div>
            </div>

            <p className="risk-description">
                Higher scores indicate a greater amount of
                sensitive information that should be protected.
            </p>
        </section>
    );
}

export default RiskCard;