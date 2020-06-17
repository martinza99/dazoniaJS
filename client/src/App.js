import React from 'react';
import './App.css';
import Navbar from "./componets/navbar";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };
	}

	callAPI() {
		fetch("/api/test")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }));
	}


	componentDidMount() {
		this.callAPI();
	}

	render() {
		return (
			<div className="App">
				<Navbar />
				<p>{this.state.apiResponse}</p>
			</div>
		);
	}
}

export default App;
