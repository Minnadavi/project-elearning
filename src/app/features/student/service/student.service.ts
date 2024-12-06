import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = "http://localhost:3000/students";

  constructor(private http: HttpClient) { }

  getstudent() {
    return this.http.get(this.url);
  }

  addstudent(student: any) {
    return this.http.post(this.url, student);
  }

  deletestudnet(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updatestudent(id: string, student: any) {
    return this.http.put(`${this.url}/${id}`, student);
  }
}
