//CurrentEvent fetches data from EventStore,userStore
//CurrentEvent passes props to EventDetail

import React, {Component} from 'react';
import eventStore from '../stores/EventStore';
import userStore from '../stores/UserStore';
import EventDetail from '../components/EventDetail';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

class CurrentEvent extends Component {
  constructor(props){
    super(props)
    this.state= {
      event: eventStore.getCurrentEvent(),
      user: userStore.getUser(),
      rsvp: this.checkIfAttending(userStore.getUser().id, eventStore.getCurrentEvent().guestLists),
      message: 'message'
    }
  }

  checkIfAttending(user_id, guestLists){
    let toReturn = false;
    for (var i = 0; i < guestLists.length; i++){
      if (user_id === guestLists[i].user_id){
        return true;
      }
    }
    return toReturn;
  }

  componentWillMount(){
    eventStore.on('vote registered', this.voteRegistered.bind(this));
    eventStore.on('rsvp', this.rsvpRegistered.bind(this));
    eventStore.on('votes counted', this.votesCounted.bind(this));
  }

  voteRegistered(){
    this.setState({
      event: eventStore.getCurrentEvent(),
      user: userStore.getUser(),
      message: "Vote Registered",
      rsvp: false
    })
  }

  votesCounted(){
    this.setState({
      event: eventStore.getCurrentEvent()
    })
  }

  rsvpRegistered(){
    this.setState({
      event: eventStore.getCurrentEvent(),
      user: userStore.getUser(),
      message: "RSVP'd",
      rsvp: true
    })
  }

  render(){
      return (
        <div className="wrapper">{/* //this is the flex container */}
            <SideBar />{/* //this is a flex item  with a nested flex container */}
          <div className='event-page'>{/* //this is a flex item */}
            <div className='nested'>{/* //this is a nested flex container */}
            <Header />
          <p>{this.state.message}</p>
          <EventDetail voted={this.state.user.voted} rsvp={this.state.rsvp} user={this.state.user} eventData={this.state.event} winner={this.state.event.event.winner} />
            </div>
          </div>
        </div>
        );
      }
  }
export default CurrentEvent;