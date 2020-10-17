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
    <div id="signupform">
    <form onSubmit={(e) => submitForm(e)} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Name
      </label>
      <input name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name" type="text" placeholder="Name" />
    </div>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Email" />
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input name="password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
    </div>
    <div class="flex items-center justify-between">
      <button class=" bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
        Sign Up
      </button>
    </div>
  </form>
    </div>
  );
};

export default connect(null, { signUpUser })(SignupUser);
