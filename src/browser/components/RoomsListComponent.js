import React from 'react';
import { connect } from 'react-redux';
import './RoomsListComponent.scss';
import CreateRoomComponent from './CreateRoomComponent';
import { openRoom } from './../actions/index';

const RoomsListItem = ({name, lastMessageContent, lastMessageDate, onClick}) => (
  <div class='rooms-list-item' onClick={onClick} >
    <h4>{name}</h4>
    <p>{lastMessageContent}</p>
    <p>{lastMessageDate}</p>
  </div>
);


class RoomsListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateRoomComponentOpen: false
    };
  }

  toggleCreateRoom = () => this.setState({isCreateRoomComponentOpen: !this.state.isCreateRoomComponentOpen});

  render() {
    const { rooms, openRoom } = this.props;
    const { isCreateRoomComponentOpen } = this.state;

    return(
      <div>
        {isCreateRoomComponentOpen ? <CreateRoomComponent closeComponent={this.toggleCreateRoom} /> : null}
        <p style={{cursor: 'pointer'}}
          onClick={this.toggleCreateRoom} >Create new room</p>
        {rooms.map(r => <RoomsListItem onClick={() => openRoom(r._id)} {...r} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  };
;}

const mapDispatchToProps = dispatch => {
  return {
    openRoom: (id) => dispatch(openRoom(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsListComponent);