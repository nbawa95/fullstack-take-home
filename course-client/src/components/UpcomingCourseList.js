import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SectionDetails from './SectionDetails';

import './style/UpcomingCourseList.css';

import axiosClient from '../axiosClient';


class UpcomingCourseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: []
		};
	}

	componentDidMount() {
			this.getCourses();
	}

	getCourses() {
		axiosClient.get('/course/getCourses')
			.then((response) => {
				if (response.data != null) {
          this.setState({
            courses: response.data.courses
          });
				}
			})
			.catch((error) => {
        console.log(error);
      });
	}

	//For each course an accordion component is created that contains the section details in the
	//accordion body.
	render() {
		return (
			<>
			<div>
			{this.state.courses.map((course, id ) =>
				<Accordion key={id} square={true}>
	        <AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel1a-content"
	          id="panel1a-header"
	        >
	          <Typography className="accordion-heading">{course.name.toUpperCase()}</Typography>
	        </AccordionSummary>
	        <AccordionDetails>
						<SectionDetails courseId={course.id} user={this.props.user} refresh={this.props.refresh}/>
	        </AccordionDetails>
	      </Accordion>
			)}
	    </div>
			</>
		);
	}
}

export default UpcomingCourseList
