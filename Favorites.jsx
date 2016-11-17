import React from 'react'; 


class Favorites extends React.Component {
	removeEntry(index) {
		var array = this.props.getFAvorites(); 
		array.splice(index, 1); 

		this.props.updateExpenses(array);	
	}

	getFavorite(item, index) {
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
			    		this.props.getFavorites().map((item, index) => {
							return this.getFavorite(item, index);

			    		})
			    	 }

			    </ul>
		    </div>
		);
	}
}

export default List;





