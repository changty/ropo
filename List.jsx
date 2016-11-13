import React from 'react'; 
import SwipeableViews from 'react-swipeable-views'; 


class List extends React.Component {
	getExpenses(value) {
		var array = this.props.getExpenses(value);
		array.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return new moment(b.date).diff(moment(a.date));
		});
		return array;
	}

	removeEntry(index) {
		var array = this.props.getExpenses('month'); 
		array.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return new moment(b.date).diff(moment(a.date));
		});
		array.splice(index, 1); 

		this.props.updateExpenses(array);	
	}

	getDayEntry(item, index) {
		return (
			<li key={ index } className="mdl-list__item mdl-list__item--two-line">
			  <span className="mdl-list__item-primary-content">
			    <i className="material-icons mdl-list__item-avatar">favorite_border</i>
			    <span>{ item.amount } €</span>
			    <span className="mdl-list__item-sub-title">{ moment(item.date).format('MMMM Do YYYY, h:mm:ss a') }</span>
			  </span>

			  <span className={this.props.isRemove ? '' : 'hidden '  + "mdl-list__item-secondary-content"}>
			  	<button 
			  		className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" 
			  		onClick={ this.removeEntry.bind(this, index) }
			  		>
			  	  <i className="material-icons" key={ index }>delete</i>
			  	</button>
			  </span>
			</li>
		);
	}

	render() {
		return (
		    <div className="content expenseList">
		    	<ul className="demo-list-two mdl-list">

			    	{ 
			    		this.getExpenses('month').map((item, index) => {
							return this.getDayEntry(item, index);

			    		})
			    	 }

			    </ul>
		    </div>
		);
	}
}

export default List;
