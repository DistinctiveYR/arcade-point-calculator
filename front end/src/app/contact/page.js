'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './contact.module.css';
require('dotenv').config();

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);  // State to track dropdown visibility
  const dropdownRef = useRef(null);  // Ref to handle clicks outside of the dropdown

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !selectedCategory || !description) {
      setError('All fields are required!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    try {
      console.log('api - ', process.env.NEXT_PUBLIC_CONTACT_US)
      const response = await axios.post(process.env.NEXT_PUBLIC_CONTACT_US, {
        email,
        category: selectedCategory,
        description
      });

      if (response.status === 200) {
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      alert('An error occurred while submitting the form.');
    }
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);  // Close dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles['center-container']}>
      <div className={styles.content}>
        <h1>Contact Us</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className={styles['custom-dropdown']} ref={dropdownRef}>
          <div
            className={styles['dropdown-button']}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCategory || 'Select Category'}
          </div>
          {isOpen && (
            <ul className={styles['dropdown-menu']}>
              {['Query', 'Upgrades', 'Issues'].map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelectedCategory(option);
                    setIsOpen(false); // Close dropdown after selecting an option
                  }}
                  className={styles['dropdown-item']}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <textarea
          placeholder="Your Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      
    </div>
  );
}
