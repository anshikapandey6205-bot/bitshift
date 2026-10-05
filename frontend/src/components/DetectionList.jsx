import React from "react";

function DetectionList({ detections = [] }) {
    return (
        <section className="panel detection-panel">
            <div className="section-label">
                DETECTIONS
            </div>

            <div className="panel-title-row">
                <div>
                    <h2>
                        Sensitive information
                    </h2>

                    <p>
                        Information identified by the
                        privacy firewall.
                    </p>
                </div>

                <div className="detection-count">
                    {detections.length}
                </div>
            </div>

            {detections.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">
                        ✓
                    </div>

                    <div>
                        <strong>
                            No sensitive data detected
                        </strong>

                        <p>
                            Run a scan to see detected
                            entities here.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="detection-list">
                    {detections.map(
                        (detection, index) => (
                            <div
                                className="detection-item"
                                key={`${detection.type}-${index}`}
                            >
                                <div className="detection-icon">
                                    !
                                </div>

                                <div className="detection-info">
                                    <div className="detection-type">
                                        {detection.type}
                                    </div>

                                    <div className="detection-value">
                                        {detection.value}
                                    </div>
                                </div>

                                <div className="detection-action">
                                    {detection.action}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </section>
    );
}

export default DetectionList;