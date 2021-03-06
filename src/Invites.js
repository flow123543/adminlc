import React, {Component} from 'react';
import Parse from 'parse';

import invites from "./invites.css"


export default class Invites extends Component {
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
    }

    handleEmailSend = (e) => {
        if(this.state.emailSend === "") {
        }
        else {
            let string = this.state.emailSend.replace(/ /g, '').split(',');
            if(string.length > 50) {
                alert("The maximum to send is 50 people at a time.")
            }
            else
            {
                let invalid = false;

                for(let i = 0; i < string.length; i++) {

                    let em = string[i];

                    if(isEmail(em)) {
                    }
                    else
                    {
                        invalid = true;
                    }
                }

                if(invalid === false)
                {
                    Parse.Cloud.run('sendReferralEmailsCustom', {
                        "emails":string
                    }, {
                    success: (results) => {
                        alert('sent emails')
                    },
                    error:(err) => {
                        alert(err.message)
                    }})
                }
                else
                {
                    alert('Some of your emails are invalid.')
                }
            }
        }
    }

    handlePhoneSend = (e) => {

            let phones = this.state.phoneNumber.replace(/ /g, '').split(',')

            if(phones.length > 50)
            {
                alert("The maximum to send is 50 people at a time.")
            }
            else
            {
                let invalid = false;
                for(let i = 0; i < phones.length; i++) {

                    let em = phones[i];

                    if(isEmail(em)) {
                    }
                    else
                    {
                        invalid = true;
                    }
                }

                if(invalid === false)
                {
                    Parse.Cloud.run('sendPhoneNumberCustom', {
                        "phone": this.state.phoneNumber,
                        "message": this.state.phoneNumberMessage
                    }, {
                    success: (results) => {
                        alert('sent to phone')
                    },
                    error: (err) => {
                        alert(err.message)
                    }})

                }
                else
                {
                    alert('Some of your emails are invalid.')
                }
            }

    }



    render() {
        return (
            <div className="dashboard">


                          <div className='column'>

                            <div className='item2'>

                             <p className="title">Invite Users By Emails (50 max)</p>
                            <div className="inputContainer">
                                <input value={this.state.emailSend}
                                   onChange={(e) => this.setState({"emailSend":e.target.value})}
                                   type="text"
                                   placeholder="Seperate emails with a comma" />
                                <textarea value={this.state.emailMessage}
                                      onChange={(e) => this.setState({"emailMessage":e.target.value})}
                                      rows="4"
                                      placeholder="Custom Message (if kept empty, default message will show)"></textarea>
                            <br style={{"clear":"both"}} />
                            </div>
                        {this.state.emailSend !== "" ?
                            <a onClick={this.handleEmailSend} className="pull-right settingsBttn greenBttn">Send Emails</a>
                            :
                            ""
                        }
                        <br style={{"clear":"both"}} />



                            </div>

                            <div className='item2'>
 <p className="title">Invite Users By Emails (50 max)</p>
                            <div className="inputContainer">
                                <input value={this.state.emailSend}
                                   onChange={(e) => this.setState({"emailSend":e.target.value})}
                                   type="text"
                                   placeholder="Seperate emails with a comma" />
                                <textarea value={this.state.emailMessage}
                                      onChange={(e) => this.setState({"emailMessage":e.target.value})}
                                      rows="4"
                                      placeholder="Custom Message (if kept empty, default message will show)"></textarea>
                            <br style={{"clear":"both"}} />
                            </div>
                        {this.state.emailSend !== "" ?
                            <a onClick={this.handleEmailSend} className="pull-right settingsBttn greenBttn">Send Emails</a>
                            :
                            ""
                        }
                        <br style={{"clear":"both"}} />



                            </div>

                         </div>

                        <div className='column'>

                            <div className='item2'>
                            <p className="title">Invite/message analytics</p>
                            <div className="inputContainer">
                                <input value={this.state.emailSend}
                                   onChange={(e) => this.setState({"emailSend":e.target.value})}
                                   type="text"
                                   placeholder="Seperate emails with a comma" />
                                <textarea value={this.state.emailMessage}
                                      onChange={(e) => this.setState({"emailMessage":e.target.value})}
                                      rows="4"
                                      placeholder="Custom Message (if kept empty, default message will show)"></textarea>
                            <br style={{"clear":"both"}} />
                            </div>
                        {this.state.emailSend !== "" ?
                            <a onClick={this.handleEmailSend} className="pull-right settingsBttn greenBttn">Send Emails</a>
                            :
                            ""
                        }
                        <br style={{"clear":"both"}} />



                            </div>

                            <div className='item2'>

 <p className="title">Email templates</p>
                            <div className="inputContainer">
                                <input value={this.state.emailSend}
                                   onChange={(e) => this.setState({"emailSend":e.target.value})}
                                   type="text"
                                   placeholder="Seperate emails with a comma" />
                                <textarea value={this.state.emailMessage}
                                      onChange={(e) => this.setState({"emailMessage":e.target.value})}
                                      rows="4"
                                      placeholder="Custom Message (if kept empty, default message will show)"></textarea>
                            <br style={{"clear":"both"}} />
                            </div>
                        {this.state.emailSend !== "" ?
                            <a onClick={this.handleEmailSend} className="pull-right settingsBttn greenBttn">Send Emails</a>
                            :
                            ""
                        }
                        <br style={{"clear":"both"}} />


                            </div>

                        </div>
            </div>
        )
    }
}

function isEmail(object) {
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(object).toLowerCase());
}
