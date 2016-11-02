import React from 'react'; 

class Settings extends React.Component {
	
	saveChanges(event) {		
		event.target.value = event.target.value.replace(',', '.');

		if(event.target.value.slice(-1) === "."){
			event.target.value = parseFloat(event.target.value) + event.target.value.slice(-1) || 0;
		}
		else {
			event.target.value = parseFloat(event.target.value) || 0;
		}

		this.props.update(event.target.value);
	}

	getWeeksLeft() {
		var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
		return weeks; 
	}

	getDaysLeft() {
		var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days')
		return daysLeft; 
	}

	render() {
		return (
			<div className="content">
				<h1>Settings</h1>
				<h2>Set funds available for this month</h2>
				<p>Daily funds will be calculated from this moment on.</p>
				<input 
					autoFocus
					type="text"
					defaultValue= { this.props.monthly }  
					placeholder="0" 
					ref="monthlyInput"
					onChange={ this.saveChanges.bind(this) }
				/>
				<p>
					Weekly: { this.props.monthly / this.getWeeksLeft() }
				</p>

				<p>
					Daily: { this.props.monthly / this.getDaysLeft() }
				</p>

				<input 
		        type="button"
		        value="Exit"
		        className="exit"
		        onClick={ this.props.close.bind(this) }
		        />
			</div>


		);
	}
}

export default Settings;
