import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:3000/courses";

  getCourseList() {
    return this.http.get<any[]>(this.url);
  }

  addCourse(course: any) {
    return this.http.post(this.url, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateCourse(id: string, course: any,) {
    return this.http.put(`${this.url}/${id}`, course);
  }
}
