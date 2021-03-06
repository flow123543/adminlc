import React, {Component} from 'react'
// import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
// import { Chart } from 'react-google-charts';
import zingchart from 'zingchart'

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


  componentDidMount() {
    zingchart.render({
          id : 'chart9',
          data : {
            type: "area",
            title: {
              text: 'Number of Inquiries',
              color: 'navy'
            },
              plot:{
                activeArea:true /* extend the tooltip's active area to the shaded region */
              },
               scaleX: {
              item: {
                fontColor: "blue",
              },

              labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"]
            },
              series: [
                {
                  values:[20,40,25,50,15,45,33],
                  backgroundColor:"#6666FF #FF0066", /* Accepts single color or gradient (2 colors) */
                  alphaArea:0.5,/* Transparency of shaded region*/
                }
              ]

              },
              height: "100%",
              width: "100%"
            });
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



    return (
          <div className="dashboardWrapper">
            <div className='dashboard'>

                <div className='column'>

                    <div className='item'>
                        <div className="support" style={{'display': 'grid', margin: '36%'}}>
                        <button>FAQ</button>
                        <button>knowledgebase</button>
                        <button>All inquiries</button>
                      </div>
                    </div>

                </div>

                <div className='column'>

                  <div id="chart9" className='item'></div>

                 </div>

          </div>

          <div className='dashboard'>

                <div className='column'>

                  <div className='item'>
                    <div style={{padding: '20px'}}>
                        <p className="title">Search by Case #</p>
                        <input className="searchBar pull-right" type="text" />
                    </div>
                        <div className="tableWrapper" style={{padding: '20px'}}>
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
      )
  }
}



