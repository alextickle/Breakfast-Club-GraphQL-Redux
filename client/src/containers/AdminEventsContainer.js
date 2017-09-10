import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import eventsQuery from '../queries/eventsQuery';
import AdminEvents from '../components/Admin/AdminEvents';
import adminOperations from '../state/ducks/admin/operations';

const mapStateToProps = state => ({
	date: state.adminOperations.date,
	speaker: state.adminOperations.speaker
});

const mapDispatchToProps = {
	openModal: adminOperations.openModal,
	closeModal: adminOperations.closeModal,
	updateSearchTerm: adminOperations.updateSearchTerm,
	updateFieldValue: adminOperations.updateFieldValue
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(eventsQuery)
)(AdminEvents);
