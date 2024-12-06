import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { StudentModel } from '../../model/student.model';
import { StudentService } from '../../service/student.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit, OnDestroy {

  constructor(private elementRef: ElementRef) { }

  availableCourses: string[] = [
    "Math",
    "Science",
    "History",
    "Geography",
    "English"
  ];

  courseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required]),
    progress: new FormControl(0),
  });

  ngOnInit(): void {
    this.fetchStudents();
  }

  isModalOpen = false;
  editID = '';
  students: StudentModel[] = [];

  service = inject(StudentService);

  fetchStudents() {
    this.service.getstudent().subscribe({
      next: (data: any) => {
        this.students = data;
        this.plotChart();
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  addNewStudent() {
    this.service.addstudent(this.courseForm.value).subscribe({
      next: (value: any) => {
        this.fetchStudents();
        this.closeModal();
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  editCourse(student: any) {
    this.editID = student.id;
    this.courseForm.patchValue({
      name: student.name,
      course: student.course,
      progress: student.progress,
    });
    this.isModalOpen = true;
  }

  updateCourse() {
    this.service.updatestudent(this.editID, this.courseForm.value).subscribe({
      next: (value) => {
        this.fetchStudents();
        this.closeModal();
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  deleteCourse(id: any) {
    this.service.deletestudnet(id).subscribe({
      next: (value) => {
        this.fetchStudents();
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
    this.courseForm.reset();
    this.editID = '';
  }

  createPieChart(progress: number, elementId: string) {
    const data = [progress, 100 - progress];
    const width = 40;
    const height = 40;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(["#4CAF50", "#ddd"]);

    const svg = d3.select(`#${elementId}`).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", `translate(${width / 2},${height / 2})`);
    const pie = d3.pie<number>().value((d) => d);
    const arc = d3.arc<d3.PieArcDatum<number>>().innerRadius(10).outerRadius(radius);

    // to plot the chart
    svg.selectAll("path").data(pie(data)).enter().append("path").attr("d", arc).attr("fill", (d, i) => color(i.toString()));

    //to plat text the chat
    svg.append("text").attr("text-anchor", "middle").attr("dy", "0.35em").style("font-size", "14px").style("font-weight", "400").text(`${progress}%`);
  }

  plotChart() {
    setTimeout(() => {
      this.students.forEach((student, index) => {
        this.createPieChart(student.progress, `chart-${index}`);
      });
    }, 300);
  }

  ngOnDestroy(): void {
    this.students.forEach((stud, index) => {
      d3.select(this.elementRef.nativeElement).select(`chart-${index}`).remove();
    });
  }

}
