import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoMdCloseCircle } from "react-icons/io";
import ContractorHeader from "../../components/ContractorHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const ScheduleProject = () => {
  const [schedule, setSchedule] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-schedules");
      setSchedule(response.data.project_schedule);
    } catch (err) {
    }
  };

  const handleProjectDelete = async (e) => {
    const projectId = e.currentTarget.closest("li").dataset.key;

    try {
      await axios.delete(`https://apitourism.today.alayaarts.com/api/deleteschedule/${projectId}`);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const projectDate = document.getElementById("projectDate").value;
    const projectDescription = document.getElementById("projectDescription").value;
    const projectDuration = document.getElementById("projectDuration").value;
    const projectStatus = document.getElementById("projectStatus").value;
    const teamMembers = document.getElementById("teamMembers").value;

    const formData = new FormData();
    formData.append("proj_name", projectName);
    formData.append("proj_date", projectDate);
    formData.append("proj_desc", projectDescription);
    formData.append("estimate_duration", projectDuration);
    formData.append("proj_status", projectStatus);
    formData.append("assign_team_member", teamMembers);

    try {
      const response = await axios.post("https://apitourism.today.alayaarts.com/api/store-schedule", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project scheduled successfully!");
      fetchProjects();
    } catch (err) {
      toast.error("Error scheduling project. Please try again.");
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
    <Helmet>
        <title>Schedule Projects | Biznet</title>
        <meta
          name="description"
          content="Effortlessly schedule, manage, and monitor projects with the Biurbancraft real estate Schedule Project tool. Plan durations, assign team members, and track project statuses."
        />
        <meta
          name="keywords"
          content="schedule projects, project management, team assignments, project tracking, Biurbancraft real estate tools"
        />
        <meta name="author" content="Biurbancraft real estate Team" />
        <meta property="og:title" content="Schedule Projects | Biznet" />
        <meta
          property="og:description"
          content="Simplify project scheduling and management with Biznet. Assign tasks, track progress, and monitor upcoming projects seamlessly."
        />
        <meta property="og:url" content="https://www.biznetusa.com/schedule-projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Schedule Projects | Biznet" />
        <meta
          name="twitter:description"
          content="Plan, manage, and track your projects effectively with the Biurbancraft real estate Schedule Project tool."
        />
      </Helmet>
      <Header />
      <ContractorHeader />
      <div className="container my-3">
        {/* Schedule Projects */}
        <div id="scheduleProjects" className="mb-5">
          <h2 className="my-2">Schedule Projects</h2>
          <form id="scheduleForm" className="mb-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input type="text" className="form-control" id="projectName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDate" className="form-label">
                Project Date
              </label>
              <input type="date" className="form-control" id="projectDate" required />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">
                Project Description
              </label>
              <textarea className="form-control" id="projectDescription" rows={3} required />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDuration" className="form-label">
                Estimated Duration (days)
              </label>
              <input type="number" className="form-control" id="projectDuration" required />
            </div>
            <div className="mb-3">
              <label htmlFor="projectStatus" className="form-label">
                Project Status
              </label>
              <select className="form-select" id="projectStatus" required>
                <option value="" disabled selected>
                  Select Status
                </option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="teamMembers" className="form-label">
                Assign Team Members
              </label>
              <input type="text" className="form-control" id="teamMembers" placeholder="Comma-separated names" required />
            </div>
            <button type="submit" className="btn btn-success">
              Schedule Project
            </button>
          </form>
          <h3>Upcoming Projects</h3>
          <ul id="scheduledProjects" className="list-group mb-3">
            {schedule.length > 0 ? (
              schedule.map((item, index) => (
                <li id="notifications" className="list-group-item d-flex justify-content-between" data-key={item.id} key={item.id} role="alert">
                  <div>
                    <h1 className="d-inline">{item.proj_name}</h1> <small>({item.estimate_duration} days)</small>
                    <p>{item.proj_desc}</p>
                  </div>
                  <div>
                    <IoMdCloseCircle className="text-danger" onClick={handleProjectDelete} />
                  </div>
                </li>
              ))
            ) : (
              <div id="notifications" className="alert alert-info" role="alert">
                No upcoming projects scheduled.
              </div>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ScheduleProject;

