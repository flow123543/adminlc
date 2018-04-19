 import React, {Component} from 'react';

import Parse from 'parse';


export default class DashBoard extends Component {
    constructor() {
        super();

        this.state = {
            emailSend: "",
            emailMessage: "",
            phoneNumberMessage: "",
            phoneNumber: ""
        }
    }

    componentDidMount = () => {

      window.onload = function() {
        zingchart.render({
          id: 'chart3',
          height: '100%',
          width: '100%',
          data: {
            type: 'line',
            backgroundColor: "white",
            title: {
              text: "Page visits",
              textAlign: "left",
              fontColor: "blue"
            },
            tooltip: {
              fontColor: "white"
            },
            plot: {
              margin: "dynamic",
              marker: {
                backgroundColor: "blue",
                borderWidth: "2px"
              }
            },
            scaleX: {
              lineColor: "blue",
              tick: {
                lineColor: "blue"
              },
              item: {
                fontColor: "blue"
              },
              guide: {
                lineColor: "#ffde7b"
              }
            },
            scaleY: {
              lineColor: "blue",
              tick: {
                lineColor: "blue"
              },
              item: {
                fontColor: "blue"
              },
              guide: {
                lineColor: "#blue"
              }
            },
            series: [{
              values: [5, 3, 4, 5, 6, 3, 5, 3, 4, 6, 4, 3, 1],
              lineColor: "blue",
              lineWidth: "2px"
            }]

          }
        });
        zingchart.render({
          id: 'chart2',
          height: '100%',
          width: '100%',
          data: {
            type: "pie",
            backgroundColor: "white",
            title: {
              text: "Users converted",
              textAlign: "left",
              marginLeft: "10px",
              adjustLayout: true,
              fontColor: "blue"
            },
            subtitle: {
              text: "Amount of current usage",
              textAlign: "left",
              marginLeft: "10px",
              fontColor: "blue"
            },
            borderRadius: 4,
            valueBox: {
              visible: true
            },
            plot: {
              slice: 90,
              refAngle: 270,
              detach: false,
              hoverState: {
                visible: false
              },
              valueBox: {
                visible: true,
                type: "first",
                connected: false,
                placement: "center",
                text: "%v%",
                fontColor: "blue",
                fontSize: "20px"
              },
              tooltip: {
                fontColor: "white",
                rules: [{
                  rule: "%i == 0",
                  text: "%v Created",
                  shadow: false,
                  borderRadius: 4
                }, {
                  rule: "%i == 1",
                  text: "%v Left",
                  shadow: false,
                  borderRadius: 4
                }]
              }
            },
            plotarea: {
              margin: "dynamic",
            },
            series: [{
              values: [80],
              backgroundColor: "navy",
              borderWidth: "0px",
              shadow: 0
            }, {
              values: [20],
              backgroundColor: "blue",
              alpha: "0.5",
              borderWidth: "1px",
              borderWidth: "1px",
              shadow: 0,
              valueBox: {
                visible: false
              }
            }]

          }
        });
        zingchart.render({
          id: 'chart1',
          height: '100%',
          width: '100%',
          data: {
            type: "bar",
            stacked: true,
            stackType: "100%",
            backgroundColor: "white",
            title: {
              text: "Load distribution",
              textAlign: "left",
              marginLeft: "10px",
              adjustLayout: true,
              fontColor: "blue"
            },
            subtitle: {
              text: "Utilization across nodes",
              textAlign: "left",
              marginLeft: "10px",
              fontColor: "blue"
            },
            plot: {
              barsSpaceLeft: 0,
              hoverState: {
                visible: false
              }
            },
            tooltip: {
              fontColor: "whitblue"

            },
            plotarea: {
              margin: "dynamic",
            },
            scaleY: {
              guide: {
                visible: false
              },
              lineWidth: "0px",
              tick: {
                lineWidth: "1px",
                lineColor: "blue"
              },
              item: {
                fontColor: "blue"
              },
              lineColor: "blue"
            },
            scaleX: {
              guide: {
                visible: false
              },
              lineWidth: "1px",
              tick: {
                lineWidth: "1px",
                lineColor: "blue"
              },
              item: {
                fontColor: "blue"
              },
              lineColor: "blue"
            },
            series: [{
              values: [20, 30, 50, 35],
              backgroundColor: "skyblue",
              valueBox: {
                text: "%v%",
                placement: "in",
                offsetY: "-10px"
              }
            }, {
              values: [40, 30, 30, 40],
              backgroundColor: "navy",
            }]
          }
        });
        zingchart.render({
          id: 'chart4',
          height: '100%',
          width: '100%',
          data: {
            backgroundColor: "white",
            type: "bar",
            stacked: true,
            title: {
              text: "Users online",
              textAlign: "left",
              fontColor: "blue"
            },
            legend: {
              verticalAlign: 'bottom',
              align: 'center',
              layout: "float",
              fontSize: "10px",
              backgroundColor: "transparent",
              borderColor: "transparent",
              shadowColor: "transparent",
              toggleAction: "remove",
              marker: {
                borderColor: "transparent"
              },
              item: {
                markerStyle: "rpoly6",
                fontColor: "blue",

              }
            },
            series: [{
              values: [1637, 1619, 2464, 4289, 4859, 10186, 4285, 2707, 16618, 38444, 42541, 40284, 35921, 38673, 26457],
              text: "status 200",
              backgroundColor: "silver"

            }, {
              values: [229, 283, 671, 802, 1263, 2943, 2043, 497, 3068, 8265, 8754, 10403, 9558, 9991, 7907],
              text: "status 300",
              backgroundColor: "silver"
            }, {
              values: [10, 4, 19, 17, 18, 59, 49, 14, 168, 392, 428, 438, 330, 431, 283],
              text: "status 400",
              backgroundColor: "silver"
            }, {
              values: [1, "", 1, "", "", 5, "", 1, ""],
              text: "status 500",
              backgroundColor: "silver"
            }],
            tooltip: {
              text: "%v",
              borderRadius: "5px",
              shadow: 0,
              fontColor: "white"
            },
            plot: {
              fontColor: "white",
              hoverState: {
                visible: false
              }
            },
            plotarea: {
              margin: "65px 50px 30px 65px"
            },
            scaleX: {
              transform: {
                type: "date",
                all: "%h:%i %A",
                guide: {
                  visible: false
                },
                item: {
                  visible: false
                }
              },
              minValue: 1437516814415,
              step: 3600000,
              guide: {
                visible: false
              },
              lineColor: "#ffffff",
              lineWidth: "1px",
              tick: {
                lineColor: "#ffffff",
                lineWidth: "1px"
              },
              item: {
                fontColor: "blue"
              },
              refLine: {
                lineColor: "blue"
              }
            },
            scaleY: {
              guide: {
                lineColor: "blue"
              },
              lineColor: "blue",
              lineWidth: "1px",
              tick: {
                lineColor: "blue",
                lineWidth: "1px",
              },
              item: {
                fontColor: "blue"
              },
              refLine: {
                lineColor: "blue"
              }
            }
          }
        })
        zingchart.render({
          id: 'chart5',
          height: '100%',
          width: '100%',
          data: {
            type: 'pie3d',
            title: {
              text: 'Browser Usage',
              color: 'blue'
            },
            series: [
              {
                values : [11.38],
                text: "Internet Explorer",
                backgroundColor: '#50ADF5',
              },
              {
                values: [56.94],
                text: "Chrome",
                backgroundColor: '#FF7965',
                detached:true
              },
              {
                values: [14.52],
                text: 'Firefox',
                backgroundColor: '#FFCB45',
                detached:true
              },
              {
                text: 'Safari',
                values: [9.69],
                backgroundColor: '#6877e5'
              },
              {
                text: 'Other',
                values: [7.48],
                backgroundColor: '#6FB07F'
              }
            ]
          }

        });

        zingchart.render({
          id: 'chart6',
          height: '100%',
          width: '100%',
          data: {
            type: 'line',
            backgroundColor: "white",
            scaleY: {
              visible: false
            },
            scaleX: {
              visible: false
            },
            labels: [{
              text: "activity",
              x: "5%",
              y: "2%",
              fontSize: "50px",
              fontColor: "blue"
            }],
            plot: {
              borderWidth: "2px",
              marker: {
                visible: false
              },
              rules: [{
                rule: "%v > 20",
                lineColor: "navy"
              }, {
                rule: "%v < 5",
                lineColor: "navy"
              }]
            },
            plotarea: {
              margin: '70 20 20 20'
            },
            series: [{
              values: generateSeriesData(150),
              backgroundColor: "navy",

            }]
          }
        });
        zingchart.render({
          id: 'chart7',
          height: '100%',
          width: '100%',
          data: {
            title: {
              text: 'Transactions',
            },
            type: "area",
            backgroundColor: "white",
            plot: {
              aspect: "spline",
              alphaArea: 1,
              marker: {
                visible: true
              },
              lineWidth: "1px"
            },
            scaleX: {
              visible: false
            },
            scaleY: {
              visible: false
            },
            plotarea: {
              margin: "70 0 0 0"
            },
            labels: [{
              text: "Today",
              x: "5%",
              y: "2%",
              fontSize: "24px",
              fontColor: "skyblue"
            }, {
              text: "last month",
              x: "70%",
              y: "2%",
              fontSize: "24px",
              fontColor: "navy"
            }],
            series: [{
              values: [60, 70, 80, 70, 80, 70, 80, 90, 100, 60, 70, 80, 90, 50, 80],
              backgroundColor: "skyblue",
              lineColor: "navy"
            },  {
              values: [10, 20, 30, 20, 10, 20, 20, 30, 40, 40, 30, 20, 20, 20, 30],
              backgroundColor: "navy",
              lineColor: "#blue"
            }, ]
          }
        });

        zingchart.render({
          id: 'chart8',
          height: '100%',
          width: '100%',
          data: {
            type: 'hbar',
            backgroundColor: 'white',
            plotarea: {
              margin: 'dynamic'
            },
            title: {
              text: "Distribution",
              textAlign: "left",
              fontColor: "blue",
              adjustLayout: true
            },
            subtitle: {
              fontColor: "blue",
              textAlign: "left"
            },
            scaleX: {
              lineColor: "transparent",
              item: {
                fontColor: "blue",
              },
              tick: {
                lineColor: "transparent",
              },
              labels: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"]
            },
            scaleY: {
              maxValue: 15,
              lineColor: "transparent",
              item: {
                fontColor: "blue"
              },
              guide: {
                lineStyle: "solid",
                lineColor: "navy"
              },
              tick: {
                lineColor: "navy",
              }
            },
            plot: {
              hoverState: {
                visible: false
              },
              valueBox: {
                placement: 'top'
              },
              tooltip: {
                visible: false
              }
            },
            series: [{
              values: [2, 3, 5, 6, 8, 10, 12],
              backgroundColor: "blue"
            }]
          }
        })




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

        function generateSeriesData(num) {
          var values = [];
          var startDate = 1349617440000;
          for (var i = 0; i < num; i++) {
            values.push([(startDate + (i * 50000)), Math.floor(Math.random() * 30)])
          }
          return values;
        }

        // make data appear to be moving
        setInterval(function() {
          zingchart.exec('chart6', 'setseriesvalues', {
            plotindex: 0,
            values: generateSeriesData(150)
          });
        }, 500);
        }

    }



    render() {


        return (
            <div className="dashboardWrapper">
                <div className='dashboard'>

                <div className='column'>

                  <div id="chart1" className='item'></div>
                  <div id="chart2" className='item'></div>
                  <div id="chart3" className='item'></div>

                </div>

                <div className='column'>

                  <div id="chart4" className='item'></div>

                </div>

              </div>

              <div className='dashboard'>

                <div className='column'>

                  <div id="chart5" className='item'></div>

                </div>

                <div id="br">

                  <section>

                    <div id="chart6" className='small item'>

                    </div>
                    <div id="chart7" className='small item'></div>

                  </section>

                  <div className='column'>

                    <div id="chart8" className='item'></div>

                  </div>

                </div>

              </div>
            </div>
        )
    }
}
