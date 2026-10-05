import React from "react";

function Header() {
    return (
        <header className="app-header">
            <div className="brand">
                <div className="brand-icon">
                    P
                </div>

                <div>
                    <div className="brand-name">
                        PRIVASHIELD
                    </div>

                    <div className="brand-subtitle">
                        AI PRIVACY FIREWALL
                    </div>
                </div>
            </div>

            <div className="header-status">
                <span className="status-dot"></span>
                PROTECTION ACTIVE
            </div>
        </header>
    );
}

export default Header;