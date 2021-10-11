import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Question.css";

const Question = ({ question, author }) => {
  return (
    <div className="question__container">
      <div className="question__header">{`${author.name} asks:`}</div>
      <div className="question__body">
        <div className="body__img">
          <img
            src={author.avatarURL}
            alt="avatar"
            className="rounded-circle border"
          />
        </div>
        <div
          className="p-3 flex-fill"
          style={{ borderLeft: "solid thin rgba(0,0,0,.15)" }}
        >
          <span className="small font-italic">
            {moment(question.timestamp).format("DD/MM/YYYY")}
          </span>
          <div className="lead" style={{ fontWeight: "600" }}>
            Would you rather...
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Link to={`/questions/${question.id}`}>
              <button className="btn btn-primary w-100">View Poll</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    timestamp: PropTypes.number,
    id: PropTypes.string,
  }),
  author: PropTypes.shape({
    name: PropTypes.string,
    avatarURL: PropTypes.string,
  }),
};

export default Question;
