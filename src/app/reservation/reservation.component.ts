import { Component, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, Form } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ConvertService } from '../convert.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  data: Date;
  bsInlineValue = new Date();
  selectedCells = [];
  minDate: Date;
  maxDate: Date;
  ids = [];
  rooms = [407,408,409,501];
  timeslots = ['09.00','10.00','11.00','12.00','13.00','14.00','15.00','16.00','17.00'];
  test: string='';

  onValueChange(value: Date): void {
    this.data = value;
  }

  changeClass(){
    this.test = 'selected';
  }

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router,
    private elementRef: ElementRef) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 14);
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'; //back ground color
    this.selection();
    this.createFormControls();
    this.createForm();
  }

  public selection() {
    var temp = this.selectedCells;
    var temp_id = this.ids;
    var index, index2: number;

    $('#timetable td').click(function () {
      if ($(this).hasClass('')) {
        $(this).addClass('selected');
        temp.push(this.title);
        temp_id.push((this.id).toString());
        console.log(temp);
        console.log(temp_id);
      } else {
        $(this).removeClass('selected');
        index = temp.indexOf(this.title);
        temp.splice(index, 1);
        index2 = temp_id.indexOf(this.id);
        temp_id.splice(index2, 1);
        console.log(temp);
        console.log(temp_id);
      }
    });
  }

  onSubmit() {
    if (this.booking.valid) {
      console.log("Form Submitted!");
      this.booking.get('rid').patchValue(this.ids.join('|'));
      this.booking.get('date').patchValue(this.data);
      this.booking.get('room').patchValue(this.ids.toString().substring(1,4));
      this.apiService.onInsert(this.booking.value).subscribe(
        res => {
          console.log(res);
        }
      );
      this.booking.reset();
    }
  }

  booking: FormGroup;
  userName: FormControl;
  tel: FormControl;
  room: FormControl;
  rid: FormControl;
  date: FormControl;
  timein: FormControl;
  timeout: FormControl;

  createFormControls() {
    this.userName = new FormControl("", Validators.required);
    this.tel = new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
    this.rid = new FormControl(""),
    this.date = new FormControl(""),
    this.timein  = new FormControl(""),
    this.timeout  = new FormControl(""),
    this.room  = new FormControl("")
  }

  createForm() {
    this.booking = new FormGroup({
      userName: this.userName,
      tel: this.tel,
      rid: this.rid,
      date: this.date,
      timein: this.timein,
      timeout: this.timeout,
      room: this.room
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngAfterViewInit() {
  }
}