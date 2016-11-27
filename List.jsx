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
			return (<i className="material-icons cat-icon">restaurant</i>);
		}
		else if (category == 'drink') {
			return (<i className="material-icons cat-icon">local_bar</i>);

		}
		else if (category == 'activity') {
			return (<i className="material-icons cat-icon">local_activity</i>);

		}
		else if (category == 'grocery') {
			return (<i className="material-icons cat-icon">local_grocery_store</i>);

		}
		else {
			return (<i className="material-icons cat-icon">lightbulb_outline</i>);

		}
	}

	getCategoryColor(category) {
		if(category == 'food') {
			return "cat-food";
		}
		else if (category == 'drink') {
			return "cat-drink";
		}
		else if (category == 'activity') {
			return "cat-activity";
		}
		else if (category == 'grocery') {
			return "cat-grocery";
		}
		else {
			return "cat-other";
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
/*
		//Old way of doing things
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
*/

		// favorite is for showing only favorited items. 
		// isFavorite tells, if the item is favorited
		var removeClass = this.props.isRemove ? '' : 'hidden '; 
		removeClass += "mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"

		var isFavorite = item.favorite ? "favorite" : "";
		if(favorite && isFavorite) {
			console.log("favorite", item.amount);
			return (
				<div key={ index } className="demo-card-wide mdl-card mdl-shadow--2dp">
				  <div 
				  	className={ this.getCategoryColor(item.category) + " mdl-card__title" }
				    onClick={ this.props.addExpense.bind(this, item.amount, true, item.category) }
				   >
				    <h2 className="mdl-card__title-text">{ item.amount }€</h2>
				  </div>
				  <div 
				  	className="mdl-card__supporting-text"
				  	onClick={ this.props.addExpense.bind(this, item.amount, true, item.category) }
				  >
				  	 { this.getIcon(item.category) }
				  	 { moment(item.date).format('MMMM Do YYYY, h:mm:ss a') }
				  </div>
				  {/*
				  <div className="mdl-card__actions mdl-card--border">
				    <a onClick={ this.props.addExpense.bind(this, item.amount, true, item.category) } className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				      Get Started
				    </a>
				  </div>
				*/}
				  <div className="mdl-card__menu">
					  <button 
					  	className="mdl-button mdl-button--icon mdl-js-button delete"
					  	onClick={ this.removeEntry.bind(this, index) }
					  	>
					    <i className="material-icons" key={ index }>delete</i>
					  </button>

					    <button onClick={ this.toggeleFavorite.bind(this, index) } className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
					      <i className={ isFavorite + " material-icons"}>favorite_border</i>
					    </button>

				  </div>
				</div>
			);
		}
		else if(!favorite) {
			return (
				<div key={ index } className="demo-card-wide mdl-card mdl-shadow--2dp">
				  <div className={ this.getCategoryColor(item.category) + " mdl-card__title" }>
				    <h2 className="mdl-card__title-text">{ item.amount }€</h2>
				  </div>
				  <div className="mdl-card__supporting-text">
				  	{ this.getIcon(item.category) }
				  	{ moment(item.date).format('dddd Do MMMM h:mm') }
				  </div>
				  {/*
				  <div className="mdl-card__actions mdl-card--border">
				    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				      Get Started
				    </a>
				  </div>
				*/}
				  <div className="mdl-card__menu">
				  <button 
				  	className="mdl-button mdl-button--icon mdl-js-button delete"
				  	onClick={ this.removeEntry.bind(this, index) }
				  	>
				    <i className="material-icons" key={ index }>delete</i>
				  </button>

				    <button onClick={ this.toggeleFavorite.bind(this, index) } className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				      <i className={ isFavorite + " material-icons"}>favorite_border</i>
				    </button>

				  </div>
				</div>
			);
		}
	}


	render() {
		return (
		    <div className="content expenseList">
		    	{/*<ul className="demo-list-two mdl-list">*/}

			    	{ 
			    		this.props.expenses.map((item, index) => {
							return this.getEntry(item, index, this.props.favorites);

			    		})
			    	 }

			   {/* </ul>*/}
		    </div>
		);
	}
}

export default List;
2