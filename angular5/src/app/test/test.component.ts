import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-test', 
  template: `
              <h2> Welcome {{ name }} </h2>
              <h2> {{ name.toUpperCase() }} </h2>
              <p> {{ name.length }} </p> 
              <h1> {{ greetUser() }} </h1>
              <h1 class="text-success"> {{ siteUrl }} </h1>
              <h1 [class]="successClass"> {{ siteUrl }} </h1>
              <h5 [style.color]="hasError ? 'red' : 'green'"> color binding </h5>
              <h6 [style.color]="highlightColor"> Style Binding</h6>
              <h2 [ngStyle]="titleStyles">Style Binding 1</h2><br>

              <button (click)="onClick()">button</button>
              {{ greeting }}  
              <br> <br>
              <input #myInput type="text" placeholder="writes something and click log and chk console DOM"> 
              <button (click)="logMessage(myInput.value)">Log</button><br><br>

              <input [(ngModel)]="two_way_binding" type="text">
              {{ two_way_binding }}

              <div *ngIf="displayName; then thenBlock; else elseBlock"> </div>
              <ng-template #thenBlock>
                <h1>First</h1>
              </ng-template>
              <ng-template #elseBlock>
                <h1>second</h1>
              </ng-template>

              <div [ngSwitch]="color">
                <div *ngSwitchCase="'red'">Picked red color</div>
                <div *ngSwitchCase="'blue'">Picked blue color</div>
                <div *ngSwitchCase="'yellow'">Picked yellow color</div>
                <div *ngSwitchDefault>Picked again</div>
              </div>

              <div *ngFor="let color of primaryColors; index as i;first as f;last as l;odd as o; even as e">
                <h2>{{ i }} {{ f }} {{ l }} {{ o }} {{ e }} {{ color }}</h2>
              </div>

              <h2>{{ "Hello " + parentData }}</h2>

              <button (click)="fireEvent()">Send Event</button> 

              <h2>{{ username | uppercase }}</h2>
              <h2>{{ content | titlecase }}</h2>
              <h2>{{ username | slice:3:5 }}</h2>
              <h2>{{ person | json }}</h2>
              <h2>{{ date }}</h2>
              <h2>{{ date | date:'short' }}</h2>
              <h2>{{ date | date:'mediumDate'}}</h2>
              <h2>{{ date | date: 'shortTime'}}</h2>
              <h2>{{ date | date: 'mediumTime'}}</h2>
              <h2>{{ date | date: 'longTime'}}</h2>

              <h2>Employee List</h2> 
              <ul *ngFor="let employee of employees" class="ul_class">
                <li>{{ employee.name }}</li>
              </ul>


              <h2>Employee Details</h2> 
              <ul *ngFor="let employee of employees">
                <li>{{ employee.id }}. {{ employee.name }} - {{ employee.age }}</li>
              </ul>

            `, 
  styles: [`
            .text-success {
              color: green;
            }
            .text-danger {  
              color: red;
            }
            .text-special {
              font-style: italic; 
            }
          `]
})
export class TestComponent implements OnInit {
  public name = "Adarsh";            
  public siteUrl = window.location.href;
  public successClass = "text-success";
  public hasError = true;
  public highlightColor = "orange";
  public titleStyles = {
                          color: "blue",
                          fontStyle: "italic"
                        };
  public greeting="";
  public two_way_binding="";
  displayName = false;
  public color= "red";
  public primaryColors = ["red", "blue", "orange", "pink"];

  public username = "adarsh";
  public content = "first letter of every word is in caps";
  public person = {
      "FirstName":"Adarsh",
      "SecondName":"Uppala"
  }
  public date = new Date();
  public employees = [];

  @Input() public parentData;
  @Output() public childEvent= new EventEmitter(); 

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this._employeeService.getEmployees()
      .subscribe(data=> this.employees = data);
  }

  greetUser(){
    return "Hello " + this.name;
  }

  onClick(){ 
    this.greeting = "welcome buddy";
  }
   
  logMessage(value){
    console.log(value);
  }

  fireEvent(){
    this.childEvent.emit('child_to_parent');
  }
}
