
import React from "react";
import "./Home.css";

export default function Home({ token }) {
  const username = localStorage.getItem("username") || "Student";

  return (
    <div className="home-wrapper">
      
      <div className="section greeting">
        <h2>Welcome! 🏫</h2>
        <p>Glad to have you on the Hostel Management Portal.</p>
      </div>

     
      <div className="section features">
        <h3>🌟 Features of the Portal</h3>
        <ul>
          <li>Submit and track complaints easily</li>
          <li>Provide feedback to improve hostel services</li>
          <li>Admin panel for efficient issue resolution</li>
          <li>Secure login and role-based access</li>
          <li>Real-time updates and notifications</li>
        </ul>
      </div>

     
      <div className="section benefits">
        <h3>🏕️ Benefits of Hostel Life</h3>
        <ul>
          <li>Build lifelong friendships and networks</li>
          <li>Learn independence and responsibility</li>
          <li>Access to campus resources and events</li>
          <li>Supportive community and shared experiences</li>
          <li>Convenient living close to academics</li>
        </ul>
      </div>

    
      <div className="section quote">
        <h3>📝 Hostel Quote</h3>
        <blockquote>
          “Hostel life teaches you how to live with others, laugh with others, and grow together.”
        </blockquote>
      </div>
    </div>
  );
}
