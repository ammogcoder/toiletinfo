import React from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation } from "react-router-dom"; 
import repo from '../logic/repo.js';
import toilet from '../logic/toilet.js'; 

class list extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		Note: "" ,
		country: "",
		mainpicture: "",
		environmentpicture: "",
		mainpicturep: "",
		environmentpicturep: "",
		alldata: []
	  };  
	  this.getTableContent = this.getTableContent.bind(this);
	  this.iterateItem = this.iterateItem.bind(this);
	  this.deleteAll = this.deleteAll.bind(this);
	  this.deleteOne = this.deleteOne.bind(this);
	  this.refreshRecords = this.refreshRecords.bind(this);
	}

	refreshRecords(){
		var r = new repo();
		this.setState({alldata: r.getallrecords()});
		this.getTableContent(this.state.alldata);
	}
	componentDidMount(){
		var r = new repo();
		this.setState({alldata: r.getallrecords()}); 
		//console.log(r.getallrecords());
	} 
	
	deleteAll(e){
		e.preventDefault();
		if (window.confirm('Delete all records?'))
		{
			var r = new repo();
			r.clearallrecords();
			this.refreshRecords();

		}   
	}

	deleteOne(e){
		e.preventDefault();
		var t=e.target
		if (window.confirm('Delete?'))
		{
			var r = new repo();
			r.removerecord(t.id);
			this.refreshRecords();
		}   
	}

	iterateItem(item) {
		console.log(item);
		return item.map(function (nextItem, j) {
		  return (
			 <tr key={nextItem.id}>
				<td>{nextItem.note}</td>
				<td>{nextItem.country}</td>
				<td><img src={nextItem.mainpicture}  /></td>
				<td><img src={nextItem.environmentpicture}  /></td> 
				<td><a href='#' id={nextItem.id} onClick={this.deleteOne.bind(this)} >Delete?</a></td>
			 </tr>
		  );
		}, this)
	 }

	getTableContent (arr) {
		//console.log(item);		
		//return arr.map(function (item, i) {
			if (arr.length>0){
			return (
				<table style={{width: "90%", cellpadding: "4"}}>
				<thead style={{background: "#eeeeee", height: "45", margin: "8px"}}>
					<th>Note</th>
					<th>Country</th>
					<th>Main Picture</th>
					<th>Environment</th>
					<th>Action</th>
				</thead>
					<tbody>
						{this.iterateItem(arr)}
					</tbody>
				</table>
			);
		}else{
				return (<div style={{fontWeight: "bold", fontSize: "large", textAlign: "center"}}>No Record Found</div>);
		}
		//});
	}
	render() {
		return (
			<div style={{margin: "30px"}}>
			<h3>List of Toilet </h3>
			<span style={{cursor: "pointer", textAlign: "right"}} ><a onClick={this.deleteAll}>Delete All?</a></span>
			<table style={{ width: "100%", textAlign: "center" }} cellPadding="8px"> 
				<thead></thead>
                <tbody  style={{
                    cellpadding: "1px",
                    callspacing: "0",
                    border: "1px",
                  }}> 
                    {this.getTableContent(this.state.alldata)}
                </tbody> 
			</table>

			</div>
		);
	}
}	
export default list;
 
