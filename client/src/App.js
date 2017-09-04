import React from 'react';
import {
	ApolloClient,
	ApolloProvider,
	createNetworkInterface
} from 'react-apollo';
import MainContainer from './containers/MainContainer';
import initStore from './state/store';
import PathConfig from './config/PathConfig';

const store = initStore();

const networkInterface = createNetworkInterface({
	uri: `${PathConfig.serverDomain()}graphql`
});

const client =
	process.env.NODE_ENV === 'development'
		? new ApolloClient({
				networkInterface: networkInterface
			})
		: new ApolloClient();

const App = () =>
	<ApolloProvider store={store} client={client}>
		<MainContainer />
	</ApolloProvider>;

export default App;
