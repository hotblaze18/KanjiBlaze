import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "../actions/user.action";
import { performUpdatesInQueue } from "../actions/updates.action";

class Header extends React.Component {
  componentDidMount() {
    if (!this.props.user.isLoggedIn) this.props.fetchUser("/dashboard","/");
    else this.props.performUpdatesInQueue();
  }

  mainMenuRef = React.createRef();

  toggleMenu() {
    const toggleIcon = document.getElementById("nav-toggle-icon");
    toggleIcon.classList.toggle("open");
    const mainMenu = this.mainMenuRef.current;
    mainMenu.classList.toggle("w-48");
    mainMenu.classList.toggle("visible");
  }

  toggleProfileDropdown() {
    const dropdown = document.querySelector('.profile-dropdown');
    dropdown.classList.toggle('profile-dropdown-visible');
  }

  renderNav = () => {
    if (this.props.user.isLoggedIn) {
      return (
        <nav id="nav-main" className="self-center mr-8">
          <button onClick={() => this.toggleMenu()} id="nav-toggle" className="block md:hidden">
          <div id="nav-toggle-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          </button>
          <ul id="main-menu" ref={this.mainMenuRef} className="flex text-gray-600 bg-white w-0 md:w-auto">
            <li>
              <button className="btn-outline hover:border-gray-300 hover:text-gray-700">
                Levels
              </button>
            </li>
            <li>
              <button className="btn-outline hover:border-primary hover:text-primary">
                Radicals
              </button>
            </li>
            <li>
              <button className="btn-outline hover:border-secondary hover:text-secondary">
                Kanji
              </button>
            </li>
            <li>
              <button className="btn-outline hover:border-tertiary hover:text-tertiary">
                Vocabulary
              </button>
            </li>
            <li className="relative">
              <button onClick={this.toggleProfileDropdown} id="profileBtn" className="bg-tertiary">
                {this.props.user.name.slice(0, 1).capitalize()}
              </button>
              <ul className="profile-dropdown">
                <li>Profile</li>
                <li>Settings</li>
                <li>Sign out</li>
              </ul>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div className="self-center text-gray-600 mr-4">
          <Link to="/signup" className="p-4 hover:text-gray-500">Sign Up</Link>
          <Link to="/login"  className="p-4 hover:text-gray-500">Login</Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="bg-white h-20 w-full flex justify-between shadow-md mb-4 z-10">
        <div className="self-center p-5">
          <Link className="text-secondary font-bold text-3xl">KanjiBlaze</Link>
        </div>
        {this.renderNav()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser, performUpdatesInQueue })(
  Header
);
