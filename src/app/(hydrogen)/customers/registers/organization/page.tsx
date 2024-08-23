'use client';

// Reviews.tsx

import React, { useState } from 'react';
import './Reviews.css'; // Import CSS for styling

// Define Project interface
interface Project {
  status: string;
  doneBy: string;
  startDate: string;
  endDate: string;
}

const Reviews: React.FC = () => {
  // Example project data
  const projects: Project[] = [
    {
      status: 'In Progress',
      doneBy: 'Jane Smith',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
    },
    {
      status: 'Completed',
      doneBy: 'Bob Johnson',
      startDate: '2024-03-15',
      endDate: '2024-09-30',
    },
  ];

  // State for modal visibility and review data
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  // Open modal and set selected project
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };  

  // Handle rating change
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 5) {
      setRating(value);
    }
  };
  
  // Handle comment change
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Handle submit review
  const handleSubmitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle submission logic (e.g., send review to server)
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Reset fields after submission
    setRating(null);
    setComment('');
    setShowModal(false);
  };

  return (
    <div className="reviews-container">
      <h2>Project Reviews</h2>
      <table className="project-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Done By</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} onClick={() => handleProjectClick(project)}>
              <td>{project.status}</td>
              <td>{project.doneBy}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for reviews */}
      {showModal && selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Project Review: {selectedProject.status}</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label htmlFor="rating">Rating (1-5):</label>
                <input
                  type="number"
                   id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={rating || ''}
                  onChange={handleRatingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
