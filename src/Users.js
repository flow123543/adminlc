import React, {Component} from 'react';
import Parse from 'parse';

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalCount: 0,
            page: 1,
            limit: 100,
            users: [],
            searchInput: '',
            columnOrder: 'ascending'
        }
    }

    componentDidMount() {
        this.totalCountQuery()
        this.userQuery()
    }

    totalCountQuery = () => {
        let r = this;
        let users = Parse.Object.extend("_User");
        let query2 = new Parse.Query(users);

        query2.count({
          success: (results) => {
            r.setState({totalCount: results});
          },
          error: (error) => {
            alert("Error: " + error.code + " " + error.message);
          }
        })

    }

    userQuery = () => {
        let r = this;
        let _Users = Parse.Object.extend("_User");
        let query = new Parse.Query(_Users);

        query.skip(r.state.page * r.state.limit).limit(r.state.limit).ascending('fname')

        query.find({
          success: (results) => {
            r.setState({users: results})
          },
          error: (error) => {
            alert("Error: " + error.code + " " + error.message);
          }
        })

    }

    handleNext = () => {

        this.setState({
            page: this.state.page + 1, users:[]
        })

        this.userQuery()
    }

    handleBack = () => {

        this.setState({
            page: this.state.page - 1,
            users:[]
        })

        this.userQuery()
    }

    handleKeyPress = (e) => {

        if (e.key === "Enter")
        {
          let r = this;
          let firstNameQ = new Parse.Query("_User");
          firstNameQ.startsWith("fname", this.state.searchInput);

          let lastnameQ = new Parse.Query("_User");
          lastnameQ.startsWith("lname", this.state.searchInput);

          let objectIdQ = new Parse.Query("_User");
          objectIdQ.startsWith("objectId", this.state.searchInput);

          let usernameQ = new Parse.Query("_User");
          usernameQ.startsWith("username", this.state.searchInput);

          let emailQ = new Parse.Query("_User");
          emailQ.startsWith("email", this.state.searchInput);

          let countryQ = new Parse.Query("_User");
          countryQ.startsWith("country", this.state.searchInput);


          let mainQuery = Parse.Query.or(firstNameQ, lastnameQ,objectIdQ,usernameQ,emailQ, countryQ);
          mainQuery.find()
            .then(results => {
                r.setState({users: results})
            })
            .catch(error => {
              alert(error.message)
            })
        }
    }

    order = (query, column) => {

      let order = new Parse.Query(query);

        if(this.state.columnOrder === "ascending")
        {
            order.descending(column);

            order.find()
            .then(results => {
              console.log(results)
                this.setState({users: results, columnOrder: "descending"})
            })
            .catch(error => {
              alert(error.message)
            })

        }
        else if(this.state.columnOrder === "descending")
        {
            order.ascending(column);

            order.find()
            .then(results => {
                this.setState({users: results, columnOrder: "ascending"})
            })
            .catch(error => {
              alert(error.message)
            })
        }
    }

    dateOrder = () => {

        this.order('_User','createdAt')
    }

    lareOrder = () => {

        this.order('_User','totalLare')

    }

    countryOrder = () => {

        this.order('_User','country')

    }

    nameOrder = () => {

        this.order('_User','fname')

    }


    render() {
        return (
            <div className="dashboardWrapper">
                <div>
                    <p className="title">All Users
                        <input onKeyPress={this.handleKeyPress}
                               onChange={e => this.setState({searchInput: e.target.value})}
                               value={this.state.searchInput} placeholder="Search by user id, name, email and username"
                               className="searchBar pull-right"
                               type="text" />
                    </p>
                    <div className="tableWrapper">
                    <table style={{"width":"calc(100% - 0px)","border-bottom":"0"}}>
                        <tbody>
                           <tr className="tablefooter">
                              <td className="appointmentsFoundCount" colSpan="0">
                                <b id="totalRecordsA">{this.state.totalCount}</b> Users Found</td>
                                <td colSpan="5">
                                    {this.state.page === 1 ?
                                        ""
                                        :
                                        <a onClick={this.handleBack}><i className="fa fa-chevron-left"></i>&nbsp;&nbsp; </a>
                                    }
                                        <span id="currentPage">{this.state.page}</span>&nbsp; of &nbsp;<span>{ (parseFloat(this.state.totalCount) / this.state.limit).toFixed(0) }</span>
                                        &nbsp;&nbsp;

                                    {(this.state.page === parseFloat(this.state.totalCount) / this.state.limit) ?
                                        ""
                                        :
                                        <a onClick={this.handleNext}><i className="fa fa-chevron-right"></i></a>
                                    }
                                </td>
                           </tr>
                        </tbody>
                    </table>

                    <table id="findAppointments" className="sortable">
                     <thead>
                         <tr>
                             <th>User ID </th>
                             <th>Date Joined <i className="fas fa-arrows-alt-v" onClick={this.dateOrder} ></i> {this.state.dateOrder}</th>
                             <th>Username</th>
                             <th>Full Name <i className="fas fa-arrows-alt-v" onClick={this.nameOrder} ></i> {this.state.nameOrder}</th>
                             <th>Phone #</th>
                             <th>Country <i className="fas fa-arrows-alt-v" onClick={this.countryOrder} ></i> {this.state.countryOrder}</th>
                             <th>LARE Balance <i className="fas fa-arrows-alt-v" onClick={this.lareOrder} ></i> {this.state.lareOrder}</th>
                         </tr>
                     </thead>

                     <tbody id="appointmentsTable">
                       {this.state.users.map((object,i) => {
                            return (
                               <tr key ={object.id} className="apData">
                                  <td>{object.id}</td>
                                  <td>{converttoFormat(object.get('createdAt').toString())}</td>
                                  <td>{object.get('username')}</td>
                                  <td>{object.get('fname') + " " + object.get('lname')}</td>
                                  <td>{object.get('phone')}</td>
                                  <td>{object.get('country')}</td>
                                  <td>{object.get('totalLare')}</td>
                               </tr>
                            )
                        })
                       }
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}

function converttoFormat(date) {
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let weekdayM = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let newDate = new Date(date);
  let weekDayNumber = weekdayM[newDate.getDay()];
  let newMonth = months[newDate.getMonth()];
  let newDay = newDate.getDate();
  let newYear = newDate.getFullYear();
  return weekDayNumber + ", " + newMonth + " "+newDay+", " + newYear;
}

