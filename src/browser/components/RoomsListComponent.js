import React from 'react';
import { connect } from 'react-redux';
import CreateRoomComponent from './CreateRoomComponent';

const RoomsListItem = ({name, lastMessageContent, lastMessageDate}) => (
  <div class='rooms-list-item'>
    <h4>{name}</h4>
    <p>{lastMessageContent}</p>
    <p>{lastMessageDate}</p>
  </div>
);


class RoomsListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateRoomComponentOpen: true
    };
  }

  toggleCreateRoom = () => this.setState({isCreateRoomComponentOpen: !this.state.isCreateRoomComponentOpen});

  render() {
    const { rooms } = this.props;
    const { isCreateRoomComponentOpen } = this.state;

    return(
      <div>
        {isCreateRoomComponentOpen ? <CreateRoomComponent closeComponent={this.toggleCreateRoom} /> : null}
        <p style={{cursor: 'pointer'}}
          onClick={this.toggleCreateRoom} >Create new room</p>
        {rooms.map(r => <RoomsListItem {...r} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  };
;}

export default connect(mapStateToProps)(RoomsListComponent);