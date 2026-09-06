import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderOverlay>
      <div className="loader-content">

        {/* Spinner */}
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>

        {/* Text */}
        <h2>Loading...</h2>

        <p>Please wait a moment</p>

        {/* Animated dots */}
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </LoaderOverlay>
  );
};

const LoaderOverlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #020a18;

  z-index: 50;

  overflow: hidden;

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .spinner {
    width: 90px;
    height: 90px;

    border-radius: 50%;

    border: 5px solid rgba(255, 255, 255, 0.08);

    border-top-color: #ffd21f;
    border-right-color: #ffb300;

    animation: spin 1s linear infinite;

    box-shadow:
      0 0 15px rgba(255, 210, 31, 0.4),
      0 0 35px rgba(255, 180, 0, 0.2);

    position: relative;
  }

  .spinner-inner {
    position: absolute;

    top: 10px;
    left: 10px;

    width: 60px;
    height: 60px;

    border-radius: 50%;

    border: 2px solid rgba(255, 210, 31, 0.15);

    animation: inner-spin 1.5s linear infinite reverse;
  }

  h2 {
    margin: 28px 0 6px;

    color: #ffffff;

    font-size: 25px;

    font-weight: 600;

    letter-spacing: 2px;
  }

  p {
    margin: 0;

    color: #9da7b8;

    font-size: 14px;

    letter-spacing: 1px;
  }

  .dots {
    display: flex;

    justify-content: center;
    align-items: center;

    gap: 8px;

    margin-top: 18px;
  }

  .dots span {
    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: #ffd21f;

    box-shadow:
      0 0 8px rgba(255, 210, 31, 0.8);

    animation: bounce 1.2s infinite ease-in-out;
  }

  .dots span:nth-child(1) {
    animation-delay: 0s;
  }

  .dots span:nth-child(2) {
    animation-delay: 0.15s;
  }

  .dots span:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes inner-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }

    30% {
      transform: translateY(-6px);
      opacity: 1;
    }
  }
`;

export default Loader;