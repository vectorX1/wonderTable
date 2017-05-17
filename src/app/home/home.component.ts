import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-home',
  styles: [`
  .myRow{
      background-color: #236167;
      color: white;
      box-shadow: none;
  }
 
  `], 
  templateUrl: 'home.html'
  
})
export class HomeComponent implements OnInit {
    public data;
    public sortedData;
    public filter: string = 'All';
    public dataRow: dataPoints;
    public asc: boolean = true;
    public pageSize: number = 10;    

    clickFilter(event){      
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value =idAttr.nodeValue;
      this.filter = value;       
    }

    resetData(){
      this.filter = 'All';
      this.http.get("../src/app/data.json")                       
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 100);
            });   
    }

    assignRow(emp: dataPoints){
        this.dataRow = emp;
    }

    constructor(private http: Http) {
    }


    sortData(){
      this.sortedData = this.data.slice(0);
      
      if(this.asc){
      this.sortedData.sort((leftside, rightside):number =>  {
        if(leftside.name < rightside.name) return -1;
        if(leftside.name > rightside.name) return 1;
        return 0;
      });
    }
    else{
      this.sortedData.sort((leftside, rightside):number =>  {
        if(leftside.name < rightside.name) return 1;
        if(leftside.name > rightside.name) return -1;
        return 0;
      });
    }

      this.data = this.sortedData;
      this.asc = !this.asc;
    }

    

    ngOnInit(): void {
        this.http.get("../src/app/data.json")                       
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 100);
            });                      
    }
    
}

class dataPoints{
    public name: string;
    public email: string;
    public regDate: string;
    public city: string;    
    public age: number;
}
