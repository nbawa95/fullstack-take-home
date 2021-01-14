import React, { Component } from 'react';
import SessionDetails from './SessionDetails';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './style/SectionDetails.css'

import axiosClient from '../axiosClient';

class SectionDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sections: []
		};
		this.getSections = this.getSections.bind(this);
    this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {

    this.getSections();

	}

  //This function make a request to get all the sections that the user is not signed up for. The response is
  //filtered to only keep the sections which have an upcoming start date. Ideally I would want to include
  //the upcoming date filter in the query itself, but I experienced some issues with filtering on this
  //column in the query so for the purpose of this assignment I did the filtering once the response was
  //received.
  getSections() {
    var courseId = this.props.courseId;
    var username = this.props.user;

    axiosClient.post('/coursesection/getCourseSectionWithoutUser', { user: username, courseId: courseId})
    .then((response) => {
      var sections = response.data.courseSections;
      sections = sections.filter((section) => section["course-section_startDate"] > new Date().toISOString());
      this.setState({
        sections: sections
      });
    })
    .catch((error) =>  {
      console.log(error);
    });
  }

  //This function is triggered when the user clicks the "Sign Up" button. The usesr is added to the list of
  //participants for the particular section and it is updated in the database.
	handleClick(id, participants) {
    participants.push(this.props.user);

    axiosClient.post('/coursesection/updateSectionParticipants', { participants: participants, id: id})
		.then((response) => {
      this.getSections()
			this.props.refresh();
		})
		.catch((error) =>  {
			console.log(error);
		});
	}

  //Depending on the number of participants for each section, a clickable button or disabled button will be
  //rendered to indicate to the user that the section is open/closed. Session details for each section are
  //rendered by passing the course id as a prop to the SessionDetails component.
	render() {

		return (
			<div>
        { this.state.sections.map((section, id) =>
          <div className='section-details-container' key={id}>
            <div className="section-details-heading">
              {section["course-section_nickname"]} - {section["course-section_startDate"]}
              { section["course-section_participants"].length >= 5 ?
                <Button variant="contained" disabled>
                  FULL
                </Button> :
                <Button data-testid="signUpButton" variant="contained" color="primary" onClick={() => this.handleClick(section["course-section_id"], section["course-section_participants"])}>
                  SIGN UP
                </Button>}
            </div>
            <SessionDetails courseId={section["course-section_courseId"]} showSessionContent={false} />
            <Divider variant="inset" component="ul" />
          </div>
        )}
	    </div>
		);
	}
}

export default SectionDetails
