import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function TimelineList() {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    api.get('/timelines').then(res => setTimelines(res.data));
  }, []);

  if (!timelines.length) return <p>No timelines found.</p>;

  return (
    <ul>
      {timelines.map(t => (
        <li key={t.id}>
          <Link to={`${t.id}`}>Timeline #{t.id} for Project {t.projectId}</Link>
        </li>
      ))}
    </ul>
  );
}