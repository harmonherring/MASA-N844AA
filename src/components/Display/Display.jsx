import React from 'react';
import DisplayContent from './DisplayContent'
import './display.css'

class Display extends React.Component {
	constructor() {
		super();
		this.state = { 
			log: [],
			logOpen: false,
			currentOpenLog: "",
			currentOpenLogU: "",
		};
	}

	componentDidMount() {
		this.getLogs();
		this.interval = setInterval(() => {
			this.getLogs();
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getLogs = () => {
		const openTheGates = (a, b) => {
			this.setState({
				logOpen: true,
				currentOpenLog: a,
				currentOpenLogU: b,
			});
		}
		function handleErrors(response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
			return response;
		}
		fetch("https://api-dev.masa.herri.ng/cm/", {
			method: "GET",
			headers: {
				'Accept':  'application/json',
				'Content-Type': 'application/json',
				'Cache': 'no-cache'
			},
			credentials: 'include'
		}).then(handleErrors).then(r => r.json()).then(pass => {
	    	if (pass.data != null) {
				const logTable = pass.data.map(function(d, i){
					return (
						<tr key={i}>
							<td key={i + 1} className="unselectable" onClick={() => openTheGates(d.name, d.uuid)}> { d.name } </td>
							<td key={i + 2} className="unselectable"> { d.uuid } </td>
						</tr>
					)
				});
				this.setState({
					log: logTable
				});
			}
		}).catch(function(error) {
	        if(error == "Error: UNAUTHORIZED"){
	        	window.location.replace("/login");
	        }
	        console.log(error);
	    });
	}

	goTo = (e, go) => {
		e.preventDefault();
		window.location.replace(go);
	}

	render() {
		return (
			<div className="container">
				<button className="button" onClick={(e, go) => this.goTo(e, "/")}>Home</button>
				<br></br>
				<br></br>
				<DisplayContent 
					log={this.state.log} 
					logOpen={this.state.logOpen} 
					currentOpenLog={this.state.currentOpenLog} 
					currentOpenLogU={this.state.currentOpenLogU} 
				/>
			</div>
		)
	}
}

export default Display;