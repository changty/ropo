import React from 'react'; 

class List extends React.Component {
	listExpenses() {
		return (
			<h1>expenses</h1>
		);
	}

	render() {
		return (
		    <div className="content">
		    	{ this.listExpenses() }
		    </div>
		);
	}
}

export default List;
