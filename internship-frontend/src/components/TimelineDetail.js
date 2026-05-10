import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function TimelineDetail() {
  const { id } = useParams();
  const [timeline, setTimeline] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/timelines/${id}`).then(res => setTimeline(res.data));
  }, [id]);

  const deleteTimeline = async () => {
    if (window.confirm('Delete timeline?')) {
      await api.delete(`/timelines/${id}`);
      navigate('/timelines');
    }
  };

  if (!timeline) return <p>Loading...</p>;

  return (
    <div>
      <h3>Timeline #{timeline.id}</h3>
      <p>Project ID: {timeline.projectId || 'N/A'}</p>
      <p>Start: {timeline.startDate ? new Date(timeline.startDate).toLocaleDateString() : 'N/A'}</p>
      <p>End: {timeline.endDate ? new Date(timeline.endDate).toLocaleDateString() : 'N/A'}</p>
      <Link to={`edit`}>Edit</Link> | <button onClick={deleteTimeline}>Delete</button> | <Link to="/timelines">Back</Link>
    </div>
  );
}