import React from 'react'; 


class List extends React.Component {
	// depracated
	getExpenses_old(value) {
		var array = this.props.getExpenses(value);
		array.sort(function(a,b){
		  return new moment(b.date).diff(moment(a.date));
		});
		return array;
	}

	getIcon(category) {
		if(category == 'food') {
			return (<i className="material-icons">restaurant</i>);
		}
		else if (category == 'drink') {
			return (<i className="material-icons">local_bar</i>);

		}
		else if (category == 'activity') {
			return (<i className="material-icons">local_activity</i>);

		}
		else if (category == 'grocery') {
			return (<i className="material-icons">local_grocery_store</i>);

		}
		else {
			return (<i className="material-icons">lightbulb_outline</i>);

		}

	}

	removeEntry(index) {
		this.props.expenses.splice(index, 1); 
		this.props.updateExpenses(this.props.expenses);	
	}

	toggeleFavorite(index) {
		this.props.expenses[index].favorite = !this.props.expenses[index].favorite; 
		this.props.updateExpenses(this.props.expenses);	
	}

	getEntry(item, index, favorite) {
		var isFavorite = item.favorite ? "favorite" : "";
		if(favorite && isFavorite) {
			return (
				<li key={ index } className="mdl-list__item mdl-list__item--two-line">
				  <span className="mdl-list__item-primary-content">
				    <i onClick={ this.toggeleFavorite.bind(this, index) } className={ isFavorite + " material-icons mdl-list__item-avatar"}>favorite_border</i>
				    <span onClick={ this.props.addExpense.bind(this, item.amount, true, item.category) }> { this.getIcon(item.category) } { item.amount } €</span>
				    <span onClick={ this.props.addExpense.bind(this, item.amount, true, item.category) } className="mdl-list__item-sub-title">{ moment(item.date).format('MMMM Do YYYY, h:mm:ss a') }</span>
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
		else if(!favorite) {
			return (
				<li key={ index } className="mdl-list__item mdl-list__item--two-line">
				  <span className="mdl-list__item-primary-content">
				    <i onClick={ this.toggeleFavorite.bind(this, index) } className={ isFavorite + " material-icons mdl-list__item-avatar"}>favorite_border</i>
				    <span>{ this.getIcon(item.category) } { item.amount } €</span>
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
	}


	render() {
		return (
		    <div className="content expenseList">
		    	<ul className="demo-list-two mdl-list">

			    	{ 
			    		this.props.expenses.map((item, index) => {
							return this.getEntry(item, index, this.props.favorites);

			    		})
			    	 }

			    </ul>
		    </div>
		);
	}
}

export default List;
2