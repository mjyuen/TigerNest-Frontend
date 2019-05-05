import React from 'react'
import { Navbar, NavLink } from 'reactstrap';

class Nav extends React.Component {
  //const history = createMemoryHistory();

  constructor(props) {
    super(props);
  }

  handleLogout=() => {
    if (process.browser) {
    localStorage.removeItem("token");
    localStorage.removeItem("eligibility");
    }
    Router.push("/");
  }

  render() {
    return (
  <Navbar color="light" light expand="md">
    <ul>
      <li>
        <NavLink href="/">
          <a>Home</a>
        </NavLink>
      </li>
      <li>
        <NavLink href="/" onClick={this.handleLogout}>
          <a>Logout</a>
        </NavLink>
      </li>
    </ul>
    <style jsx>{`
      :global(body) {
        margin: 0;
        background: url("/static/background.jpg");
        background-size: cover;

        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </Navbar>
    )
  }
}


export default Nav
