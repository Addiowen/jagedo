

'use client'
import React, { useState } from 'react';
import './styles.css'; // Import CSS file for styling

// Define sample project data
interface Project {
  projectName: string;
  details: string;
  startDate: string;
  endDate: string;
  managedBy: string;
  doneBy: string;
  totalCost: number;
  budget: number;
  status: string;
}

// Define sample project data
const projects: Project[] = [
  {
    projectName: 'Renovations',
    details: 'apartment Renovations',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    managedBy: 'Jagedo',
    doneBy: 'Jeremy',
    totalCost: 100000,
    budget: 80000,
    status: 'In Progress',
  },
  {
    projectName: 'New construction',
    details: '42 units.',
    startDate: '2024-03-15',
    endDate: '2024-09-30',
    managedBy: 'Alice Brown',
    doneBy: 'Bob Johnson',
    totalCost: 150000,
    budget: 120000,
    status: 'Completed',
  },
];

// Component to render the project table
const ProjectTable = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Explicitly define selectedProject as Project or null

  // Function to handle click on View Details button
  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  // Function to close the detailed view modal
  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Project Information</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Details</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Managed By</th>
              <th>Done By</th>
              <th>Total Cost</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.projectName}</td>
                <td>{project.details}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.managedBy}</td>
                <td>{project.doneBy}</td>
                <td>${project.totalCost.toLocaleString()}</td>
                <td>${project.budget.toLocaleString()}</td>
                <td>{project.status}</td>
                <td>
                  <button
                    onClick={() => handleViewDetails(project)}
                    className="btn-view-details"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying project details */}
      {selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDetails}>&times;</span>
            <h2>Project Details</h2>
            <p><strong>Project Name:</strong> {selectedProject.projectName}</p>
            <p><strong>Details:</strong> {selectedProject.details}</p>
            <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
            <p><strong>End Date:</strong> {selectedProject.endDate}</p>
            <p><strong>Managed By:</strong> {selectedProject.managedBy}</p>
            <p><strong>Done By:</strong> {selectedProject.doneBy}</p>
            <p><strong>Total Cost:</strong> ${selectedProject.totalCost.toLocaleString()}</p>
            <p><strong>Budget:</strong> ${selectedProject.budget.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedProject.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;