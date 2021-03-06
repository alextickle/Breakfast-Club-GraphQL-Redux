import types from './types';

const initialState = {
	editIcon: '../Images/edit.png',
	readOnly: true,
	title: 'edit',
	header: 'Edit Profile',
	firstName: '',
	lastName: '',
	neighborhood: ''
};

const userProfile = (state = initialState, action) => {
	let temp = {};
	let fieldName;
	let user;
	switch (action.type) {
		case types.SET_INITIAL_USER_DATA:
			user = action.user;
			return Object.assign({}, state, {
				firstName: user.firstName,
				lastName: user.lastName,
				neighborhood: user.neighborhood
			});
		case types.SET_SAVE_STATE:
			temp = action.data;
			return Object.assign({}, state, temp);
		case types.SET_EDIT_ICON_LINK:
			return Object.assign({}, state, { editIcon: action.link });
		case types.UPDATE_USER_DATA:
			fieldName = action.field;
			temp[fieldName] = action.value;
			return Object.assign({}, state, temp);
		default:
			return state;
	}
};

export default userProfile;
