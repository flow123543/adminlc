import React from "react"
import {NavLink,Link} from 'react-router-dom';
import "./settings.css";
import Parse from "parse";
import $ from "jquery";



export default class Security extends React.Component {
    constructor(props){
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleResetP = this.handleResetP.bind(this);
        this.state = {
            "phone":"",
            "phoneVerified":false,
            "sessionData":[],
            "email":"",
            "username":"",
            "src":"",
            "fname":""
        }
    }

    handleImageUpload(e){
        $(this.refs.fileImageUpload).click();
    }
    uploadImage(e){
        var fileUploadControl = e.target;
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          if (file.type == "image/png" || file.type == "image/jpeg" || file.type == "image/jpg") {
                var name = this.state.fname + "-" + this.state.lname+ "profileImage" + file.type.split('/').pop();
                var parseFile = new Parse.File(name, file);
                parseFile.save().then(function(object) {

                var GameScore = Parse.Object.extend("_User");
                var query = new Parse.Query(GameScore);
                query.equalTo("objectId", Parse.User.current().id);
                query.first({
                  success: function(data) {
                        data.set("src", parseFile);
                        data.save(null, {
                          success: function(gameScore) {
                            window.location.reload();
                          }, error:function(err){
                            alert(JSON.stringify(err))
                          }
                        });
                  },
                  error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                  }
                });
                }, function(error) {
                 alert(JSON.stringify(error))
                });

          } else {
            this.refs.changePictureTab.innerHTML = "Invalid File Format."
            this.refs.changePictureTab.style.color = "red";
          }
        }
    }
    handleChangePassword(){
        this.setState({"changePasswordReset":!this.state.changePasswordReset});
    }
    handleResetP(){
        Parse.User.requestPasswordReset(this.state.email, {
          success: function() {
            Parse.User.logOut().then(() => {
                window.location.href = "login/";
            });
          },
          error: function(error) {
            alert(error.message);
          }
        });
    }






    render(){
        return (
            <div>
                <div className="page settingsPage">
                    <div className="dashWrapperB">
                        <div className="dashModal seperator" style={{"width":"10%"}}></div>
                        <div className="dashModal contentPage" style={{"width":"80%"}}>
                            <div className="content " style={{"height":"auto"}}>
                                <SettingsHeader />
                                <div className="settingsWrapper">
                                    <p className="title">User Profile </p>
                                    <div className="instantChangesCo">
                                        <ul>
                                            <li>
                                                <div className="pull-left dAccountPreview">
                                                {
                                                    this.state.src == "" || this.state.src == undefined ?
                                                      <div>
                                                        <div className="image noImage" style={{"backgroundColor":"rgb(6, 103, 208)","color":"white","width":"50px","height":"50px","fontSize":"25px"}}>{this.state.fname.split('')[0]}</div>
                                                      </div>
                                                    :
                                                      <div>
                                                        <div className="image" style={{"backgroundImage":"url('"+this.state.src+"'","width":"50px","height":"50px"}} ></div>
                                                      </div>
                                                }
                                                </div>
                                                <p className="changePictureText pull-left">
                                                    <span ref="changePictureTab">Change Picture</span>
                                                    <span>Max file size is 20Mb.</span>
                                                </p>
                                                <p className="uploadButton pull-right">
                                                    <input type="submit" onClick={this.handleImageUpload} value="Upload" />
                                                    <input ref="fileImageUpload" onChange={this.uploadImage} type="file" accept="images/*" id="hUpload" name="newUserPicture" hidden />
                                                </p>
                                            </li>
                                            <li>
                                                <div className="changePictureCon changePasswordContainer">
                                                    <p className="changePictureText pull-left ">
                                                        <span>{this.state.changePasswordReset == true ? "Are you sure?" : "Change Password"}</span>
                                                        <span>{this.state.changePasswordReset == true ? "We will send a reset password email." : "We send you a reset password email."}</span>
                                                    </p>
                                                    <p className="uploadButton pull-right">
                                                        {
                                                            this.state.changePasswordReset == true ?
                                                            <span>
                                                                <a onClick={this.handleChangePassword}>Never Mind</a>&emsp;
                                                                <a onClick={this.handleResetP} style={{"background": "rgb(0, 106, 208)", "border": "0px", "color": "white"}}>Reset</a>
                                                            </span>
                                                            :
                                                            <a onClick={this.handleChangePassword}>Change Password</a>
                                                        }
                                                    </p>
                                                    <br style={{"clear": "both"}} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nextDetailsInput" style={{"width":"100%"}}>
                                        <div className="inputGroups">
                                            <p className="pull-left">
                                                <span style={{"marginBottom": "4px"}}>Username</span>
                                                <span>This name will be part of your public profile.</span>
                                            </p>
                                            <p className="pull-right">
                                                <input type="text" disabled placeholder="Name" value={this.state.username} />
                                            </p>
                                        </div>
                                        <br style={{"clear": "both"}} />
                                        <div className="inputGroups">
                                            <p className="pull-left">
                                                <span>Email</span>
                                            </p>
                                            <p className="pull-right">
                                                <input type="text" disabled placeholder="Email Address" value={this.state.email} />
                                            </p>
                                        </div>
                                        <br style={{"clear": "both"}} />
    {/*                                     <p className="uploadButton pull-right" style={{"marginTop": "20px","marginRight": "-10px"}}>
                                            <a>Save</a>
                                        </p>*/}
                                    </div>
                                    <p className="title">Phone Numbers</p>
                                        <div class="instantChangesCo" style={{"paddingLeft": "0px","paddingTop": "20px","paddingBottom": "20px"}}>
                                            <ul>
                                                <li style={{"padding": "0","width":"100%"}}>
                                                    <p class="phoneNumber">
                                                        <span className="phoneNumb">{this.state.phone}</span>
                                                        { this.state.phoneVerified == true ? <span class="verified">Verified</span> : "" }
                                                        <span class="primaryPhone">Primary Phone</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <br /><br />
                                        <p style={{"border":"0"}} className="title">Account Activity</p>
                                        <p style={{"margin-bottom": "20px"}} class="description">Recent activity on your account.</p>
                                        <div class="dashTableWrap accountActivityTableSettings">
                                            <hr style={{"margin": "0","padding": "0"}} />
                                            <table class="dashTable">
                                                <tbody>
                                                    <tr class="dashTabHeader">
                                                        <th>Action</th>
                                                        <th>Authenticator</th>
                                                        <th>Installation ID</th>
                                                        <th>When</th>
                                                     </tr>
                                                     {
                                                        this.state.sessionData.map(function(index,key){
                                                            return (
                                                                    <tr key={key}>
                                                                        <td>{index.get('createdWith').action}</td>
                                                                        <td>{index.get('createdWith').authProvider}</td>
                                                                        <td>{index.get('installationId')}</td>
                                                                        <td>{index.get('createdAt').toString()}</td>
                                                                    </tr>
                                                                )
                                                        })
                                                     }
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashModal seperator" style={{"width":"10%"}}></div>
                        <br style={{"clear":"both"}} />
                    </div>
                </div>
            </div>
        )
    }
}

class SettingsHeader extends React.Component {
    render(){
        return (
            <div className="settingsHeader">
                <nav>
                    <NavLink to="/settings/profile" activeClassName="active">Details</NavLink>
                    <NavLink to="/settings/verify" activeClassName="active">Verification</NavLink>
                    <NavLink to="/settings/security" activeClassName="active">Settings</NavLink>
                </nav>
            </div>
        )
    }
}
