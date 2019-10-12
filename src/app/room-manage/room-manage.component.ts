import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, Form } from "@angular/forms";
import { ApiService } from '../api.service';
@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.scss']
})
export class RoomManageComponent implements OnInit {

//using formbuilder
  roomForm = this.fb.group({
    file: [null, Validators.required],
    roomName: ["",Validators.required],
    description: ["",Validators.required]
  });

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder,) { }

  ngOnInit() {
    // this.createFormControls();
    // this.createForm();
  }

  onSubmit() {
    if (this.roomForm.valid) {
      console.log("Form Submitted!");
      console.log(this.roomForm.value);
      this.apiService.roomUpload(this.roomForm.value).subscribe(
        res => {
          console.log(res);
        }
      );
      this.roomForm.reset();
      // this.onFileChange(event);
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.roomForm.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }


}
