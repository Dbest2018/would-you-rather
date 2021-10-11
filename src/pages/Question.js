import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Poll from "../components/Poll/Poll";
import isEmpty from "../utils/isEmpty";
import NotFound from "../components/404";

const Question = ({ match, user }) => {
  const { questionId } = match.params;
  const question = useSelector((state) =>
    state.questions && state.questions.questions
      ? state.questions.questions[questionId] ?? {}
      : {}
  );

  const author = useSelector((state) =>
    state.users && state.users.users
      ? state.users.users[question.author] ?? {}
      : {}
  );

  const answered = () => {
    if (!isEmpty(question)) {
      return [
        ...question.optionOne.votes,
        ...question.optionTwo.votes,
      ].includes(user)
        ? true
        : false;
    }
    return false;
  };
  return (
    <div>
      {isEmpty(question) ? (
        <NotFound label="Poll not found" />
      ) : (
        <Poll
          question={question}
          author={author}
          answered={answered}
          user={user}
          questionId={questionId}
        />
      )}
    </div>
  );
};

Question.prototype = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      questionId: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({ search: PropTypes.string }),
  user: PropTypes.string.isRequired,
};

export default Question;
