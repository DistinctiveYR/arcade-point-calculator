'use client';

// import { useState } from "react";
// import styles from './page.module.css';
// import { badgePoints, badgeSet, monthlyGames } from "@/constants/constant";

import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the calculator page
  redirect('/calculator');
  return null; // This line won't actually render since redirect happens
}


// export default function Home() {
//   const [profileLink, setProfileLink] = useState("");
//   const [points, setPoints] = useState(null);
//   const [error, setError] = useState("");

//   const fetchUrlViaProxy = async (url) => {
//     try {
//       const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       return await response.text(); // Fetch raw HTML
//     } catch (error) {
//       console.error("Error in fetchUrlViaProxy:", error.message);
//       return null;
//     }
//   };

//   const extractBadges = (htmlText) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlText, "text/html");
//     const badgeElements = doc.querySelectorAll('.profile-badge');
//     const badgeDict = {};
//     let badgeArray = [];
  
//     badgeElements.forEach((badgeElement) => 
//     {
//       const title = badgeElement.querySelector('.ql-title-medium').textContent.trim();
//       const date = badgeElement.querySelector('.ql-body-medium').textContent.trim().replace('Earned ', '');
//       badgeDict[title] = date;
//       console.log('badgeDict : ',badgeDict)

//       if(Object.keys(monthlyGames).includes(title)){
//         setPoints((points) => points + monthlyGames[title]);
//         badgeArray.push({title : monthlyGames[title]});
//       }
//       else if (badgeSet.has(title)) {
//         setPoints((points) => points + badgePoints[title]);
//         badgeArray.push({title : badgePoints[title]});
//       }
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setPoints(0);
//     setError("");

//     if (!profileLink) {
//       setError("Please enter a profile link.");
//       return;
//     }

//     const htmlText = await fetchUrlViaProxy(profileLink);

//     if (htmlText) {
//       console.log('htmlText : ', htmlText);
//       extractBadges(htmlText);
//     } else {
//       setError("Failed to fetch or process the profile.");
//       setPoints(null);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter your profile link"
//           value={profileLink}
//           onChange={(e) => setProfileLink(e.target.value)}
//           className={styles.input}
//         />
//         <button type="submit" className={styles.button}>Calculate</button>
//       </form>
//       {error && <p className={styles.error}>{error}</p>}
//       {points !== null && (
//         <p className={styles.result}>
//           🎉 Total Badges Earned: <strong>{points}</strong>
//         </p>
//       )}
//     </div>
//   );
// }
