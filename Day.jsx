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
		        <div className="availableToday">
		            { this.props.daily }
		        </div>

		        <div className="divider">

		           <div className="availableThisWeek">
		               { this.props.weekly }
		           </div>
		           
		           <div className="availableThisMonth">
		               { this.props.monthly }
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
