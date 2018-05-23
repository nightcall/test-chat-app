import React from 'react';
import './CreateRoomComponent.scss';
import { connect } from 'react-redux';
import { createRoom } from './../actions/index';

class CreateRoomComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { usersList, closeComponent } = this.props;

    return (
      <div id='create-room-comp'>
        <div class='flex-col'>
          <h1>Create a new room <strong style={{cursor: 'pointer', color: 'red'}}
          onClick={closeComponent} >X Close</strong></h1>
          <div class='flex-row' >
            <div>
              <form onSubmit={(e) => e.preventDefault()} >
                <input type='text' placeholder='Name of the room' /><br />
                <input type='text' placeholder='Participants' /><br />
                <textarea /><br />
                <button>Create</button>
              </form>
            </div>
            <div>{usersList.map(u => <p>+ {u.name}</p>)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersList: state.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCreateRoom: () => dispatch(createRoom()) // A MODIFIER
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomComponent);