import React from 'react'; 

class Day extends React.Component {


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
		    <div className="content bottom">
		        <div className="day-row">
			        <div className="availableToday">
			        	<div className="original"> { parseFloat(this.props.monthlyOriginal / this.getDaysLeft()).toFixed(2) } </div>
			           <div className="now"> { parseFloat(this.props.daily).toFixed(2) }</div>
			        </div>

		           <div className="availableThisWeek">
		           		<span className="original"> { parseFloat(this.props.monthlyOriginal / this.getWeeksLeft()).toFixed(2) } </span>
		               	<span className="now">{ parseFloat(this.props.weekly).toFixed(2) }</span>
		           </div>
		           
		           <div className="availableThisMonth">
		           		<span className="original"> { parseFloat(this.props.monthlyOriginal).toFixed(2) } </span>
		               	<span className="now">{ parseFloat(this.props.monthly).toFixed(2) } </span>
		           </div> 
			    </div>
			       
			       <button 
			       		className="add-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
			       		onClick={ this.props.setView.bind(this, 'add') }
			       		>
			         <i className="material-icons">add</i>
			       </button>
		    </div>
		);
	}
}

export default Day;
