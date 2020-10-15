import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "../actions/user.action";
import { performUpdatesInQueue } from "../actions/updates.action";

class Header extends React.Component {
  componentDidMount() {
    if (!this.props.user.isLoggedIn) this.props.fetchUser("/login");
    else this.props.performUpdatesInQueue();
  }

  mainMenuRef = React.createRef();

  toggleMenu() {
    const mainMenu = this.mainMenuRef.current;
    if(mainMenu.style.width === "0px") {
      mainMenu.style.width = "200px";
    } else {
      mainMenu.style.width = "0px";
    }
  }

  renderNav = () => {
    if (this.props.user.isLoggedIn) {
      return (
        <nav id="nav-main" className="self-center mr-4">
          <button onClick={() => this.toggleMenu()} id="nav-toggle" className="block md:hidden">
            <i className="fa fa-bars text-gray-400" aria-hidden="true"></i>
          </button>
          <ul ref={this.mainMenuRef} className="flex text-gray-600">
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
          </ul>
        </nav>
      );
    } else {
      return (
        <div className="self-center text-gray-600">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="bg-white h-20 w-full flex justify-between shadow-md mb-4">
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
