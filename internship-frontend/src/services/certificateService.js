// src/services/certificateService.js

// 🔹 TEMPORARY MOCK DATA
const mockCertificates = [
  {
    id: 1,
    title: "React Basics",
    issuedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Full Stack Development",
    issuedDate: "2024-03-20"
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    issuedDate: "2024-06-10"
  }
];

// Simulate fetching certificates from API
export async function fetchUserCertificates() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCertificates), 500); // 0.5s delay
  });
}

// Simulate downloading certificate
export async function downloadCertificateById(certificateId) {
  alert(`Downloading certificate #${certificateId} (mock)`);

  // Optional: create dummy PDF download
  const blob = new Blob([`Certificate #${certificateId}`], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `certificate_${certificateId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}