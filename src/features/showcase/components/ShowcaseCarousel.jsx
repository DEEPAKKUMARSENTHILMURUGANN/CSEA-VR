import React from "react";

export default function ShowcaseCarousel({
  items,
  active,
  calculation,
  onNext,
  onPrev,
  onIndicatorClick,
  onExplore
}) {
  return (
    <section className="carousel" style={{ "--calculation": calculation }}>
      <div className="list">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`item ${idx === active ? "active" : ""} ${item.isStraightFloat ? "straight-float" : ""}`}
          >
            <figure>
              <img src={item.img} alt={item.title} />
            </figure>
            <div className="content">
              <p className="category">{item.category}</p>
              <h2>{item.title}</h2>
              <p className="description">{item.description}</p>
              <div className="more">
                <button onClick={() => onExplore(item.targetRoute)}>
                  <i className="fa-solid fa-arrow-right"></i> Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="arrows">
        <button id="prev" onClick={onPrev} aria-label="Previous Slide">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button id="next" onClick={onNext} aria-label="Next Slide">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Indicators */}
      <div className="indicators">
        <div className="number">0{active + 1}</div>
        <ul>
          {items.map((_, idx) => (
            <li
              key={idx}
              className={idx === active ? "active" : ""}
              onClick={() => onIndicatorClick(idx)}
            ></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
