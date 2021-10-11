import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { getUsers } from "./redux/actions/user";
import { getQuestions } from "./redux/actions/question";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Question from "./pages/Question";
import NewQuestion from "./pages/NewQuestion/NewQuestion";
import Logout from "./components/Logout";
import Register from "./pages/Register/Register";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <Router>
      <Route
        path={["/home", "/add", "/leaderboard", "/questions/:questionId"]}
        render={(props) => <NavBar {...props} user={user} />}
      />
      <Switch>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/add" component={NewQuestion} />
        <ProtectedRoute exact path="/leaderboard" component={LeaderBoard} />
        <ProtectedRoute
          exact
          path="/questions/:questionId"
          component={Question}
        />
        <ProtectedRoute exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
