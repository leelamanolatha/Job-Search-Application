import React from "react";
import "./App.css";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Routes from "./Routes";
import Footer from "./components/Footer";
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<div className="App">
					<Routes />
					<Footer />
				</div>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
