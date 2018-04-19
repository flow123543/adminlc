import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Users from './Users.js'
import Sidebar from './Sidebar.js'
import Transactions from './Transactions.js'
import Verifications from './Verifications.js'
import Invites from './Invites.js'
import Support from './Support.js'
import Dashboard from './Dashboard.js'
import Settings from './Settings.js'

import Parse from 'parse';

import './App.css';

Parse.initialize("p94Lp2L9heC5ZAKaPfAkbhB5FaxtLfyAV25ePwwsQUTMH7cZY4UkUrRBXAvEC6nJQUgZ32hdAS2KDfKFjTzrMMzEDCYHCZmn8ND4epbG3xef7J7eHqTFmKBRQN");
Parse.serverURL = 'https://larecoin.herokuapp.com/parse';

export default class App extends Component {
  render() {
        return (
            <div>
                <Sidebar />
                <div className="contentWrapper">
                    <Route path="/users" component={Users} />
                    <Route path="/messages" component={Invites} />
                    <Route path="/transactions" component={Transactions} />
                    <Route path="/verifications" component={Verifications} />
                    <Route path="/support" component={Support} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/settings" component={Settings} />

                </div>
          </div>
        )
    }
}

