import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container ">

      {/* ================= PYRAMID ================= */}

      <div className="pyramid-loader">

        <div className="wrapper">

          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>

          <span className="side side5"></span>
          <span className="side side6"></span>
          <span className="side side7"></span>
          <span className="side side8"></span>

          <span className="shadow"></span>

        </div>

      </div>

      {/* ================= LOADING TEXT ================= */}

      <div className="loading-message">

        <p className="loading-text normal-text">
          Loading<span className="dots">...</span>
        </p>

        <p className="loading-text hover-text">
          Almost there<span className="dots">...</span>
        </p>

      </div>

    </div>
  );
};

export default Loader;