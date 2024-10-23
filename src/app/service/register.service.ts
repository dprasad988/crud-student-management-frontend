import { Injectable } from "@angular/core";
import { enviroments } from "../environments/environment-development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RegisterService{
    private apiUrl = enviroments.apiUrl;
    constructor(private http: HttpClient){}

    public saveStudent(studentData: any){
        return this.http.post(`${this.apiUrl}/student`, studentData)
    }

    public getStudents(): Observable<any[]>{
        return this.http.get<any[]>(`${this.apiUrl}/student`);
    }

    public updateStudent(id: number, studentData: any){
        return this.http.put(`${this.apiUrl}/student/${id}`, studentData)
    }

    public deleteStudent(id: number){
        return this.http.delete(`${this.apiUrl}/student/${id}`)
    }


}