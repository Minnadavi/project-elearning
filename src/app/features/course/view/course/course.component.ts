import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { CourseModel } from '../../model/course.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  ngOnInit(): void {
    this.fetchAllCourses();
  }

  isModalOpen = false;
  editID: string = '';
  courses: CourseModel[] = [];

  service = inject(CourseService);

  courseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  fetchAllCourses() {
    this.service.getCourseList().subscribe({
      next: (data: any) => {
        this.courses = data;
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  addCourse() {
    this.service.addCourse(this.courseForm.value).subscribe({
      next: (value) => {
        this.fetchAllCourses();
        this.closeModal();
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  editCourse(course: any) {
    this.courseForm.patchValue({
      name: course.name,
      duration: course.duration,
      category: course.category
    });
    this.isModalOpen = true;
    this.editID = course.id;
    console.log(this.editID);

  }

  updateCourse() {
    console.log(this.editID);
    this.service.updateCourse(this.editID, this.courseForm.value).subscribe({
      next: (value) => {
        this.fetchAllCourses();
        this.closeModal();
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  deleteCourse(id: string) {
    this.service.deleteCourse(id).subscribe({
      next: (value) => {
        this.fetchAllCourses();
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editID = '';
    this.courseForm.reset();
  }

}
