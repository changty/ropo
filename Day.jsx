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
		    <div className="content">
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

		       <input 
		        type="button"
		        value="+"
		        className="add"
		        onClick={ this.props.setView.bind(this, 'add') }
		        />
		    </div>
		);
	}
}

export default Day;
