import React from "react";

const styles= {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "40px",
  }

}

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a style={styles.nav} className="navbar-brand" href="/">
        React Google Books
      </a>
      <a style={styles.nav} className="navbar-brand" href="/books">
        Books
      </a>
      <a className="navbar-brand" href="/saved">
        Saved Books
      </a>
    </nav>

  );
}

export default Nav;
