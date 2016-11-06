import React from 'react'; 
import { Line, Circle } from 'react-progressbar.js';

class Day extends React.Component {


	getWeeksLeft() {
		var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
		return weeks; 
	}

	getDaysLeft() {
		var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days')
		return daysLeft; 
	}

	getMonthlyStats() {
		var str = 	'<div class="availableThisMonth">'
			// +		'<span class="original">'+ parseFloat(this.props.monthlyOriginal).toFixed(2) +'</span>'
			+ 		'<span class="original">' + this.getDaysLeft() + ' days </span>'
			+    	'<span class="now">' +parseFloat(this.props.monthly).toFixed(2) +' €</span>'
			+    	'<span class="description">Left this month</span>'
			+'</div>'

		console.log(str); 
		return str; 
		
	}

	getProgress() {
		return parseFloat(this.props.monthly).toFixed(2) / parseFloat(this.props.monthlyOriginal).toFixed(2);
	}

	getCircle() {

		var options = {
		           strokeWidth: 5,
		           tarilWidth: 1,
		           easing: 'easeInOut',
		           duration: 1400,
		       };

       // For demo purposes so the container has some dimensions.
       // Otherwise progress bar won't be shown
       var containerStyle = {
           width: '60vw',
           height: '60vw',
       };

		return (
			<Circle
			    progress={ this.getProgress() }
			    text={ this.getMonthlyStats() }
			    options={options}
			    initialAnimate={true}
			    containerStyle={containerStyle}
			    containerClassName={'progressbar'}
			 />
		);
	}

	render() {
		return (
		    <div className="content middle">
		        <div className="day-row">
		           { this.getCircle() }

			        <div className="availableToday">

			        	<div className="original">{ parseFloat(this.props.fundsLeft / this.getDaysLeft()).toFixed(2) } </div>
			           <div className="now">{ parseFloat(this.props.daily).toFixed(2) }</div>
			           <span className="description">Left today</span>

			        </div>
					
		       		{/*} <div className="availableThisWeek">
		           		<span className="original"> { parseFloat(this.props.weeklyFundsLeft / this.getWeeksLeft()).toFixed(2) } </span>
		               	<span className="now">{ parseFloat(this.props.weekly).toFixed(2) }</span>	
		           </div> */}     

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
