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

  renderNav = () => {
    if (this.props.user.isLoggedIn) {
      return (
        <nav id="nav-main" className="md:block md:self-center mr-4">
          <ul className="flex text-gray-600">
            <li>
              <Link className="btn-outline hover:border-gray-300 hover:text-gray-700">
                Levels
              </Link>
            </li>
            <li>
              <Link className="btn-outline hover:border-primary hover:text-primary">
                Radicals
              </Link>
            </li>
            <li>
              <Link className="btn-outline hover:border-secondary hover:text-secondary">
                Kanji
              </Link>
            </li>
            <li>
              <Link className="btn-outline hover:border-tertiary hover:text-tertiary">
                Vocabulary
              </Link>
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
