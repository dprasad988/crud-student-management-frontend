import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

  constructor(private registerService: RegisterService){}

  ngOnInit(): void {
    this.getStudents();
  }

  public isAddStudentFormOpen: boolean = false;
  public isSuccess: boolean = false;
  public isDeleteModelOpen: boolean = false;
  public isEditStudentFormOpen: boolean = false;

  public students: any = []
  public newSelectedStudent: any = {}

  public student: any = {
    studentName: "",
    studentAge: "",
    studetContact: "",
    gurName: "",
    gurAge: "",
    gurContact: "",
  }

  openRegisterModel(){
    this.isAddStudentFormOpen = true;
  }
  closeRegisterModel(){
    this.isAddStudentFormOpen = false;
  }
  openDeleteModel(student: any){
    this.newSelectedStudent = {...student}
    this.isDeleteModelOpen = true;
  }
  closeDeleteModel(){
    this.isDeleteModelOpen = false;
  }
  openEditModel(student: any){
    this.newSelectedStudent = {...student}
    this.isEditStudentFormOpen = true;
  }
  closeEditModel(){
    this.isEditStudentFormOpen = false;
  }

  saveStudent(){
    this.registerService.saveStudent(this.student).subscribe({
      next:(response) =>{
        console.log("Registered Successfuly", response);
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
        this.isAddStudentFormOpen = false;
      },
      error(err) {
        console.log("registered failed", err);
      },
    })
  }

  clear(){
    this.student = {
      studentName: "",
      studentAge: "",
      studetContact: "",
      gurName: "",
      gurAge: "",
      gurContact: "",
    }
  }

  updateStudent() {
    this.registerService.updateStudent(this.newSelectedStudent.id, this.newSelectedStudent).subscribe({
      next:(response) =>{
        console.log(response);
        this.isSuccess = true;
        setTimeout(()=> {
          this.isSuccess = false;
        }, 2000)
        this.isEditStudentFormOpen = false
        this.getStudents();
      },
      error: (err) =>{
        console.log(err);
      },
    })
  }

  deleteStudent(id: number) {
    this.registerService.deleteStudent(id).subscribe({
      next:(response) => {
        console.log("Deleted successfully", response);
        this.isDeleteModelOpen = false;
        this.getStudents();
      },
      error:(err) => {
        console.log("failed to deleting", err);
      },
    })
  }

  getStudents(){
    this.registerService.getStudents().subscribe({
      next:(response: any[]) =>{
        this.students = response;
        console.log("successfully get", response);
      },
      error(err) {
        console.log("failed to get", err);
      },
    })
  }



}
