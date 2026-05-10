import React, { useEffect, useState } from "react";
import {
  fetchUserCertificates,
  downloadCertificateById,
} from "../services/certificateService";
import "./CertificateListPage.css";

export default function CertificateListPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCertificates() {
      try {
        setLoading(true);
        const data = await fetchUserCertificates();
        setCertificates(data);
      } catch (err) {
        setError(err.message || "Failed to load certificates");
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  if (loading || error || certificates.length === 0) {
    return (
      <p className="empty-state">
        {loading && "Loading your certificates..."}
        {error && `Error: ${error}`}
        {!loading && !error && "No certificates found."}
      </p>
    );
  }

  return (
    <ul className="certificate-list">
      {certificates.map((cert) => (
        <li className="certificate-item" key={cert.id}>
          <div className="certificate-info">
            <strong>{cert.title || "Certificate"}</strong>
            <span>
              Issued on{" "}
              {cert.issuedDate
                ? new Date(cert.issuedDate).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <button
            className="btn-primary"
            onClick={() => downloadCertificateById(cert.id)}
          >
            Download
          </button>
        </li>
      ))}
    </ul>
  );
}