import React from 'react'; 
import Settings from './Settings.jsx';
import Day from './Day.jsx';
import Add from './Add.jsx';



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
        this.setState({monthly: value});
        this.saveState(); 
    }

    saveState() {
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(this.state));
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
        return parseFloat(this.getAvailableFundsMonthly()/this.getDaysLeft()).toFixed(2); 

    }

    getAvailableFundsWeekly() {
        return parseFloat(this.getAvailableFundsMonthly()/this.getWeeksLeft()).toFixed(2); 
    }

    getAvailableFundsMonthly() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {
            if(moment(arr.date).isAfter(moment().startOf('month')) && moment(arr.date).isBefore(moment().endOf('month')) ) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return parseFloat(value).toFixed(2); 
    }

    getExpensesToday() {

    }

    getExpensesThisWeek() {

    }

    getExpensesThisMonth() {

    }

    addExpense(value) {
        console.log("clicked!", value);
        var arr = this.state.expenses; 
        arr.push({ 
            date: moment(),
            amount: value, 
        });

        this.setState({expenses: arr}); 
        this.saveState();
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
                    monthly = { this.getAvailableFundsMonthly() || "" }
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
                    monthly = { this.getAvailableFundsMonthly() || 0 }
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
    }

    getLeftNavButton() {
        console.log(this.getCurrentView());
        if(this.getCurrentView() !== undefined && this.getCurrentView() !== 'day' ) {
            return (
                <input 
                 type="button"
                 value="Close"
                 className="close"
                 onClick={ this.close.bind(this) }
                 />
            );
        }
        else {
            return (
                <input 
                 type="button"
                 value="Settings"
                 className="settings"
                 onClick={ this.setView.bind(this, 'settings') }
                 />
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
                    <div className="rightNav"></div>
                </nav>
            <div className="separator"></div>

                  { this.viewSelector() }  
            </div>
        );
    }

}

export default App;
