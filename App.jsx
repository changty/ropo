import React from 'react'; 
import Settings from './Settings.jsx';
import Day from './Day.jsx';
import Add from './Add.jsx';
import List from './List.jsx';



var LOCALSTORAGE_NAME = "myRopoData"; 
class App extends React.Component {
    constructor()  {
        super();
        var ropo = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)); 

        if(ropo === undefined || ropo === null) {
            ropo = {
                expenses: []
            };  
        }
        this.state = ropo;
        this.state.view = [];
        this.state.title = 'Day';

    }

    saveMonthlyValue(value) {
        var self = this; 
        this.setState({monthly: value}, () => { self.saveState() });
    }

    saveState() {
        console.log("SAving state", this.state);
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify( this.state ));
    }

    getWeeksLeft() {
        var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
        return weeks; 
    }

    getDaysLeft() {
        var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days')
        return daysLeft; 
    }
    
    getAvailableFundsDaily() {
        var value = this.state.monthly || 0; 
        value = value / this.getDaysLeft(); 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr.data).isSame(moment(), 'day')) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return parseFloat(value).toFixed(2); 

    }

    getAvailableFundsWeekly() {
        var value = this.state.monthly || 0; 
        value = value / this.getWeeksLeft(); 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr.data).isSame(moment(), 'week')) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return parseFloat(value).toFixed(2); 
    }

    getAvailableFundsMonthly() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr.data).isSame(moment(), 'month')) {
                value -= parseFloat(arr[i].amount); 
            }

        }
        console.log("monthly funds", this.state.monthly);

        return parseFloat(value).toFixed(2); 
    }

    getMonthlyOriginal() {
        return this.state.monthly || 0; 
    }

    getExpenses(time) {
        var time = []; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr.data).isSame(moment(), time)) {
                time.push(arr[i]);
            }

        }
        console.log("Expenses: ", time);
        return time; 
    }

    updateExpenses(expenses) {
        console.log("expenses updated");
        var self = this;
        this.setState({expenses: expenses}, () => { self.saveState() });
    }


    addExpense(value) {
        var arr = this.state.expenses; 
        arr.push({ 
            date: moment(),
            amount: value, 
        });
        var self = this; 
        this.setState({expenses: arr}, () => { self.saveState() }); 
        this.close();

    }

    setView(view) { 
        this.setState({view: this.state.view.concat([view]), title: view});
    }

    getCurrentView() {
        return this.state.view[this.state.view.length-1]; 
    }

    close() {
        var arr = this.state.view; 
        arr.splice(-1, 1); 
        this.setState({view: arr});

        if(arr.length === 0) {
            this.setState({title: 'Day'});
        }

    }

    viewSelector() {
        // empty state
        // Open settings
        if(this.getCurrentView() === undefined && this.state.monthly === undefined) {
            return (
                <Settings 
                    update = { this.saveMonthlyValue.bind(this) }
                    monthly = { this.getMonthlyOriginal() }
                    setView = { this.setView.bind(this) }
                    close = { this.close.bind(this) }
                />
            );
        }

        // monthly is set, show the main view
        if(this.getCurrentView() === undefined || this.getCurrentView() === 'day') {
            return (
                <Day 
                    monthly={ this.getAvailableFundsMonthly() }
                    weekly={ this.getAvailableFundsWeekly() }
                    daily={ this.getAvailableFundsDaily() }
                    monthlyOriginal = { this.getMonthlyOriginal() }
                    setView= { this.setView.bind(this) }
                    close={ this.close.bind(this) }
                />
            );
        }

        // settings opened
        else if(this.getCurrentView() === 'settings') {
            return (
                <Settings 
                    update = { this.saveMonthlyValue.bind(this) }
                    monthly = { this.getMonthlyOriginal() }
                    setView = { this.setView.bind(this) }
                    close = { this.close.bind(this) }
                />
            );
        }

        else if(this.getCurrentView() === 'add') {
            return (
                <Add 
                    addExpense = { this.addExpense.bind(this) }
                />
            );
        }

        else if(this.getCurrentView() === 'list') {
            return (
                <List 
                    updateExpenses = { this.updateExpenses.bind(this) }
                    getExpenses = { this.getExpenses.bind(this) }
                />
            );
        }
    }

    getLeftNavButton() {
        if(this.getCurrentView() !== undefined && this.getCurrentView() !== 'day' ) {
            return (

                <button 
                    className="settings mdl-button mdl-js-button mdl-js-ripple-effect"
                    onClick={ this.close.bind(this) }
                >
                <i className="material-icons">close</i>
                </button>
            );
        }
        else {
            return (
                <button 
                    className="settings mdl-button mdl-js-button mdl-js-ripple-effect"
                    onClick={ this.setView.bind(this, 'settings') }
                >
                <i className="material-icons">settings</i>
                </button>
            );
        }
    }

    getRightNavButton() {
        if(this.getCurrentView() !== 'list') {
            return (
                <button 
                    className="list mdl-button mdl-js-button mdl-js-ripple-effect"
                    onClick={ this.setView.bind(this, 'list') }
                >
                <i className="material-icons">list</i>
                </button>                
            );
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="leftNav">
                        { this.getLeftNavButton() }
                    </div>
                    <div className="title"> {this.state.title.toUpperCase()} </div>
                    <div className="rightNav">
                        { this.getRightNavButton() }
                    </div>
                </nav>
                <div className="separator"></div>
                  { this.viewSelector() }  
            </div>
        );
    }

}

export default App;
