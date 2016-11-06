import React from 'react'; 
import Settings from './Settings.jsx';
import Day from './Day.jsx';
import Add from './Add.jsx';
import List from './List.jsx';
import Progress from './Progress.jsx';


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
        this.state.isRemove = false; //list-view
        this.state.title = 'Day';

    }

    saveMonthlyValue(value) {
        var self = this; 
        this.setState({monthly: value}, () => { self.saveState() });
    }

    saveState() {
        console.log("Saving state", this.state);
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify( this.state ));
    }

    getWeeksLeft() {
        var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
        return weeks; 
    }

    getDaysLeft() {
        var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days');
        console.log("days left:", daysLeft);
        return daysLeft; 
    }

    getWeeksInMonth() {
        var weeks = moment(moment().endOf('month')).diff(moment().startOf('month'), 'weeks');

        console.log("weeks: ", weeks);
    }
    
    getAvailableFundsDaily() {
        // old method
        var value = this.state.monthly || 0; 
        value = value / this.getDaysLeft(); 

        // new method
        value = this.getDailyBudget() / this.getDaysLeft(); 

        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isSame(moment(), 'day')) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return parseFloat(value).toFixed(2); 

    }

    getAvailableFundsWeekly() {
        // old way
        var value = this.state.monthly || 0; 
        value = value / this.getWeeksLeft(); 

        // new way
        value = this.getWeeklyBudget() / this.getWeeksLeft();
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isSame(moment(), 'week')) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return parseFloat(value).toFixed(2); 
    }

    getAvailableFundsMonthly() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isSame(moment(), 'month')) {
                value -= parseFloat(arr[i].amount); 
            }

        }
        console.log("monthly funds", this.state.monthly);

        return parseFloat(value).toFixed(2); 
    }

    // Return the amount of money left daily on this moment
    getDailyBudget() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isBefore(moment(), 'day')) {
                value -= parseFloat(arr[i].amount); 
            }

        }
        console.log("funds left: ", value);
        return parseFloat(value).toFixed(2); 
    }

    getWeeklyBudget() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isBefore(moment(), 'week')) {
                value -= parseFloat(arr[i].amount); 
            }

        }
        console.log("funs left weekly: ", value);
        return parseFloat(value).toFixed(2); 
    }

    getMonthlyOriginal() {
        return this.state.monthly || 0; 
    }

    getExpenses(time) {
        var timeArr = []; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {   

            if(moment(arr[i].date).isSame(moment(), time)) {
                timeArr.push(arr[i]);
            }
 
        }
        return timeArr; 
    }

    updateExpenses(expenses) {
        console.log("expenses updated");
        var self = this;
        this.setState({expenses: expenses}, () => { self.saveState() });
    }


    addExpense(value) {
        // if not a valid number
        if(isNaN(value) || value == 0) {
            return
        }

        var arr = this.state.expenses; 
        arr.push({ 
            date: moment(),
            amount: value, 
        });
        var self = this; 
        this.setState({expenses: arr}, () => { self.saveState() }); 
        this.close();

    }

    toggleIsRemove() {
        var isRemove = this.state.isRemove; 
        console.log("is remove");
        this.setState({isRemove: !isRemove});
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
                    weeks = { this.getWeeksInMonth() }
                    setView = { this.setView.bind(this) }
                    close = { this.close.bind(this) }
                />
            );
        }

        // monthly is set, show the main view
        if(this.getCurrentView() === undefined || this.getCurrentView() === 'day') {
            return (
                <div className="noflex">
                <Day 
                    monthly={ this.getAvailableFundsMonthly() }
                    weekly={ this.getAvailableFundsWeekly() }
                    daily={ this.getAvailableFundsDaily() }
                    weeklyFundsLeft= { this.getWeeklyBudget() }
                    fundsLeft={ this.getDailyBudget() }
                    monthlyOriginal = { this.getMonthlyOriginal() }
                    setView= { this.setView.bind(this) }
                    close={ this.close.bind(this) }
                />
                <Progress
                    used = { this.getAvailableFundsDaily() }
                    full = { this.getDailyBudget() / this.getDaysLeft() }
                />
                </div>
            );
        }

        // settings opened
        else if(this.getCurrentView() === 'settings') {
            return (
                <Settings 
                    update = { this.saveMonthlyValue.bind(this) }
                    monthly = { this.getMonthlyOriginal() }
                    weeks = { this.getWeeksInMonth() }
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
                    isRemove = { this.state.isRemove }
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

        else {
            return (
                <button 
                    className="list mdl-button mdl-js-button mdl-js-ripple-effect"
                    onClick={ this.toggleIsRemove.bind(this) }
                >
                <i className="material-icons">delete</i>
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
