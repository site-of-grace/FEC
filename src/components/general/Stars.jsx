import React from 'react';

export default function Stars({ number = 0, hide = false }) {
  const clampedNumber = Math.min(Math.max(number, 0), 5);
  
  if (hide && clampedNumber === 0) {
    return null;
  }

  const getStarImages = () => {
    const fullStars = Math.floor(clampedNumber);
    const partialStar = clampedNumber - fullStars;
    // _ is a placeholder as we don't need the value of each element in the array
    const starImages = Array.from({ length: 5 }).map((_, i) => {
      if (i < fullStars) {
        return (
          <img
            key={`full-star-${i}`}
            className="small-stars"
            src="/icons/fullStar.png"
            alt="Full star"
          />
        );
      } else if (i === fullStars) {
        if (partialStar >= 0.75) {
          return (
            <img
              key="three-fourths-star"
              className="small-stars"
              src="/icons/threeForthsStar.png"
              alt="Three-fourths star"
            />
          );
        } else if (partialStar >= 0.5) {
          return (
            <img
              key="half-star"
              className="small-stars"
              src="/icons/halfStar.png"
              alt="Half star"
            />
          );
        } else if (partialStar >= 0.25) {
          return (
            <img
              key="quarter-star"
              className="small-stars"
              src="/icons/quarterStar.png"
              alt="Quarter star"
            />
          );
        }
      }
      return (
        <img
          key={`unfilled-star-${i}`}
          className="small-stars"
          src="/icons/unfilledStar.png"
          alt="Unfilled star"
        />
      );
    });
    return starImages;
  };

  return <div className="stars-container">{getStarImages()}</div>;
}
