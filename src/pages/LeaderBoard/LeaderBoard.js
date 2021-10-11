import React from "react";
import { useSelector } from "react-redux";

import "./LeaderBoard.css";
import ScoreCard from "../../components/ScoreCard/ScoreCard";

const LeaderBoard = () => {
  const users = useSelector((state) =>
    state.users && state.users.users
      ? Object.values(state.users.users)
          .map((user) => {
            user.totalQuestions = user.questions.length;
            user.totalAnswered = Object.keys(user.answers).length;
            return user;
          })
          .sort(
            (a, b) =>
              b.totalQuestions +
              b.totalAnswered -
              (a.totalQuestions + a.totalAnswered)
          )
      : []
  );
  const { loading } = useSelector((state) => state.questions);
  return (
    <div className="leaderBoard__container">
      <div className="leaderBoard">
        {loading ? (
          <div className="spinner-border" />
        ) : (
          users.map((user) => <ScoreCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
