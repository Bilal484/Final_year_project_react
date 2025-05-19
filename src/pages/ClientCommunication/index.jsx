import React, { useEffect } from "react";
import { Helmet } from 'react-helmet';
import "./ClientCommunication.css";
import ContractorHeader from "../../components/ContractorHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ClientCommunication = () => {
  useEffect(() => {
    // Toggle Live Chat functionality
    const toggleLiveChat = () => {
      const chatWindow = document.getElementById("liveChat");
      chatWindow.style.display =
        chatWindow.style.display === "none" ? "block" : "none";
    };

    // Start Video Call
    const startVideoCall = () => {
      const videoCallWindow = document.getElementById("videoCall");
      videoCallWindow.style.display = "block";
      // Initialize video call functionality here
    };

    // End Video Call
    const endVideoCall = () => {
      const videoCallWindow = document.getElementById("videoCall");
      videoCallWindow.style.display = "none";
      // End video call functionality here
    };

    // Send Message functionality
    const sendMessage = (event) => {
      event.preventDefault(); // Prevent form submission
      const messageInput = document.getElementById("clientMessage");
      const message = messageInput.value.trim();
      if (message) {
        // Create message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        // Create bubble for sent message
        const bubble = document.createElement("div");
        bubble.classList.add("bubble", "sent"); // Sent message style
        bubble.textContent = message;

        // Create timestamp
        const timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        const now = new Date();
        timestamp.textContent =
          now.getHours() +
          ":" +
          (now.getMinutes() < 10 ? "0" : "") +
          now.getMinutes();

        // Append bubble and timestamp to message element
        messageElement.appendChild(bubble);
        messageElement.appendChild(timestamp);

        // Append message to message history
        const chatMessages = document.querySelector(".chat-messages");
        chatMessages.appendChild(messageElement);

        // Clear input
        messageInput.value = "";

        // Scroll to the bottom of chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    };

    // Attach event listeners
    const messageForm = document.getElementById("messageForm");
    messageForm.addEventListener("submit", sendMessage);

    const liveChatBtn = document.getElementById("liveChatBtn");
    liveChatBtn.addEventListener("click", toggleLiveChat);

    const videoCallBtn = document.getElementById("videoCallBtn");
    videoCallBtn.addEventListener("click", startVideoCall);

    const videoCloseBtn = document.querySelector(
      ".video-call-window .btn-close"
    );
    if (videoCloseBtn) {
      videoCloseBtn.addEventListener("click", endVideoCall);
    }

    // Clean up event listeners on unmount
    return () => {
      messageForm.removeEventListener("submit", sendMessage);
      liveChatBtn.removeEventListener("click", toggleLiveChat);
      videoCallBtn.removeEventListener("click", startVideoCall);
      if (videoCloseBtn) {
        videoCloseBtn.removeEventListener("click", endVideoCall);
      }
    };
  }, []);

  return (
    <>
    <Helmet>
        <title>Client Communication - Our Company</title>
        <meta name="description" content="Manage your client communications effectively with our dedicated platform. Engage through live chat and video calls." />
        <meta name="keywords" content="client communication, live chat, video call, customer service" />
        <meta property="og:title" content="Client Communication - Our Company" />
        <meta property="og:description" content="Enhance your client interactions with our live chat and video call functionalities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="path_to_image_for_social_media" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Communication - Our Company" />
        <meta name="twitter:description" content="Engage and support your clients with our comprehensive communication tools." />
      </Helmet>
      <Header />
      <ContractorHeader />
      <main>
        <div className="container my-3">
          <div id="clientCommunication" className="mb-5">
            <h2 className="my-2">Client Communication</h2>

            {/* Message Form */}
            <form id="messageForm" className="mb-3">
              <div className="mb-3">
                <label htmlFor="clientMessage" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="clientMessage"
                  rows={3}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Send Message
              </button>
            </form>

            {/* Filter Messages */}
            <div className="mb-4">
              <h3>Filter Messages</h3>
              <select
                id="messageFilter"
                className="form-select"
                aria-label="Message Filter"
              >
                <option value="" selected>
                  All Messages
                </option>
                <option value="sent">Sent Messages</option>
                <option value="received">Received Messages</option>
              </select>
            </div>

            {/* Message History */}
            <h3>Message History</h3>
            <ul id="messageList" className="list-group mb-3">
              <li className="list-group-item">
                Hello! I'm interested in the project.
              </li>
              <li className="list-group-item">
                Thanks for reaching out! Let's discuss further.
              </li>
              <li className="list-group-item">Can we schedule a meeting?</li>
              <li className="list-group-item">
                Sure! What time works for you?
              </li>
            </ul>

            {/* Notification */}
            <h3>Notification</h3>
            <div id="notifications" className="alert alert-info" role="alert">
              No messages yet.
            </div>

            {/* Live Chat and Video Call Section */}
            <div className="mt-4">
              <h3>Live Chat and Video Call</h3>
              <button id="liveChatBtn" className="btn btn-primary me-2">
                Start Live Chat
              </button>
              <button id="videoCallBtn" className="btn btn-success">
                Start Video Call
              </button>
            </div>

            {/* Live Chat Window */}
            <div
              id="liveChat"
              className="chat-window"
              style={{ display: "none" }}
            >
              <div className="chat-header px-3">
                <h4>Live Chat</h4>
                <button className="btn-close">Close</button>
              </div>
              <div className="chat-messages bg-light border rounded p-3">
                {/* Chat messages will be dynamically added here */}
              </div>
              <div className="chat-input d-flex align-items-center">
                <input
                  type="text"
                  id="chatInput"
                  placeholder="Type a message..."
                  className="form-control"
                />
                <button className="btn btn-warning ms-2">Send</button>
              </div>
            </div>

            {/* Video Call Window */}
            <div
              id="videoCall"
              className="video-call-window"
              style={{ display: "none" }}
            >
              <div className="video-header px-3">
                <h4>Video Call</h4>
                <button className="btn-close">End</button>
              </div>
              <div className="video-container">
                {/* Placeholder for video streams */}
                <video id="localVideo" autoPlay />
                <video id="remoteVideo" autoPlay />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default ClientCommunication;
