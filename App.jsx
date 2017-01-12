import React from 'react'; 
import Settings from './Settings.jsx';
import Day from './Day.jsx';
import Add from './Add.jsx';
import List from './List.jsx';

import SwipeableViews from 'react-swipeable-views'; 

import Progress from './Progress.jsx';


var LOCALSTORAGE_NAME = "myRopoData"; 
class App extends React.Component {
    constructor()  {
        super();
        var ropo = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)); 

        if(ropo === undefined || ropo === null) {
            ropo = {
                expenses: [],
                favorites: []
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
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify( this.state ));
    }

    getWeeksLeft() {
        var weeks = moment(moment().endOf('month')).diff(moment().today, 'weeks');
        return weeks; 
    }

    getDaysLeft() {
        var daysLeft = moment(moment().endOf('month')).diff(moment().today, 'days');
        return daysLeft; 
    }

    getWeeksInMonth() {
        var weeks = moment(moment().endOf('month')).diff(moment().startOf('month'), 'weeks');
    }
    
    getAvailableFundsDaily() {
        // new method
        var value = this.getDailyBudget() / this.getDaysLeft(); 

        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isSame(moment(), 'day')) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return value; 

    }

    getAvailableFundsWeekly() {
        // old way
        var value = this.state.monthly || 0; 
        value = value / this.getWeeksLeft(); 

        // new way

        var daysLeft = this.getDaysLeft(); 
        if(daysLeft < 7) {
            daysLeft = 7; 
        }
        value = this.getWeeklyBudget() / (daysLeft/7);
        console.log(value, this.getWeeklyBudget(), this.getDaysLeft()/7);

        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isSame(moment(), 'week')) {
                value -= parseFloat(arr[i].amount); 
            }
        }
        return value; 
    }

    getAvailableFundsMonthly() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isSame(moment(), 'month')) {
                value -= parseFloat(arr[i].amount); 
            }

        }

        return value; 
    }

    // Return the amount of money left daily on this moment
    getDailyBudget() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isBefore(moment(), 'day') && moment(arr[i].date).isAfter(moment().startOf('month'))) {
                value -= parseFloat(arr[i].amount); 
            }

        }
        console.log("Value", value);
        return value; 
    }

    getWeeklyBudget() {
        var value = this.state.monthly || 0; 
        var arr = this.state.expenses; 

        for(var i=0; i<arr.length; i++) {

            if(moment(arr[i].date).isBefore(moment(), 'week') && moment(arr[i].date).isAfter(moment().startOf('week'))) {
                value -= parseFloat(arr[i].amount); 
            }

        }
        return value; 
    }

    getMonthlyOriginal() {
        return this.state.monthly || 0; 
    }

    getExpenses(time) {
        var timeArr = []; 
        var arr = this.state.expenses; 

        if(!time || time === 'all') {
            return arr;
        }

        for(var i=0; i<arr.length; i++) {   

            if(moment(arr[i].date).isSame(moment(), time)) {
                timeArr.push(arr[i]);
            }
 
        }
        return timeArr; 
    }

    updateExpenses(expenses) {
        if(expenses === undefined || !expenses) {
           var expenses = this.state.expenses; 
        }

        var self = this;
        this.setState({expenses: expenses}, () => { self.saveState() });
    }


    addExpense(value, close, category) {
        // if not a valid number
        if(isNaN(value) || value == 0) {
            return
        }
        var arr = this.state.expenses; 
        arr.unshift({ 
            date: moment(),
            amount: value, 
            category: category
        });
        var self = this; 
        this.setState({expenses: arr}, () => { self.saveState() }); 

        if(close) {
          this.close();
        }

    }

    toggleIsRemove() {
        var isRemove = this.state.isRemove; 
        this.setState({isRemove: !isRemove});
    }

    setView(view) { 
        console.log("View: ", view);
        this.setState({view: this.state.view.concat([view]), title: view});
    }

    getCurrentView() {
        if(this.state.view.length === 0) {
            return 1;
        }
        return this.state.view[this.state.view.length-1]; 
    }

    close() {
        var arr = this.state.view; 
        arr.splice(-1, 1); 
        this.setState({view: arr});
    }

    viewSelector() {
       if(this.getCurrentView() == 'add') {
            return (
                <Add 
                    favorites = { true }
                    addExpense = { this.addExpense.bind(this) }
                    title = { {type: 'icon', content: 'add'} }

                    isRemove = { this.state.isRemove }
                    updateExpenses = { this.updateExpenses.bind(this) }
                    expenses = { this.state.expenses }
                    getCurrentView = { this.getCurrentView.bind(this) }
                    onChangeIndex = { this.onChangeIndex.bind(this) }
                />
            );
       }
       else {
            return (
                <SwipeableViews
                    index= { this.getCurrentView() }
                    resistance = { true }
                    onChangeIndex = { this.onChangeIndex.bind(this) }
                >

                    <Settings 
                        update = { this.saveMonthlyValue.bind(this) }
                        monthly = { this.getMonthlyOriginal() }
                        weeks = { this.getWeeksInMonth() }
                    />

                    <Day 
                        monthly={ this.getAvailableFundsMonthly() }
                        weekly={ this.getAvailableFundsWeekly() }
                        daily={ this.getAvailableFundsDaily() }
                        weeklyFundsLeft= { this.getWeeklyBudget() }
                        fundsLeft={ this.getDailyBudget() }
                        monthlyOriginal = { this.getMonthlyOriginal() }
                        setView= { this.setView.bind(this) }
                        close={ this.close.bind(this) }

                        isRemove = { this.state.isRemove }
                        updateExpenses = { this.updateExpenses.bind(this) }
                        expenses = { this.state.expenses }
                        getCurrentView = { this.getCurrentView.bind(this) }
                        onChangeIndex = { this.onChangeIndex.bind(this) }
                    />

                    <List 
                        isRemove = { this.state.isRemove }
                        updateExpenses = { this.updateExpenses.bind(this) }
                        expenses = { this.state.expenses }
                        getCurrentView = { this.getCurrentView.bind(this) }
                        onChangeIndex = { this.onChangeIndex.bind(this) }
                    />


                </SwipeableViews>
            );

       }
    }

    getLeftNavButton() {
        if(this.getCurrentView() == 'add') {
            return (
                <button 
                    className="leftNav mdl-button mdl-js-button mdl-js-ripple-effect"
                    onClick={ this.close.bind(this) }
                >
                <i className="material-icons">close</i>
                </button>
            );
        }
    }

    getRightNavButton() {
        // if(this.getCurrentView() == '2') {
        //     return (
        //         <button 
        //             className="rightNav list mdl-button mdl-js-button mdl-js-ripple-effect"
        //             onClick={ this.toggleIsRemove.bind(this) }
        //         >
        //         <i className="material-icons">delete</i>
        //         </button>
        //     );     
        // }
    }

    onChangeIndex(index, indexLatest) {
        this.setView(index);
    }

    render() {;
        
        return (
            <div>
            { this.getLeftNavButton() }
            { this.getRightNavButton() }
            { this.viewSelector() }
            </div>
        );
        

        /*
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

        */
    }

}

export default App;
