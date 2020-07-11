import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import StripeCheckout from 'react-stripe-checkout';

const StripeWrapper = (props) => {
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 survey credits"
      amount={500}
      token={(token) => props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    />
  );
};

export default connect(null, actions)(StripeWrapper);
