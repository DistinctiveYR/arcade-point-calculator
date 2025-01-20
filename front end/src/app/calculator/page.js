'use client';

import { useState } from "react";
import styles from './calculator.module.css';
import { badgePoints, badgeSet, monthlyGames } from "@/constants/constant";
import Loader from "@/app/loader";

export default function Calculator() {
  const [profileLink, setProfileLink] = useState("");
  const [points, setPoints] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [badgeDetails, setBadgeDetails] = useState([]); // Initialize badge details state

  const fetchUrlViaProxy = async (url) => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.text();
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  };

  const extractBadges = (htmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const badgeElements = doc.querySelectorAll('.profile-badge');
    let totalPoints = 0;
    const details = [];

    badgeElements.forEach((badgeElement) => {
      const title = badgeElement.querySelector('.ql-title-medium').textContent.trim();
      let points = 0;
      if (Object.keys(monthlyGames).includes(title)) {
        points = monthlyGames[title];
      } else if (badgeSet.has(title)) {
        points = badgePoints[title];
      }
      totalPoints += points;
      details.push({ title, points });
    });

    setPoints(totalPoints);
    setBadgeDetails(details); // Set badge details
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPoints(0);
    setError("");
    setLoading(true); // Start loader
  
    const urlPattern = /^https:\/\/www\.cloudskillsboost\.google\/public_profiles\/[a-zA-Z0-9-]+$/;
  
    if (!profileLink) {
      setError("Please enter a profile link.");
      setLoading(false); // Stop loader if error occurs
      return;
    }
  
    if (!urlPattern.test(profileLink)) {
      setError("Invalid URL format. Please enter a valid profile link.");
      setLoading(false); // Stop loader if error occurs
      return;
    }
  
    const htmlText = await fetchUrlViaProxy(profileLink);
    if (htmlText) {
      extractBadges(htmlText);
    } else {
      setError("Failed to fetch or process the profile.");
    }
  
    setLoading(false); // Stop loader when process is complete
  };

  return (
    <div className={styles['center-container']}>
      <h1>Arcade Point Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your profile link"
          value={profileLink}
          onChange={(e) => setProfileLink(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <span className={styles.spinner}></span> : "Calculate"}
        </button>
      </form>

      {/* Display error message if present */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Show points table only when available and not loading */}
      {badgeDetails.length > 0 && !loading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Badge Name</th>
              <th>Points Earned</th>
            </tr>
          </thead>
          <tbody>
            {badgeDetails.map((badge, index) => (
              <tr key={index}>
                <td>{badge.title}</td>
                <td>{badge.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show total points only when available and not loading */}
      {points !== 0 && points !== null && !loading && (
        <p className={styles.result}>
          🎉 Total Badges Earned: <strong>{points}</strong>
        </p>
      )}
    </div>
  );
}
