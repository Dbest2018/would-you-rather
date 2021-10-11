import React, { useState } from "react";
import "./NewQuestion.css";

import serializeForm from "form-serialize";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { saveQuestion } from "../../redux/actions/question";

const NewQuestion = ({ user, history }) => {
  const dispatch = useDispatch();
  const { requesting } = useSelector((state) => state.questions);
  const [error, setError] = useState({});

  const onChange = (e) => {
    const { name } = e.target;
    const errors = { ...error };
    delete errors[name];
    setError(errors);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    if (!values.optionOneText || values.optionOneText.trim() === "") {
      setError({
        ...error,
        optionOneText: "Option one text is required",
      });
      return;
    }
    if (!values.optionTwoText || values.optionTwoText.trim() === "") {
      setError({
        ...error,
        optionTwoText: "Option two text is required",
      });
      return;
    }
    dispatch(saveQuestion({ ...values, author: user })).then(() =>
      history.push("/home")
    );
  };

  return (
    <div className="newQuestion__container">
      <div className="newQuestion">
        <div className="newQuestion__header">Create New Question</div>
        <div className="newQuestion__body">
          <form onSubmit={onSubmit}>
            <div className="pb-2 pt-4 p-3">Complete the question</div>
            <div className="bold pt-2 pb-2 p-3">Would you rather ...</div>
            <div style={{ textAlign: "center" }} className="p-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter option one"
                  name="optionOneText"
                  onChange={(e) => onChange(e)}
                />
              </div>
              {error.optionOneText && (
                <div className="text-danger">{error.optionOneText}</div>
              )}
              <div className="mb-3 mt-3">OR</div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter option two"
                  name="optionTwoText"
                  onChange={(e) => onChange(e)}
                />
              </div>
              {error.optionTwoText && (
                <div className="text-danger">{error.optionTwoText}</div>
              )}
              <div className="mt-2">
                <button className="btn btn-primary w-100" disabled={requesting}>
                  {requesting ? <div className="spinner-border" /> : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

NewQuestion.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }),
};

export default NewQuestion;
