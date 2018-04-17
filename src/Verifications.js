import React, {Component} from 'react';
import Parse from 'parse';


export default class Verifications extends Component {
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
      this.verificationCount()
      this.verificationQuery()
  }

    verificationCount = () => {
        let r = this;
        let verifications = Parse.Object.extend("Verification");
        let query2 = new Parse.Query(verifications);

        query2.count({
          success: (results) => {
            console.log(results)
            r.setState({totalCount: results})
          },
          error: (error) => {
            alert("Error: " + error.code + " " + error.message);
          }
        })

    }

     verificationQuery = () => {
        let r = this;
        let verifications = Parse.Object.extend("Verification");
        let query = new Parse.Query(verifications);

        // query.skip(r.state.page * r.state.limit).limit(r.state.limit).ascending('documentNumber')

        query.find({
          success: (results) => {
            console.log(results)
            r.setState({verifications: results})
          },
          error: (error) => {
            alert("Error: " + error.code + " " + error.message);
          }
        })

    }

    handleNext = () => {

        this.setState({
            page: this.state.page + 1,
            verifications:[]
        })

        this.verificationQuery()
    }

    handleBack = () => {

        this.setState({
            page: this.state.page - 1,
            verifications:[]
        })

        this.verificationQuery()
    }

    handleKeyPress = (e) => {

        if(e.key === "Enter")
        {
          let r = this;

          let createdAtQ = new Parse.Query("Verification");
          createdAtQ.startsWith("createdAt", this.state.searchInput);

          let idQ = new Parse.Query("Verification");
          idQ.startsWith("objectId", this.state.searchInput);


          let mainQuery = Parse.Query.or(createdAtQ, idQ);
          mainQuery.find()
            .then(results => {
                r.setState({verifications: results})
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
                this.setState({
                  verifications: results,
                  columnOrder: "descending"
                })
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
                this.setState({
                  verifications: results,
                  columnOrder: "ascending"
                })
            })
            .catch(error => {
              alert(error.message)
            })
        }
    }

  render() {
    return (
      <div >
          <p className="title">All Verifications
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
                        <b id="totalRecordsA">{this.state.totalCount}</b> Verifications Found</td>
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
                     <th>ID </th>
                     <th>created <i className="fas fa-arrows-alt-v" onClick={() => this.order('Verification','createdAt')} ></i></th>
                     <th>documentType1 <i className="fas fa-arrows-alt-v" onClick={() => this.order('Verification','documentType1')} ></i></th>
                     <th>documentType2 <i className="fas fa-arrows-alt-v" onClick={() => this.order('Verification','documentType2')} ></i></th>
                     <th>documentNumber <i className="fas fa-arrows-alt-v" onClick={() => this.order('Verification','documentNumber')} ></i></th>
                     <th>issuingCountry <i className="fas fa-arrows-alt-v" onClick={() => this.order('Verification','issuingCountry')} ></i></th>
                     <th> status <i className="fas fa-arrows-alt-v" onClick={() => this.order('Verification','accountVerifiedStatus')} ></i></th>
                 </tr>
             </thead>

             <tbody id="appointmentsTable">
               {this.state.verifications.map((object,i) => {
                    return (
                       <tr key ={object.id} className="apData">
                          <td>{object.id}</td>
                          <td>{converttoFormat(object.get('createdAt').toString())}</td>
                          <td>{object.get('documentType1')}</td>
                          <td>{object.get('documentType2')}</td>
                          <td>{object.get('documentNumber')}</td>
                          <td>{object.get('issuingCountry')}</td>
                          <td>{object.get('accountVerifiedStatus')}</td>

                       </tr>
                    )
                })
               }
            </tbody>
            </table>
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


