import React, {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


export default class Support extends Component {
  constructor() {
    super()
    this.state = {
      verifications: [],
      totalCount: 0,
      page: 1,
      limit: 100,
      searchInput: '',
      columnOrder: 'ascending'
    }
  }


  // handleKeyPress = (e) => {

  //       if (e.key === "Enter")
  //       {
  //         let r = this;
  //         let idQ = new Parse.Query("Inquiries");
  //         idQ.startsWith("objectId", this.state.searchInput);

  //         let createdAtQ = new Parse.Query("Inquiries");
  //         createdAtQ.startsWith("createdAt", this.state.searchInput);

  //         let usernameQ = new Parse.Query("Inquiries");
  //         usernameQ.startsWith("fname", this.state.searchInput);

  //         let emailQ = new Parse.Query("Inquiries");
  //         emailQ.startsWith("email", this.state.searchInput);

  //         let subjectQ = new Parse.Query("Inquiries");
  //         subjectQ.startsWith("subject", this.state.searchInput);

  //         let messageQ = new Parse.Query("Inquiries");
  //         messageQ.startsWith("message", this.state.searchInput);


  //         let mainQuery = Parse.Query.or(idQ, amountQ, createdAtQ, statusQ);
  //         mainQuery.find()
  //           .then(results => {
  //               r.setState({transactions: results})
  //           })
  //           .catch(error => {
  //             alert(error.message)
  //           })
  //       }
  //   }
  render() {
    const data = [
      {name: 'Day 1', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Day 2', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Day 3', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Day 4', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Day 5', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Day 6', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Day 7', uv: 3490, pv: 4300, amt: 2100},
    ];

    return (
            <div>
             <div className="container"><h2><b>SUPPORT</b></h2></div>
              <div className="container">
                <div className="grid">
                  <div className="grid--cell" data-cell="6" data-cell-sm="6">
                    <div className="item-demo">
                      <div className="support" style={{'display': 'grid'}}>
                        <button>FAQ</button>
                        <button>knowledgebase</button>
                        <button>All inquiries</button>
                      </div>
                    </div>

                  </div>

                  <div className="grid--cell" data-cell="6">
                    <div className="item-demo chart">
                    <p className="title">Number of inquiries</p>
                              <AreaChart width={530} height={170} data={data}
                                      margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <XAxis dataKey="name"/>
                                  <YAxis/>
                                  <Tooltip/>
                                  <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                              </AreaChart>


                    </div>
                  </div>
                  <div className="grid--cell" data-cell="12">
                    <div className="item-demo">
                      <p className="title">Search by Case #</p>
                          <input className="searchBar pull-right" type="text" />
                        <div className="tableWrapper">
                            <table style={{"width":"calc(100% - 0px)","border-bottom":"0"}}>
                                <tbody>
                                   <tr className="tablefooter">
                                      <td className="appointmentsFoundCount" colSpan="0">
                                        <b id="totalRecordsA">0</b> Inquiries Found</td>
                                        <td colSpan="5">
                                            {this.state.page === 1 ?
                                                ""
                                                :
                                                <a onClick={this.handleBack}><i className="fa fa-chevron-left"></i>&nbsp;&nbsp; </a>
                                            }
                                                <span id="currentPage">{this.state.page}</span>&nbsp; of &nbsp;<span>{ (parseFloat(0) / this.state.limit).toFixed(0) }</span>
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
                                     <th>ID </th>
                                     <th>created <i className="fas fa-arrows-alt-v" ></i></th>
                                     <th>username <i className="fas fa-arrows-alt-v" ></i></th>
                                     <th>email <i className="fas fa-arrows-alt-v" ></i></th>
                                     <th>subject <i className="fas fa-arrows-alt-v" ></i></th>
                                     <th>subject <i className="fas fa-arrows-alt-v" ></i></th>
                                 </tr>
                             </thead>

                             <tbody id="appointmentsTable">

                            </tbody>
                            </table>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      )
  }
}
