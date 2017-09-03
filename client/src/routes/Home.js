import React from 'react';
// import SideBar from '../components/SideBar';
// import SideBarMini from '../components/SideBarMini';
import ReminderContainer from '../containers/ReminderContainer';
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';
// import Calendar from '../components/Calendar';

const Home = props => {
	return (
		<div className="wrapper">
			{/* //this is the flex container */}
			{/* <SideBar /> */}
			{/* //this is a flex item  with a nested flex container */}
			<div className="home-page">
				{/* //this is a flex item */}
				<div className="nested">
					{/* //this is a nested flex container */}
					{/* <SideBarMini /> */}
					<Header />
					<div className="welcome-message">
						<div className="reminder">
							<ReminderContainer />
						</div>
					</div>
					{/*<Calendar event={props.data.event} />*/}
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
