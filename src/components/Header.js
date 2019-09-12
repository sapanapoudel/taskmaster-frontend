import React from "react";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="p-3 mb-2 bg-info text-white">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Taskmaster</span>
        </nav>
        <p class="text-justify">Make yourself useful!</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
