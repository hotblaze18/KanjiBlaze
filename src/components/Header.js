import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser, signOutUser } from "../actions/user.action";
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
    dropdown.classList.toggle('visible');
  }

  toggleLevelsDropdown() {
    const dropdown = document.querySelector('.levels_dropdown_grid');
    dropdown.classList.toggle('visible');
  }

  toggleRadicalDropdown() {
    const dropdown = document.querySelector('#radical_dropdown');
    dropdown.classList.toggle('visible');
  }

  toggleKanjiDropdown() {
    const dropdown = document.querySelector('#kanji_dropdown');
    dropdown.classList.toggle('visible');
  }

  toggleVocabDropdown() {
    const dropdown = document.querySelector('#vocab_dropdown');
    dropdown.classList.toggle('visible');
  }

  renderLevelDropdownGrid() {

    const items = [];
    
    for(let i=1; i<=60; i++) {
      items.push(<Link key={i} to={`/levels/${i}`}>{i}</Link>)
    }

    return (
    <div className="levels_dropdown_grid dropdown shadow-sm" style={{background: "#666"}}>
      {items}              
    </div>
    )
  }

  renderDropdown(type) {
    let bg,id;
    if(type === "radical") {
      bg = "#00AAFF";
      id = "radical_dropdown"
    } else if(type === "kanji") {
      bg="#FF00AA";
      id = "kanji_dropdown";
    } else {
      bg="#AA00FF"
      id = "vocab_dropdown"
    }

    return(
      <div id={id} class="main_dropdown dropdown" style={{background: bg}}>
        <Link to={`${type}/levels/1-10`}>
            <span className="p-2 mr-4"  lang="ja">快 <span className="ml-2" lang="en">Pleasant</span></span>
            <span className="p-2">Levels 01-10</span>    
        </Link>
        <Link to={`${type}/levels/11-20`}>
            <span className="p-2 mr-4" lang="ja">苦 <span className="ml-2" lang="en">Painful</span></span>
            <span className="p-2">Levels 11-20</span>
        </Link>
        <Link to={`${type}/levels/21-30`}> 
            <span className="p-2 mr-4" lang="ja">死 <span className="ml-2" lang="en">Death</span></span>
            <span className="p-2">Levels 21-30</span>
        </Link>
      <Link to={`${type}/levels/31-40`}>
          <span className="p-2 mr-4" lang="ja">地獄 <span className="ml-2" lang="en">Hell</span></span>
          <span className="p-2">Levels 31-40</span>    
      </Link>
      <Link to={`${type}/levels/41-50`}>
          <span className="p-2 mr-4" lang="ja">天国 <span className="ml-2" lang="en">Paradise</span></span>
          <span className="p-2">Levels 41-50</span>
      </Link>
      <Link to={`${type}/levels/51-60`}>  
          <span className="p-2 mr-4" lang="ja">現実 <span className="ml-2" lang="en">Reality</span></span>
          <span className="p-2">Levels 51-60</span>    
    </Link>
 </div>
    );
  }

  signOut() {
    this.props.signOutUser("/");
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
              <button onClick={this.toggleLevelsDropdown} className="dropdownBtn btn-outline hover:border-gray-300 hover:text-gray-700">
                Levels
              </button>
              {this.renderLevelDropdownGrid()}
            </li>
            <li>
              <button onClick={this.toggleRadicalDropdown} className="dropdownBtn btn-outline hover:border-primary hover:text-primary">
                Radicals
              </button>
              {this.renderDropdown("radical")}
            </li>
            <li>
              <button onClick={this.toggleKanjiDropdown} className="dropdownBtn btn-outline hover:border-secondary hover:text-secondary">
                Kanji
              </button>
              {this.renderDropdown("kanji")}
            </li>
            <li>
              <button onClick={this.toggleVocabDropdown} className="dropdownBtn btn-outline hover:border-tertiary hover:text-tertiary">
                Vocabulary
              </button>
              {this.renderDropdown("vocab")}
            </li>
            <li className="relative">
              <button onClick={this.toggleProfileDropdown} id="profileBtn" className="bg-tertiary dropdownBtn">
                {this.props.user.name.slice(0, 1).capitalize()}
              </button>
              <ul className="profile-dropdown dropdown">
                <li>Profile</li>
                <li>Settings</li>
                <li onClick={() => this.signOut()}>Sign out</li>
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
          <Link to={this.props.user.isLoggedIn ? "/dashboard" : "/"} className="text-secondary font-bold text-3xl">KanjiBlaze</Link>
        </div>
        {this.renderNav()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser, performUpdatesInQueue, signOutUser })(
  Header
);
