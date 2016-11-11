import React from 'react'; 
import { SemiCircle, Line, Circle } from 'react-progressbar.js';
import  RadialProgressChart from 'radial-progress-chart';

let progress; 
class Day extends React.Component {

	getWeeksLeft() {
		var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
		return weeks; 
	}

	getDaysLeft() {
		var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days')
		return daysLeft; 
	}

	getForecast() {
		// var averageSpending = (this.props.monthlyOriginal - this.props.monthly) / (moment().daysInMonth() - this.getDaysLeft()); 
		var averagePerDay = this.props.monthlyOriginal / moment().daysInMonth(); 

		var averageSpending = this.props.monthly - (parseFloat(averagePerDay) * parseFloat(this.getDaysLeft()));
		console.log("average spending: ", averageSpending);

		return parseFloat(averageSpending).toFixed(2);
		// return parseFloat(this.props.monthly - (this.getDaysLeft() * averageSpending)).toFixed(2);
	}

	getMonthlyStats() {
		var str = 	'<div class="availableThisMonth">'
			// +		'<span class="original">'+ parseFloat(this.props.monthlyOriginal).toFixed(2) +'</span>'
			//+ 		'<span class="original">' + this.getDaysLeft() + ' days </span>'
			+    	'<span class="now">' +parseFloat(this.props.monthly).toFixed(2) +'€</span>'
			+    	'<span class="description">Left of '+ parseFloat(this.props.monthlyOriginal).toFixed(2)+'€</span>'

			+'</div>'

		console.log(str); 
		return str; 
		
	}

	getProgress() {
		return parseFloat(this.props.monthly).toFixed(2) / parseFloat(this.props.monthlyOriginal).toFixed(2);
	}

	getDataSeries() {
		var monthly = (this.props.monthly / this.props.monthlyOriginal) * 100;
		var weekly = this.props.weekly / (this.props.monthlyOriginal / 4 ) * 100; 
		var daily = this.props.daily / (this.props.monthlyOriginal / moment().daysInMonth()) * 100;

		daily = daily < 0 ? 0 : daily; 
		weekly = weekly < 0 ? 0 : weekly; 
		monthly = monthly < 0 ? 0 : monthly; 

		console.log(monthly, weekly, daily);
		return [{value: daily, labelStart: Math.floor(this.props.daily)}, {value: weekly, labelStart: Math.floor(this.props.weekly) }, { value: monthly, labelStart: Math.floor(this.props.monthly)}];
	}

	componentDidMount() {
		// series starts from insside
		progress = new RadialProgressChart('.progress', {series: this.getDataSeries()});

	}

	componentDidUpdate () {
		progress.update(this.getDataSeries());
	}

	render() {
		return (
		    <div className="content">
		        <div className="day-row">
		        {/*}
			        <div className="availableToday">
			           <div className="now">{ parseFloat(this.props.daily).toFixed(2) }€</div>
			           <span className="description">Left of { parseFloat(this.props.monthlyOriginal / moment().daysInMonth()).toFixed(2) }€</span>

			        </div>
			    */}

		           <div className="progress">
			           <button 
			           		className="add-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
			           		onClick={ this.props.setView.bind(this, 'add') }
			           		>
			             	<i className="material-icons">add</i>
			           </button>

		           </div>


			    </div>

		    </div>
		);
	}
}

export default Day;
