import React, { useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import serializeForm from "form-serialize";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { addUser } from "../../redux/actions/user";

const Register = ({ history }) => {
  const [error, setError] = useState({});
  const [image, setImage] = useState("");
  const { registering } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name } = e.target;
    const errors = { ...error };
    delete errors[name];
    setError(errors);
  };

  const onPickImage = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    if (!values.name || values.name.trim() === "") {
      setError({
        ...error,
        name: "Full name is required.",
      });
      return;
    }
    if (!image) {
      setError({
        ...error,
        name: "Profile picture is required.",
      });
      return;
    }
    values.avatarURL = image;
    dispatch(addUser(values)).then(() => history.replace("/"));
  };

  return (
    <div className="register__container">
      <div className="register">
        <form onSubmit={onSubmit}>
          <div className="register__header">Enter your details to register</div>
          <div className="register__body">
            <div className="body__left">
              <label htmlFor="avatarURL">
                <img
                  src={image ? image : "images/user.png"}
                  alt=""
                  className="rounded-circle border"
                  style={{ width: "80px", height: "80px" }}
                />
              </label>
              <input
                type="file"
                name="avatarURL"
                id="avatarURL"
                onChange={onPickImage}
                className="d-none"
              />
            </div>
            <div className="body__right">
              {error.name && (
                <div className="body__righttext">{error.name}</div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="form-control"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt-2">
                <button
                  className="btn btn-primary w-100"
                  disabled={registering}
                >
                  {registering ? <div /> : "Register"}
                </button>
              </div>
              <div className="pt-3 pb-3">
                Or <Link to="/">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }),
};

export default Register;
