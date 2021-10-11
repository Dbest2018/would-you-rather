import React, { useState } from "react";
import "./Poll.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import serialize from "form-serialize";

import Answer from "../Answer";
import { saveAnswer } from "../../redux/actions/question";

const Poll = ({ question, author, answered, user, questionId }) => {
  const voters = useSelector((state) =>
    state.users && state.users.users ? Object.keys(state.users.users).length : 0
  );
  const loading = useSelector((state) => state.questions.loading);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onChange = () => {
    setError("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const values = serialize(e.target, { hash: true });
    if (!values.option) {
      setError("Select an option");
      return;
    }

    dispatch(
      saveAnswer({
        authedUser: user,
        qid: questionId,
        answer: values.option,
      })
    );
  };

  return (
    <div className="poll__container">
      <div className="poll">
        <div
          className="p-3 lad"
          style={{
            backgroundColor: "#f2f2f2",
            fontWeight: "600",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >{`${author.name} asks:`}</div>
        <div className="d-flex flex-row" style={{ alignItems: "center" }}>
          <div className="p-4">
            <img
              src={author.avatarURL}
              alt="avatar"
              className="rounded-circle border"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
          <div
            className="p-3 flex-fill"
            style={{ borderLeft: "solid thin rgba(0, 0, 0, .15)" }}
          >
            {answered() ? (
              <Answer question={question} voters={voters} user={user} />
            ) : (
              <form onSubmit={onSubmit}>
                <div className="lead" style={{ fontWeight: "600" }}>
                  Would you rather...
                </div>
                <div className="mt-3">
                  <div className="form-check">
                    <span className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="option"
                        value="optionOne"
                        onChange={onChange}
                      />
                      {question.optionOne ? question.optionOne.text : ""}
                    </span>
                  </div>
                  <div className="form-check">
                    <span className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="option"
                        value="optionTwo"
                        onChange={onChange}
                      />
                      {question.optionTwo ? question.optionTwo.text : ""}
                    </span>
                  </div>
                </div>
                {error && <div className="text-danger align-left">{error}</div>}
                <div style={{ paddingTop: "20px" }}>
                  <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Poll.propTypes = {
  question: PropTypes.shape({
    optionOne: PropTypes.shape({ text: PropTypes.string }),
    optionTwo: PropTypes.shape({ text: PropTypes.string }),
  }),
  author: PropTypes.shape({
    name: PropTypes.string,
    avatarURL: PropTypes.string,
  }),
  answered: PropTypes.func.isRequired,
  user: PropTypes.string,
  questionId: PropTypes.string,
};

export default Poll;
