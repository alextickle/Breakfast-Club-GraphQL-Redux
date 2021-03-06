import React from 'react';
import SideBarContainer from '../containers/SideBarContainer';
import CalendarContainer from '../containers/CalendarContainer';
import SideBarMiniContainer from '../containers/SideBarMiniContainer';
import Reminder from '../components/Reminder';
import Header from '../components/Header';
import checkIfNewEventNeeded from '../helpers/checkIfNewEventNeeded';

const Home = props => {
	if (props.userQuery.loading || props.currentEventQuery.loading) {
		return <h1>Loading</h1>;
	}
	if (checkIfNewEventNeeded(props.currentEventQuery.currentEvent.date)) {
		props.addEvent();
	}
	return (
		<div className="wrapper">
			{<SideBarContainer />}
			<div className="home-page">
				<div className="nested">
					{<SideBarMiniContainer />}/
					<Header />
					<div className="welcome-message">
						<div className="reminder">
							<Reminder
								user={props.userQuery.user}
								event={props.currentEventQuery.currentEvent}
							/>
						</div>
					</div>
					<CalendarContainer event={props.currentEventQuery.currentEvent} />
				</div>
			</div>
			<img
				className="fruit-border"
				src="../Images/fruit-border.jpg"
				alt="fruit"
			/>
		</div>
	);
};

export default Home;
