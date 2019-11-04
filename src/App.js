import React from 'react';
import axios from 'axios';

import Select from './component/Select';


class App extends React.Component {
	state = {
		renderState: 0, // 0: Logo 1: Start 2: Popup 3: Home
		user_info: null, // { name, email, ... }
		user_type: null // none, host, target
	};

	nextPage = () => {
		this.setState(prevState => ({
			renderState: prevState.renderState + 1
		}));
	}

	backPage = () => {
		this.setState(prevState => ({
			renderState: prevState.renderState - 1
		}));
	}

	componentDidMount() {
		axios.post('http://localhost:5000/id' + window.location.pathname).then(response => {
			let jsondata = JSON.parse(response.data.target);
			let user_type;
			console.log(jsondata);
			if (jsondata == null) {
				jsondata = {
					name: 'user' + String('0000' + Math.floor(Math.random() * 9999)).substr(-4)
				};
				user_type = 'none';
			} else {
				user_type = 'target';
			}
			this.setState({
				user_info: jsondata,
				user_type: user_type
			});
		});
	}
	render() {
		if (this.state.user_type == null)
			return null;
		return (
			<div className = "component">
				<div className = "sub_com">
					<Select
					renderState = {this.state.renderState}
					nextPage = {this.nextPage.bind(this)}
					backPage = {this.backPage.bind(this)}
					user_info = {this.state.user_info}
					user_type = {this.state.user_type}
					/>
				</div>
			</div>
		);
	}
}

export default App;