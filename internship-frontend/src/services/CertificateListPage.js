// src/pages/CertificateListPage.js
import React, { useEffect, useState } from "react";
import { fetchUserCertificates, downloadCertificateById } from "../services/certificateService";
import "./certificateService.css";

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  if (loading) return <p className="loading">Loading your certificates...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (certificates.length === 0) return <p className="empty">No certificates found.</p>;

  return (
    <ul className="certificate-list">
      {certificates.map(cert => (
        <li className="certificate-item" key={cert.id}>
          <div>
            <strong>{cert.title || "Certificate"}</strong><br/>
            <small>Issued on: {new Date(cert.issuedDate).toLocaleDateString()}</small>
          </div>
          <button onClick={() => downloadCertificateById(cert.id)}>Download PDF</button>
        </li>
      ))}
    </ul>
  );
}