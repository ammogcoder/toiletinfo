import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import repo from "../logic/repo.js";
import toilet from "../logic/toilet.js";
import "../map.css";

class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      allrecordscount: 0,
	  alldata: []
    };
    this.refreshcount = this.refreshcount.bind(this);
    this.iterateItem= this.iterateItem.bind(this);
    this.showpicture= this.showpicture.bind(this);
    this.getTableContent= this.getTableContent.bind(this);
  }

  refreshcount() {
    var r = new repo();
    this.setState({ allrecordscount: r.getrecordCount() });
	this.setState({alldata: r.getallrecords()}); 
  }
  componentDidMount() {
    var r = new repo();
    this.setState({ allrecordscount: r.getrecordCount() });
		this.setState({alldata: r.getallrecords()}); 
  }
  showpicture(e){
	  var imgs=e.target; 
	var expandImg = document.getElementById("expandedImg");
	var imgText = document.getElementById("imgtext");
	var country = document.getElementById("country");
	expandImg.src = imgs.src;
	imgText.innerHTML = imgs.alt; 
	country.innerHTML = imgs.getAttribute("info");
	expandImg.parentElement.style.display = "block";
  }
  iterateItem(item, i) {
	console.log(item);
	return item.map(function (nextItem, j) {
		if (i == 1){
	  return (
		<td class={this.column}>
			<img
			src={nextItem.mainpicture} 
			style={{width:"110px", height: "75px", cursor: "pointer"}}
		    onClick ={this.showpicture}
			info={nextItem.country}
			/>	
	   </td>
	  );} else{
		return (
			<td class={this.column}>
				<img
				src={nextItem.environmentpicture} 
				style={{width:"110px", height: "75px", cursor: "pointer"}}
				onClick ={this.showpicture}
				info={nextItem.country}
				/>	
		   </td>
		  );	  
	  }
	}, this)
 }

getTableContent (arr) {
	//console.log(item);		 
		if (arr.length>0){
		return ( 
			<table style={{textAlign: "center"}}><tr>
					{this.iterateItem(arr, 1)}
					{this.iterateItem(arr, 2)}
					</tr>
				</table> 
		);
	}else{
			return (<div style={{fontWeight: "bold", fontSize: "large", textAlign: "center"}}>No Record Found</div>);
	}
	//});
}

  render() {
	  let column="column";
	  let row ="row";
	  let closebtn= "closebtn";
	  let container ="container";
    return (
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{width: "68%"}}>
              <h3 style={{ margin: "30px" }}>Toilet Image Map</h3>
            </td>
            <td>
              <span>
                Total Records: <b>{this.state.allrecordscount}</b> |
				Total Images: <b>{this.state.allrecordscount*2}</b>
              </span>
            </td>
          </tr>
        </table>

        <div style={{display: "block", overflow: "auto", textAlign:"center"}}>
		{this.getTableContent(this.state.alldata)}   
		</div>
        <div class={container}>
          <span
            onclick="this.parentElement.style.display='none'"
            class={closebtn}
          >
            &times;
          </span>
		  <div id="country"></div>
          <img id="expandedImg" style={{width:"60%", border: "solid 1px #cccccc", textAlign: "center"}} />
          <div id="imgtext"></div>
        </div>
      </div>
    );
  }
}
export default map;
