import React from 'react'; 

class Progress extends React.Component {
	getColor() {

	}

	getPercentage() {
		var ratio = (this.props.used / this.props.full) * 100 + "%";  
		console.log("ratio", ratio);
		return ratio; 		
	}

	getProgress() {

	}

	render() {
			{ this.getColor() }

		return (
	    	<div className="progress-container">
	    		<div className="progress" style={{height: this.getPercentage() }}></div>
	    	</div>
		);
	}
}

export default Progress;
