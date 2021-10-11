import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import { loginUser } from "../../redux/actions/login";
import { Link } from "react-router-dom";

const Login = ({ history, location }) => {
  const [selectedItem, setSelectedItem] = useState({ name: "Select User" });
  const { user } = useSelector((state) => state.authUser);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const { referrer } = location && location.state ? location.state : "";
    if (user) {
      referrer ? history.push(referrer) : history.push("/home");
    }
  });

  const onSubmit = () => {
    dispatch(loginUser(selectedItem.id));
  };

  return (
    <div className="login__container">
      <div className="login">
        <div className="login__header">
          <div>
            <h5>Welcome to the Would You Rather App!</h5>
          </div>
          <div>Please sign in to continue</div>
        </div>
        <div className="login__sign_in">
          <h4>Sign in</h4>
        </div>
        <div className="login__dropdown">
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="transparent">
              {selectedItem.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {users
                ? Object.entries(users).map(([key, value]) => {
                    return (
                      <Dropdown.Item
                        key={key}
                        onClick={() => setSelectedItem(value)}
                      >
                        {value.name}
                      </Dropdown.Item>
                    );
                  })
                : null}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="login__button">
          <Button variant="primary" onClick={onSubmit}>
            Sign in
          </Button>
        </div>
        <div className="login__link">
          Or <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  location: PropTypes.shape({
    state: PropTypes.shape({ referrer: PropTypes.string }),
    search: PropTypes.string,
  }),
};

export default Login;
