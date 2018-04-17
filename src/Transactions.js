import React, {Component} from 'react';
import Parse from 'parse';

export default class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalCount: 0,
            page: 1,
            limit: 100,
            transactions: [],
            searchInput: "",
            columnOrder: 'ascending'
        }
    }

    componentDidMount() {
        this.totalCountQuery()
        this.transactionQuery()
    }

    totalCountQuery = () => {
        let r = this;
        let transactions = Parse.Object.extend("Transactions");
        let query2 = new Parse.Query(transactions);

        query2.count({
          success: results => {
            r.setState({totalCount: results});
          },
          error: error => {
            alert("Error: " + error.code + " " + error.message);
          }
        })

    }

    transactionQuery = () => {
        let r = this;
        let transactions = Parse.Object.extend("Transactions");
        let query = new Parse.Query(transactions);

        query.skip(r.state.page * r.state.limit).limit(r.state.limit).ascending('status')

        query.find({
          success: (results) => {
            console.log(results)
            r.setState({transactions: results})
          },
          error: (error) => {
            alert("Error: " + error.code + " " + error.message);
          }
        })
    }

    handleNext = () => {

        this.setState({
          page: this.state.page + 1,
          transactions:[]
        })

        this.transactionQuery()
    }

    handleBack = () => {

        this.setState({
          page:this.state.page - 1,
          transactions:[]
        })

        this.transactionQuery()
    }

    handleKeyPress = (e) => {

        if (e.key === "Enter")
        {
          let r = this;
          let idQ = new Parse.Query("Transactions");
          idQ.startsWith("objectId", this.state.searchInput);

          let amountQ = new Parse.Query("Transactions");
          amountQ.startsWith("amount", this.state.searchInput);

          let createdAtQ = new Parse.Query("Transactions");
          createdAtQ.startsWith("createdAt", this.state.searchInput);

          let statusQ = new Parse.Query("Transactions");
          statusQ.startsWith("status", this.state.searchInput);

          let mainQuery = Parse.Query.or(idQ, amountQ, createdAtQ, statusQ);
          mainQuery.find()
            .then(results => {
                r.setState({transactions: results})
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
                this.setState({transactions: results, columnOrder: "descending"})
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
                this.setState({transactions: results, columnOrder: "ascending"})
            })
            .catch(error => {
              alert(error.message)
            })
        }
    }

    render() {
        return (
            <div className="dashboardWrapper">
                <div>
                    <p className="title">All Transactions
                        <input onKeyPress={this.handleKeyPress}
                               onChange={e => this.setState({searchInput: e.target.value})}
                               value={this.state.searchInput} placeholder="Search by id, amount, date, and status"
                               className="searchBar pull-right"
                               type="text" />
                    </p>
                    <div className="tableWrapper">
                    <table style={{"width":"calc(100% - 0px)","border-bottom":"0"}}>
                        <tbody>
                           <tr className="tablefooter">
                              <td className="appointmentsFoundCount" colSpan="0">
                                <b id="totalRecordsA">{this.state.totalCount}</b> Transactions Found</td>
                                <td colSpan="5">
                                    {this.state.page === 1 ?
                                        null
                                        :
                                        <a onClick={this.handleBack}><i className="fa fa-chevron-left"></i>&nbsp;&nbsp; </a>
                                    }

                                    <span id="currentPage">{this.state.page}</span>&nbsp; of &nbsp;<span>{(parseFloat(this.state.totalCount) / this.state.limit).toFixed(0)}</span>
                                    &nbsp;&nbsp;

                                    {this.state.page === (parseFloat(this.state.totalCount) / this.state.limit)?
                                        null
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
                             <th>id </th>
                             <th>amount <i className="fas fa-arrows-alt-v" onClick={() => this.order('Transactions', 'amount')} ></i></th>
                             <th>created <i className="fas fa-arrows-alt-v" onClick={() => this.order('Transactions', 'createdAt')} ></i> </th>
                             <th>status <i className="fas fa-arrows-alt-v" onClick={() =>  this.order('Transactions', 'status')} ></i> </th>

                         </tr>
                     </thead>

                     <tbody id="appointmentsTable">
                       {this.state.transactions.map((object,i) => {
                            return (
                               <tr key={object.id} className="apData">
                                  <td>{object.id}</td>
                                   <td>${object.get('amount')}</td>
                                  <td>{converttoFormat(object.get('createdAt').toString())}</td>
                                  <td>{object.get('status')}</td>
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


