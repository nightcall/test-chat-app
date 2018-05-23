import React from 'react';
import { connect } from 'react-redux';
import editImage from './img/edit.png';

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user
    } = this.props;

    return(
      <div id='profile-component'>
        <p>Connected as {user.name} <img src={editImage} alt='edit' /></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ProfileComponent);