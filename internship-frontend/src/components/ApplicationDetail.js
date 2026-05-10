import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/applications/${id}`).then(res => setApplication(res.data));
  }, [id]);

  const deleteApplication = async () => {
    if (window.confirm('Delete application?')) {
      await api.delete(`/applications/${id}`);
      navigate('/applications');
    }
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div>
      <h3>Application #{application.id}</h3>
      <p>Status: {application.status || 'N/A'}</p>
      <p>Project ID: {application.projectId || 'N/A'}</p>
      <p>Applicant ID: {application.applicantId || 'N/A'}</p>
      <p>Team ID: {application.teamId || 'N/A'}</p>
      <Link to={`edit`}>Edit</Link> |{' '}
      <button onClick={deleteApplication}>Delete</button> |{' '}
      <Link to="/applications">Back</Link>
    </div>
  );
}