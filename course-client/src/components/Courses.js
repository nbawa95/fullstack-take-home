import React, { Component } from 'react';
import UpcomingCourseList from './UpcomingCourseList';
import YourCourseList from './YourCourseList';
import './style/Course.css';

class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refresh: true
		};
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	//The setState call in this function is passed as a prop down to the SectionDetails component
	//in order to update the "Your Courses" list and "Upcoming Courses" list when a user signs up
	//for a section.
	handleRefresh() {
		var toggleRefresh = this.state.refresh;
		this.setState({
			refresh: !toggleRefresh
		});
	}

	render() {
		return (
			<>
				<h1>WELCOME {this.props.user.username}! </h1>
				<div className="course-list">
					<h2>Your Courses</h2>
					<YourCourseList user={this.props.user.username} />
				</div>
				<br />
				<div className="course-list">
					<h2>Upcoming Courses</h2>
					<UpcomingCourseList user={this.props.user.username} refresh={this.handleRefresh}/>
				</div>
			</>
		);
	}
}

export default Courses
