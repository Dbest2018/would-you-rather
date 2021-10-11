import React from "react";
import PropTypes from "prop-types";

import "./ScoreCard.css";

const ScoreCard = ({ user }) => {
  return (
    <div className="scoreCard">
      <div className="scoreCard__left">
        <img
          src={user.avatarURL}
          alt="avatar"
          className="rounded-circle border"
        />
      </div>
      <div className="scoreCard__middle">
        <div className="mb-3 mt-2">
          <h5>{user.name}</h5>
        </div>
        <div
          className="d-flex flex-row mb-2 mt-2 pb-3"
          style={{ borderBottom: "solid thin rgba(0, 0, 0, .15)" }}
        >
          <div className="flex-fill">Answered questions</div>
          <div>{user.totalAnswered}</div>
        </div>
        <div className="d-flex flex-row mb-2 mt-2">
          <div className="flex-fill">Created questions</div>
          <div>{user.totalQuestions}</div>
        </div>
      </div>
      <div className="scoreCard__right">
        <div className="right__top">Score</div>
        <div className="border rounded-circle text-center bg-primary text-white bold right__bottom">
          {user.totalAnswered + user.totalQuestions}
        </div>
      </div>
    </div>
  );
};

ScoreCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatarURL: PropTypes.string,
    totalAnswered: PropTypes.number,
    totalQuestions: PropTypes.number,
  }),
};

export default ScoreCard;
