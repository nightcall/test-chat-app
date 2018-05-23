import React from 'react';
import './CreateRoomComponent.scss';
import { connect } from 'react-redux';
import { createRoom } from './../actions/index';
import CreateRoomUsersList from './CreateRoomUsersList';

class CreateRoomComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: '',
      participants: [],
      content: ''
    };
  }

  handleFormChange = e => this.setState({[e.target.name]: e.target.value});

  addParticipant = (participant) => {
    this.setState({participants: [...this.state.participants, participant]});
  }

  submitCreateRoom = (e) => {
    e.preventDefault();

    const {
      closeComponent,
      handleCreateRoom
    } = this.props;
    const {
      roomName,
      participants,
      content
    } = this.state;

    // tests
    if(!roomName.length || !participants.length || !content.length) {
      console.log('Invalid room');
      return;
    }

    // create room
    handleCreateRoom(roomName, participants, content);
    // toggle Createroomcomponent
    closeComponent();
  }

  render() {
    const { usersList, closeComponent } = this.props;
    const { roomName, participants, content } = this.state;

    return (
      <div id='create-room-comp'>
        <div class='flex-col'>
          <h1>Create a new room <strong style={{cursor: 'pointer', color: 'red'}}
          onClick={closeComponent} >X Close</strong></h1>
          <div class='flex-row' >
            <div>
              <form onSubmit={this.submitCreateRoom} >
                <input type='text' placeholder='Name of the room' value={roomName}
                  name='roomName' onChange={this.handleFormChange} /><br />
                <p>{participants.map(p => <strong>{p.name}, </strong>)}</p><br />
                <textarea name='content' onChange={this.handleFormChange} value={content} /><br />
                <button>Create</button>
              </form>
            </div>
            <div><CreateRoomUsersList filter={participants} addParticipant={this.addParticipant} /></div>
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
    handleCreateRoom: (name, participants, content) => dispatch(createRoom(name, participants, content)) // A MODIFIER
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomComponent);