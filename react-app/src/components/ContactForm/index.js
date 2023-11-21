import './contactform.css'
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to Formspree using Fetch API
    fetch('https://formspree.io/f/xdorwjqg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Thank you for your message!');
      // Add any additional logic for successful submission
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      // Handle error
    });

    // Reset form fields
    setFormData({
      name: '',
      email: '',
      message: ''
    });

  };

  return (
    <div className='form-container'>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        <label htmlFor="message">Message:</label><br />
        <textarea
          id="message"
          name="message"
          className='form-textarea'
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea><br />
        <button type="submit" value="Submit" className='contact-form-submit'>Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
