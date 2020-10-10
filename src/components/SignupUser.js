import React from "react";
import { signUpUser } from "../actions/user.action";
import { connect } from "react-redux";
import Header from "./Header";

const SignupUser = (props) => {
  const submitForm = (e) => {
    e.preventDefault();
    const name = e.target.elements["name"].value;
    const email = e.target.elements["email"].value;
    const password = e.target.elements["password"].value;
    props.signUpUser(name, email, password, "/dashboard");
  };

  return (
    <div>
      <Header />
      <form onSubmit={submitForm}>
        <div>
          <span>Name:</span>
          <input type="text" name="name" placeholder="ENTER NAME"></input>
        </div>
        <div>
          <span>Email:</span>
          <input type="email" name="email" placeholder="ENTER EMAIL"></input>
        </div>
        <div>
          <span>Passowrd:</span>
          <input
            type="password"
            name="password"
            placeholder="ENTER PASSWORD"
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default connect(null, { signUpUser })(SignupUser);
