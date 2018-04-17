import React from 'react'
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
        return (
            <div className="sideBarWrapper">
                <ul>
                    <NavLink activeClassName="active" to="/dashboard"><li><i className="fa fa-home"></i>dashboard </li></NavLink>
                    <NavLink activeClassName="active" to="/users"><li><i className="fa fa-user"></i>users</li></NavLink>
                    <NavLink activeClassName="active" to="/messages"><li><i className="fa fa-envelope"></i> messages</li></NavLink>
                    <NavLink activeClassName="active" to="/verifications"><li><i className="fa fa-check-circle"></i>verifications </li></NavLink>
                    <NavLink activeClassName="active" to="/transactions"><li><i className="fas fa-exchange-alt"></i> transactions</li></NavLink>
                    <NavLink activeClassName="active" to="/wiretransfers"><li><i className="fas fa-arrows-alt-v"></i>wire-transfers </li></NavLink>
                    <NavLink activeClassName="active" to="/support"><li><i className="fas fa-question-circle"></i> support</li></NavLink>
                    <NavLink activeClassName="active" to="/settings"><li><i className="fas fa-cog"></i> settings</li></NavLink>
                </ul>
            </div>
        )
}

export default Sidebar
