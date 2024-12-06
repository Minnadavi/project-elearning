import { CourseService } from './../../course/service/course.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private url = "http://localhost:3000/instructors";

  constructor(private http: HttpClient, private coureService: CourseService, private userService: AuthService) { }

  getallusers() {
    return this.userService.getUsers();
  }

  getallcourses() {
    return this.coureService.getCourseList();
  }

  getInstructorData() {
    return this.http.get(this.url);
  }

  addNewInstructor(data: any) {
    return this.http.post(this.url, data);
  }

  deleteInstructorData(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateInstructorData(id: string, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

}
