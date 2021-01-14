import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SessionDetails from './SessionDetails';
import './style/YourCourseList.css';

import axiosClient from '../axiosClient';

class YourCourseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sections: []
		};
	}

	componentDidMount() {
    this.getSections();
	}

  //This function ensures that the sections displayed in the user's "Your Courses" list reflects
  //the courses they are signed up for. It gets eecuted when the handleRefresh function in the parent
  //component is called.
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getSections();
    }
  }

  //This endpoint returns all the sections that the user is signed up for. If the user is not signed
  //up for any courses, this.state.sections will have an empty list and a message indicating this will appear
  //on the UI.
  getSections() {
    var username = this.props.user;

		axiosClient.post('/coursesection/getCourseSectionsWithUser', { user: username})
		.then((response) => {
      this.setState({
        sections: response.data.courseSections
      });
		})
		.catch((error) =>  {
			console.log(error);
		});
  }

	render() {

		return (
			<div>
      { this.state.sections.length === 0 ? <div>You have not signed up for any courses yet.</div> : null }
			{ this.state.sections.map((section, id ) =>
				<Accordion key={id} square={true}>
	        <AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel1a-content"
	          id="panel1a-header"
	        >
	          <Typography className='accordion-heading'>{section["course-section_courseName"].toUpperCase()} - {section["course-section_nickname"]} - {section["course-section_startDate"]}</Typography>
	        </AccordionSummary>
	        <AccordionDetails>
              <SessionDetails courseId={section["course-section_courseId"]} showSessionContent={true} />
	        </AccordionDetails>
	      </Accordion>
			)}
	    </div>
		);
	}
}

export default YourCourseList
