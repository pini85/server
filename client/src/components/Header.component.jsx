import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from './StripeWrapper.component';

const Header = ({ auth }) => {
  console.log(auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login In With Google</a>
          </li>
        );

      default:
        return (
          <>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
            <li>Credits:{auth.credits}</li>
            <li>
              <StripeWrapper />
            </li>
          </>
        );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
          Emaily
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};
const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps, null)(Header);
