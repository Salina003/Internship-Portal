import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TimelineList from '../components/TimelineList';
import TimelineDetail from '../components/TimelineDetail';
import TimelineForm from '../components/TimelineForm';

export default function TimelinesPage() {
  return (
    <div>
      <h2>Timelines</h2>
      <nav>
        <Link to="">List</Link> | <Link to="new">Add New</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TimelineList />} />
        <Route path="new" element={<TimelineForm />} />
        <Route path=":id" element={<TimelineDetail />} />
        <Route path=":id/edit" element={<TimelineForm edit />} />
      </Routes>
    </div>
  );
}