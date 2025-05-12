import React from "react";
import ContractorHeader from "../../components/ContractorHeader";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const TaskProgress = () => {
  return (
    <>
     <Helmet>
        <title>Task Progress | Project Tracking Dashboard</title>
        <meta
          name="description"
          content="Track the progress of your construction projects with our task progress dashboard. Monitor milestones, budget, and timelines efficiently."
        />
        <meta
          name="keywords"
          content="Task Progress, Project Tracking, Construction Dashboard, Milestones, Budget Overview, Timeline Tracking"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
        <meta property="og:title" content="Task Progress | Project Tracking Dashboard" />
        <meta
          property="og:description"
          content="Monitor project milestones, budget utilization, and timeline tracking with our comprehensive task progress dashboard for contractors."
        />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/default-project-progress.jpg"
        />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/task-progress" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <ContractorHeader />
      <div className="container my-4">
        <h2>Track Project Progress</h2>
        {/* Project Overview Section */}
        <div className="card mb-4">
          <div className="card-header">Project Overview</div>
          <div className="card-body">
            <h5 className="card-title">
              Project Name: Greenfield Apartment Construction
            </h5>
            <p className="card-text">Client: John Doe</p>
            <p className="card-text">Location: 1234 Elm Street, Springfield</p>
            <p className="card-text">Start Date: July 10, 2024</p>
            <p className="card-text">Estimated Completion: December 30, 2024</p>
          </div>
        </div>
        {/* Milestones Progress Bar Section */}
        <div className="mb-4">
          <h4>Project Milestones</h4>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: "65%" }}
              aria-valuenow={65}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              65% Completed
            </div>
          </div>
        </div>
        {/* Task List Section */}
        <div className="mb-4">
          <h4>Task Progress</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>Foundation Work</span>
                <span className="badge bg-success">Completed</span>
              </div>
              <small className="text-muted">Completed on August 15, 2024</small>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>Framing</span>
                <span className="badge bg-success">Completed</span>
              </div>
              <small className="text-muted">
                Completed on September 10, 2024
              </small>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>Electrical &amp; Plumbing</span>
                <span className="badge bg-warning text-dark">In Progress</span>
              </div>
              <small className="text-muted">
                Estimated Completion: October 20, 2024
              </small>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>Roofing</span>
                <span className="badge bg-secondary">Pending</span>
              </div>
              <small className="text-muted">Scheduled for November 2024</small>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>Interior Finishing</span>
                <span className="badge bg-secondary">Pending</span>
              </div>
              <small className="text-muted">Scheduled for December 2024</small>
            </li>
          </ul>
        </div>
        {/* Budget & Timeline Overview */}
        <div className="mb-4">
          <h4>Budget &amp; Timeline Overview</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Budget Tracking</div>
                <div className="card-body">
                  <p className="card-text">Total Budget: $500,000</p>
                  <p className="card-text">Spent So Far: $325,000</p>
                  <div className="progress mb-2">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "65%" }}
                      aria-valuenow={65}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      65% Spent
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header">Timeline Tracking</div>
                <div className="card-body d-flex flex-column justify-content-end">
                  <p className="card-text">Days Passed: 100 out of 180</p>
                  <div className="progress mb-2">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "55%" }}
                      aria-valuenow={55}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      55% Time Passed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Alerts or Notifications Section */}
        <div className="alert alert-info" role="alert">
          Roofing materials delivery is delayed by 3 days. Adjustments needed in
          the schedule.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TaskProgress;
