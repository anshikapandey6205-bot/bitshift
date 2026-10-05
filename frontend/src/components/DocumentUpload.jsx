import React, { useRef, useState } from "react";

function DocumentUpload() {
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    function handleFile(file) {
        if (!file) {
            return;
        }

        const allowedExtensions = [
            ".txt",
            ".md",
            ".csv",
            ".json",
            ".pdf",
            ".docx",
        ];

        const fileName = file.name.toLowerCase();

        const isAllowed = allowedExtensions.some(
            (extension) => fileName.endsWith(extension)
        );

        if (!isAllowed) {
            alert(
                "Please upload a TXT, MD, CSV, JSON, PDF, or DOCX file."
            );
            return;
        }

        setSelectedFile(file);
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        handleFile(file);
    }

    function handleDrop(event) {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        handleFile(file);
    }

    function handleDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave() {
        setIsDragging(false);
    }

    function handleBrowse() {
        fileInputRef.current?.click();
    }

    function handleRemove(event) {
        event.stopPropagation();

        setSelectedFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <section className="panel document-panel">

            <div className="section-label">
                DOCUMENT SCANNER
            </div>

            <div className="panel-title-row">

                <div>
                    <h2>
                        Scan a document for sensitive data
                    </h2>

                    <p>
                        Upload a document and PRIVASHIELD will
                        check it for sensitive information.
                    </p>
                </div>

                <div className="local-badge">
                    ● LOCAL PROCESSING
                </div>

            </div>

            <div
                className={`upload-area ${isDragging ? "upload-area-active" : ""
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowse}
            >

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.md,.csv,.json,.pdf,.docx"
                    onChange={handleFileChange}
                    hidden
                />

                <div className="upload-icon">
                    ↑
                </div>

                <h3>
                    {selectedFile
                        ? selectedFile.name
                        : "Drop your document here"}
                </h3>

                <p>
                    {selectedFile
                        ? "Document selected and ready"
                        : "or click to browse files"}
                </p>

                <div className="file-types">
                    TXT · MD · CSV · JSON · PDF · DOCX
                </div>

            </div>

            {selectedFile && (
                <div className="selected-file">

                    <div className="selected-file-info">

                        <div className="selected-file-icon">
                            DOC
                        </div>

                        <div>
                            <strong>
                                {selectedFile.name}
                            </strong>

                            <span>
                                Ready to scan
                            </span>
                        </div>

                    </div>

                    <button
                        className="secondary-button"
                        type="button"
                        onClick={handleRemove}
                    >
                        REMOVE
                    </button>

                </div>
            )}

            <div className="document-note">
                🔒 Document content will be checked for sensitive
                information before AI processing.
            </div>

        </section>
    );
}

export default DocumentUpload;