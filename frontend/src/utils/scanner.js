        export function scanText(text, policies) {
    const detections = [];
    let protectedText = text;

    // EMAIL
    if (policies.redactEmail) {
        const emailRegex =
            /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

        protectedText = protectedText.replace(
            emailRegex,
            (value) => {
                detections.push({
                    type: "EMAIL",
                    value: value,
                    action: "REDACTED",
                });

                return "[EMAIL]";
            }
        );
    }

    // PHONE
    if (policies.redactPhone) {
        const phoneRegex =
            /(?:\+91[\s-]?)?[6-9]\d{9}\b/g;

        protectedText = protectedText.replace(
            phoneRegex,
            (value) => {
                detections.push({
                    type: "PHONE",
                    value: value,
                    action: "REDACTED",
                });

                return "[PHONE]";
            }
        );
    }

    // CREDIT CARD
    if (policies.redactFinancial) {
        const cardRegex =
            /\b(?:\d[ -]*?){13,19}\b/g;

        protectedText = protectedText.replace(
            cardRegex,
            (value) => {
                const digits = value.replace(/\D/g, "");

                if (digits.length >= 13 && digits.length <= 19) {
                    detections.push({
                        type: "FINANCIAL",
                        value: value,
                        action: "REDACTED",
                    });

                    return "[FINANCIAL_DATA]";
                }

                return value;
            }
        );
    }

    // API KEY / SECRET
    if (policies.redactCredentials) {
        const credentialRegex =
            /\b(?:sk-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16})\b/g;

        protectedText = protectedText.replace(
            credentialRegex,
            (value) => {
                detections.push({
                    type: "CREDENTIAL",
                    value: value,
                    action: "REDACTED",
                });

                return "[SECRET_REMOVED]";
            }
        );
    }

    // PERSON NAME - simple demo detection
    if (policies.redactPersonal) {
        const nameRegex =
            /\b(?:My name is|I am|I'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;

        protectedText = protectedText.replace(
            nameRegex,
            (fullMatch, name) => {
                detections.push({
                    type: "PERSON",
                    value: name,
                    action: "REDACTED",
                });

                return fullMatch.replace(name, "[PERSON]");
            }
        );
    }

    // Calculate risk score
    let riskScore = 0;

    detections.forEach((detection) => {
        if (detection.type === "CREDENTIAL") {
            riskScore += 40;
        } else if (detection.type === "FINANCIAL") {
            riskScore += 30;
        } else if (detection.type === "PHONE") {
            riskScore += 15;
        } else if (detection.type === "EMAIL") {
            riskScore += 10;
        } else if (detection.type === "PERSON") {
            riskScore += 5;
        }
    });

    riskScore = Math.min(riskScore, 100);

    let status = "SAFE";

    if (riskScore >= 70) {
        status = "CRITICAL";
    } else if (riskScore >= 40) {
        status = "HIGH";
    } else if (riskScore > 0) {
        status = "MEDIUM";
    }

    return {
        riskScore,
        detections,
        protectedText,
        status,
    };
}