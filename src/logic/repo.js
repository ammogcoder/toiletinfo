import toilet from './toilet.js'; 

export default class repo {
    constructor (){
        this.keyname = 'toiletdata';
    } 

    addrecord(toiletdata) {
        var currentdata =(localStorage.getItem(this.keyname))? JSON.parse(localStorage.getItem(this.keyname)) : [];
        currentdata.push(toiletdata); 
        console.log(currentdata);
        localStorage.setItem(this.keyname, JSON.stringify(currentdata));
        return 1;
    }

    removerecord(id){
        var currentdata =(localStorage.getItem(this.keyname))? JSON.parse(localStorage.getItem(this.keyname)) : [];
        currentdata = currentdata.filter(function( obj ) {
            return obj.id !== id;
          });
        localStorage.setItem(this.keyname, JSON.stringify(currentdata));
        return 1;
    }

    getallrecords(){
        var currentdata =(localStorage.getItem(this.keyname))? JSON.parse(localStorage.getItem(this.keyname)) : [];
        return currentdata;
    }

    getrecordCount(){
        var currentdata =[];
        currentdata =(localStorage.getItem(this.keyname))? JSON.parse(localStorage.getItem(this.keyname)) : [];
        return currentdata.length;
    }

    clearallrecords(){
        localStorage.removeItem(this.keyname);
    }

}