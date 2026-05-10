import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./ProgressUpdateForm.css";

export default function ProgressUpdateForm({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicationId: "",
    userId: "",
    content: "",
    date: "",
    startDate: "",
    endDate: "",
    completionPercentage: "",
    progressDetails: ""
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications").then((res) => setApplications(res.data));
  }, []);

  useEffect(() => {
    if (edit && id) {
      api.get(`/progressupdates/${id}`).then((res) => {
        setFormData({
          applicationId: res.data.applicationId || "",
          userId: res.data.userId || "",
          content: res.data.content || "",
          date: res.data.date ? res.data.date.split("T")[0] : "",
          startDate: res.data.startDate ? res.data.startDate.split("T")[0] : "",
          endDate: res.data.endDate ? res.data.endDate.split("T")[0] : "",
          completionPercentage:
            res.data.completionPercentage != null
              ? String(res.data.completionPercentage)
              : "",
          progressDetails: res.data.progressDetails || ""
        });
      });
    }
  }, [edit, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      completionPercentage: formData.completionPercentage
        ? Number(formData.completionPercentage)
        : null,
      date: formData.date || null,
      startDate: formData.startDate || null,
      endDate: formData.endDate || null
    };

    try {
      if (edit) {
        await api.put(`/progressupdates/${id}`, submissionData);
        alert("Progress update updated");
        navigate(`/progressupdates/${id}`);
      } else {
        const res = await api.post("/progressupdates", submissionData);
        alert("Progress update created");
        navigate(`/progressupdates/${res.data.id}`);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form className="progress-form" onSubmit={handleSubmit}>
      <h3>{edit ? "Edit Progress Update" : "Add Progress Update"}</h3>

      <div className="form-group">
        <label>Application</label>
        <select
          name="applicationId"
          value={formData.applicationId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Application --</option>
          {applications.map((a) => (
            <option key={a.id} value={a.id}>
              #{a.id} - {a.status || ""}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>User ID</label>
        <input
          type="number"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Completion Percentage</label>
        <input
          type="number"
          min="0"
          max="100"
          name="completionPercentage"
          value={formData.completionPercentage}
          onChange={handleChange}
        />

        <div className="progress-preview">
          <div className="preview-bar-bg">
            <div
              className="preview-bar-fill"
              style={{ width: `${formData.completionPercentage || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Progress Details</label>
        <textarea
          name="progressDetails"
          value={formData.progressDetails}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">{edit ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}