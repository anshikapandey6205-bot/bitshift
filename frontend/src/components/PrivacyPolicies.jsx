import React from "react";

function PrivacyPolicies({ policies, setPolicies }) {
    function handleToggle(policyName) {
        setPolicies({
            ...policies,
            [policyName]: !policies[policyName],
        });
    }

    const policyItems = [
        {
            key: "redactEmail",
            label: "Email addresses",
            description: "Replace detected email addresses",
        },
        {
            key: "redactPhone",
            label: "Phone numbers",
            description: "Replace detected phone numbers",
        },
        {
            key: "redactFinancial",
            label: "Financial information",
            description: "Protect card and financial numbers",
        },
        {
            key: "redactCredentials",
            label: "Credentials & API keys",
            description: "Remove secrets and credentials",
        },
        {
            key: "redactPersonal",
            label: "Personal names",
            description: "Replace detected person names",
        },
    ];

    return (
        <section className="panel policies-panel">
            <div className="section-label">
                PRIVACY POLICIES
            </div>

            <div className="panel-title-row">
                <div>
                    <h2>
                        Protection rules
                    </h2>

                    <p>
                        Choose which types of sensitive information
                        PRIVASHIELD should protect.
                    </p>
                </div>

                <div className="policy-status">
                    POLICY ACTIVE
                </div>
            </div>

            <div className="policy-list">
                {policyItems.map((policy) => (
                    <div
                        className="policy-item"
                        key={policy.key}
                    >
                        <div className="policy-info">
                            <strong>
                                {policy.label}
                            </strong>

                            <span>
                                {policy.description}
                            </span>
                        </div>

                        <button
                            type="button"
                            className={
                                policies[policy.key]
                                    ? "toggle active"
                                    : "toggle"
                            }
                            onClick={() =>
                                handleToggle(policy.key)
                            }
                            aria-label={`Toggle ${policy.label}`}
                        >
                            <span className="toggle-knob"></span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PrivacyPolicies;
