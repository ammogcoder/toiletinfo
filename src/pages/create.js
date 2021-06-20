import React from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation } from "react-router-dom"; 
import repo from '../logic/repo.js';
import toilet from '../logic/toilet.js'; 

class create extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		Note: "" ,
		country: "",
		mainpicture: "",
		environmentpicture: "",
		mainpicturep: "",
		environmentpicturep: "",
		allrecordscount: 0
	  }; 
	  this.saverecord= this.saverecord.bind(this);
	  this.searchTypeChanged= this.searchTypeChanged.bind(this);
	  this.onImageChange= this.onImageChange.bind(this);
	  this.onImageChangeEnv= this.onImageChangeEnv.bind(this);
	  this.refreshcount = this.refreshcount.bind(this);
	  this.getBase64= this.getBase64.bind(this);
	}

	saverecord(){
		 
		if ((this.state.Note == "") || (this.state.country == "") || (this.state.mainpicture == "") || (this.state.environmentpicture == "") )
		{ 		alert("Complete all fileds");
		 		return;
		}

		//save record here
		var data= new toilet();
		data.country = this.state.country;
		data.environmentpicture = this.state.environmentpicture;
		data.mainpicture = this.state.mainpicture;
		data.note = this.state.Note;

		var r = new repo();
		r.addrecord(data);
		this.setState({ Note: ""});
		this.setState({ mainpicture: ""});
		this.setState({environmentpicture: ""});
		this.setState({ mainpicturep: ""});
		this.setState({environmentpicturep: ""});
		this.setState({country: ""}); 
		document.getElementById('mainpicture').value='';
		document.getElementById('environmentpicture').value='';
		alert("Details saved");
		this.refreshcount();
	}
	
	getBase64(file, type) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
		  //console.log(reader.result);
		  if (type==1){
			this.setState({
				mainpicture:  reader.result
			  });
		  }else{
			this.setState({
				environmentpicture: reader.result
			  });
		  }
		};
		reader.onerror = function (error) {
		  console.log('Error: ', error);
		};
		return reader.result;
	 }
	
	 onImageChangeEnv = event => {
		if (event.target.files && event.target.files[0]) {
		  let img = event.target.files[0]; 
		  this.getBase64(img,2);
		  this.setState({
			environmentpicturep: URL.createObjectURL(img)
		  });
		}
	  };
	onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
		  let img = event.target.files[0];		 
		  this.getBase64(img,1);
		  this.setState({
			mainpicturep: URL.createObjectURL(img)
		  });
		}
	  };

	searchTypeChanged(event){
		const target = event.target;

		// if (target.id === 'txtMWFirstRange')
		//   this.setState({
		//     txtMWFirstRange: target.value
		//   });
		//if (target.type === "text" && target.value !== null) {
		this.setState({
			[target.id]: target.value,
		});
		console.log(this.state);
	}

	refreshcount(){
		var r = new repo();
		this.setState({allrecordscount: r.getrecordCount()});
	}
	componentDidMount(){
		this.refreshcount();
	}

	render(){
		return (
			<div style={{width: "100%"}}>
				<table style={{width: "100%"}}>
					<tr>
						<td><h3 style={{margin: "30px"}}>Create New Toilet Record</h3></td>
						<td><span>Total Records: <b>{this.state.allrecordscount}</b></span></td>
					</tr>
					</table>
			
			<table style={{ width: "80%", textAlign: "center" }} cellPadding="8px">
                <tbody
                  style={{
                    cellpadding: "1px",
                    callspacing: "0",
                    border: "1px",
                  }}
                >
				<tr>
				  <td style={{textAlign: "right"}}>Note</td>
				  <td style={{textAlign: "left"}}> 
					<textarea 
					  value={this.state.Note} cols="40" rows="8"
					  id="Note"
					  type="text"
					  onChange={this.searchTypeChanged}
					/>
				  </td> 
				</tr> 
                  <tr>
                    <td style={{textAlign: "right"}}>Country</td>
                    <td style={{textAlign: "left"}}>
                      <input
                        style={{ width: "190px" }}
                        value={this.state.country}
                        id="country"
                        type="text"
                        onChange={this.searchTypeChanged}
                      />
                    </td> 
                  </tr>  
                  <tr>
                    <td style={{textAlign: "right"}}>Main Picture</td>
                    <td style={{textAlign: "left"}}>
						<input type="file" id="mainpicture" name="mainpx" onChange={this.onImageChange} />
						<br /><img src={this.state.mainpicturep} />
                    </td> 
                  </tr>  
                  <tr>
                    <td style={{textAlign: "right"}}>Environmental Picture</td>
                    <td style={{textAlign: "left"}}>
						<input type="file" id="environmentpicture" name="mainpx" onChange={this.onImageChangeEnv} />
						<br /><img src={this.state.environmentpicturep} />
                    </td> 
                  </tr> 
				  <tr>
					  <td></td>
					  <td style={{textAlign: "left"}}>
					  <button
						id="btnsave"
						className="button"
						onClick={this.saverecord}
						>
						<b style={{ color: "#000000" }}>
							Save Toilet
						</b>
						</button>
					  </td>
				  </tr>
				</tbody>
			</table>

			</div>
		);
	}
}	
export default create;
 