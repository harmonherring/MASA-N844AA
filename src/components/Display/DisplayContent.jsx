import React from 'react';
import './display.css'

class DisplayContent extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = { 
			data: [],
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			if (this.props.logOpen) {
				this.getLogData();
			}
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getLogData = () => {
		const name = this.props.currentOpenLog
		fetch(`https://api-dev.masa.herri.ng/logs/name/${name}`, {
			method: "GET",
			headers: {
				'Accept':  'application/json',
				'Content-Type': 'application/json',
				'Cache': 'no-cache'
			},
			credentials: 'include'
		})
		.then(r => r.json())
	    .then(pass => {
	    	if (pass.data != null) {
				const lt = pass.data.map(function(d) {
					return (
						<div key={d.id} style={{padding: "10px"}}>
							<span style={{display: "block"}}>{d.timestamp}</span>
							<span style={{display: "block"}}>{d.data.test != null ? "Test: " + d.data.test : null}</span>
							<span style={{display: "block"}}>{d.data.what != null ? "What: " + d.data.what : null}</span>
						</div>
					)
				});
				this.setState({
					data: lt
				});
			}
	    })
	}

	goTo = (e, go) => {
		e.preventDefault();
		window.location.replace(go);
	}

	render() {
		if (this.props.logOpen) {
			return (
				<div>
					<div>
						<button className="button back" onClick={(e, go) => this.goTo(e, "/display")}>back</button>
						<b className="log-title">Name: {this.props.currentOpenLog}</b>
						<br></br>
						<b className="log-title">UUID: {this.props.currentOpenLogU}</b>
						<hr></hr>
					</div>
					<div className="log-container">
						<div className="log-container-sec">
						<span className="log-data-container">{this.state.data}</span>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>UUID</th>
							</tr>
						</thead>
						<tbody>
							{this.props.log}
						</tbody>
					</table>
				</div>
			)
		}
	}
}

export default DisplayContent