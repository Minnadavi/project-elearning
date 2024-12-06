import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { InstructorService } from '../../service/instructor.service';
import { InstructorModel } from '../../model/instructor.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent implements OnInit {

  service = inject(InstructorService);

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchCourses();
    this.fetchInstructorData();
  }

  isModalOpen: boolean = false;
  instructors: InstructorModel[] = [];
  courses: string[] = [];
  users: any[] = [];
  editID: string = '';
  selectedUser: any = {};

  instrutorForm = new FormGroup({
    id: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
  })

  fetchInstructorData() {
    this.service.getInstructorData().subscribe({
      next: ((data: any) => this.instructors = data),
      error: ((error: any) => console.error(error))
    });
  }

  getSelectedInstructor() {
    this.selectedUser = this.users.find((us) => us.id === this.instrutorForm.value.id);
  }

  addInstructorData() {
    let data = {
      name: this.selectedUser.name,
      specialization: this.selectedUser.specialization,
      courses: this.instrutorForm.value.course
    };
    console.log(data);

    this.service.addNewInstructor(data).subscribe({
      next: ((val) => {
        this.fetchInstructorData();
        this.closeModal();
      }),
      error: ((err) => console.error(err)),
    });
  }

  editinstructordata(data: any) {
    this.editID = data.id;
    this.openModal();
  }

  updateinstructordata() {
    let data = {
      name: this.selectedUser.name,
      specialization: this.selectedUser.specialization,
      courses: this.instrutorForm.value.course
    }
    this.service.updateInstructorData(this.editID, data).subscribe({
      next: ((val) => {
        this.fetchInstructorData();
        this.closeModal();
      }),
      error: ((err) => console.error(err)),
    });
  }

  deleteinstructordata(id: string) {
    this.service.deleteInstructorData(id).subscribe((val) => this.fetchInstructorData());
  }

  fetchUsers() {
    this.service.getallusers().subscribe({
      next: ((data: any) => this.users = data),
      error: (error) => console.error(error)
    });
  }

  fetchCourses() {
    this.service.getallcourses().subscribe({
      next: ((data: any[]) => {
        data.forEach((element, index) => {
          this.courses.push(element.name);
        });
      }),
      error: (error) => console.error(error)
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.instrutorForm.reset();
    this.editID = '';
  }
}
