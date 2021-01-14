import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './style/SessionDetails.css';

import lines from './images/lines.png';

import axiosClient from '../axiosClient';

class SessionDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sessions: []
		};
	}

  //Since the sessions are unique to each course, the course id is passed to this component
  //as a prop to be used in the query to get the sessions.
	componentDidMount() {

    var courseId = this.props.courseId;

    axiosClient.post('/coursesession/getSessionsForCourse', { courseId: courseId})
    .then((response) => {
      this.setState({
        sessions: response.data.courseSessions
      });
    })
    .catch((error) =>  {
      console.log(error);
    });
  }

  //Since this component is used in both the "Your Courses" and "Upcoming Courses" sections, I made sure
  //to conditionally render the session content based on where this component was rendered. If the session
  //details were being shown in the "Your Courses" list, then the showSessionContent prop would be true. this
  //ensures that only users who have signed up for the course are able to view the session content.
	render() {

		return (
			<div>
      <List>
      { this.state.sessions.map((session, id) =>
        <div key={id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <img alt="list icon" style={{width:'50%'}} src={lines} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <div>
              <div className="session-details-name">
                {session.sessionNumber + ". " + session.name}
              </div>
              <div>
                {session.description}
              </div>
              </div>
            }
            secondary={
              <div>
                { this.props.showSessionContent ? <div>{session.content}</div> : <div>Sign up to view this session's content</div> }
              </div>
            }
          />
        </ListItem>
        </div>
      )}
      </List>
	    </div>
		);
	}
}

export default SessionDetails
