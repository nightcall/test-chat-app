import React from 'react';
import { connect } from 'react-redux';

class CreateRoomUsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addParticipant,
      filter,
      usersList
    } = this.props;

    return(
      <div>
        {usersList.filter(p => !filter.includes(p)).map(u => {
          return (
            <p style={{cursor: 'pointer'}} onClick={() => addParticipant(u)} >+ {u.name}</p>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersList: state.usersList
  };
};

export default connect(mapStateToProps)(CreateRoomUsersList);