import React, { useState } from "react";
import './contactform.css'

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use Formspree to handle form submission
    const response = await fetch("https://formspree.io/f/xdorwjqg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (response.ok) {
      alert("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Message failed to send. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="contact-form-name">
          <label className="contact-form-label" >Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-email">
          <label className="contact-form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-message">
          <label className="contact-form-label">Message:</label>
          <textarea
            value={message}
            className="contact-form-message-textarea"
            rows="5"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
