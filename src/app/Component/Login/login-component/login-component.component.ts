import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {

  constructor() {}
  private http = inject(HttpClient)
  private router = inject(Router)
  

  signin:boolean = false
  login:boolean = true

  loginFunc(){
    this.login = true
    this.signin = false
  }

  signupFunc(){
    this.login = false
    this.signin = true
  }

  mainLogin(){
    let login = document.getElementById("loginid")as HTMLInputElement
    let passw = document.getElementById("password")as HTMLInputElement
    let loginId = login.value
    let password = passw.value
    
    this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      const users = data;
      const user = users.find((u: any) => u.email === loginId && u.password === password);
      let id = user.id
      console.log(id);
      

      if (user) {
        this.router.navigate(["todo",id]); 
        
      } else {
        console.log("Unsuccessful Login");
      }
    })
  }

  registerUser() {
    let nam = document.getElementById("name") as HTMLInputElement;
    let mail = document.getElementById("email") as HTMLInputElement;
    let pass = document.getElementById("pass") as HTMLInputElement;
    let cpass = document.getElementById("cpass") as HTMLInputElement;
  
    const newUser = {  
      name: nam.value,
      email: mail.value,
      password: pass.value,
      todo_list: [],
      done_list: []
    };
  
    // Check if the passwords match
    if (pass.value !== cpass.value) {
      alert("Please type the same password");
      return;
    }
  
    // Check if the email is already present in the database
    this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      const existingUser = data.find((user: { email: string; }) => user.email === newUser.email);
      if (existingUser) {
        alert("Email already exists. Please use a different email.");
      } else {
        // If email is not present, proceed with registration
        this.http.post('http://localhost:3000/users', newUser).subscribe((data: any) => {
          console.log("Successful registration");
          this.signin = false;
          this.login = true;
        }, (error) => {
          console.log("HTTP error");
        });
      }
    }, (error) => {
      console.log("HTTP error");
    });
  }
  

}
