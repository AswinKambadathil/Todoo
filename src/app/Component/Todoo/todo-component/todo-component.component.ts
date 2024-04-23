import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-component',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './todo-component.component.html',
  styleUrl: './todo-component.component.scss'
})
export class TodoComponentComponent implements OnInit {
  

  ngOnInit(): void {
    this.pending()
    this.calculateListCounts()
  }
  id: any = ""
  user: any = []
  editedTask: string = '';
  editingMode: boolean = false;
  todoListCount: number = 0;
  doneListCount: number = 0;


  constructor() { }
  private http = inject(HttpClient)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  calculateListCounts() {
    this.todoListCount = this.user.todo_list.length;
    this.doneListCount = this.user.done_list.length + this.todoListCount
  }

  addTask() {
    let newTask = document.getElementById("newtask") as HTMLInputElement
    this.http.get(`http://localhost:3000/users/${this.id}`).subscribe((user: any) => {
      const id = Math.floor(Math.random() * 1000000);
      if (newTask.value == "") {
        alert("Write some task")
      }
      else {

        const newTasks = {
          id: id,
          task: newTask.value
        };
        this.user.todo_list.push(newTasks);

        (document.getElementById("newtask") as HTMLInputElement).value = "";
        this.updateUserData()
        this.calculateListCounts()
      }

    }, (error) => {
      console.log("error");
    });
  }


  pending() {
    this.route.paramMap.subscribe(params => {

      let newId = params.get('id') || '';
      this.id = newId
    })

    let userId: any = this.id

    this.http.get(`http://localhost:3000/users/`).subscribe((userData: any) => {
      this.user = userData.find((user: any) => user.id === userId);

    })
  }

  moveToDoneList(item: any) {
    this.http.get(`http://localhost:3000/users/`).subscribe((userData: any) => {
      const index = this.user.todo_list.findIndex((items: any) => items.id === item.id);
      if (index !== -1) {
        const movedItem = this.user.todo_list.splice(index, 1)[0];
        this.user.done_list.push(movedItem);
        this.updateUserData();
        this.calculateListCounts()
      }
    })
  }

  moveTotodoList(item: any) {
    this.http.get(`http://localhost:3000/users/`).subscribe((userData: any) => {
      const index = this.user.done_list.findIndex((items: any) => items.id === item.id);
      if (index !== -1) {
        const movedItem = this.user.done_list.splice(index, 1)[0];
        this.user.todo_list.push(movedItem);
        this.updateUserData();
        this.calculateListCounts()
      }
    })
  }

  deleteTask(item: any) {
    const index = this.user.todo_list.findIndex((todoItem: any) => todoItem.id === item.id);
    if (index !== -1) {
      this.user.todo_list.splice(index, 1);
      this.updateUserData();
    }
    this.calculateListCounts()
  }

  deleteTasks(item: any) {
    const index = this.user.done_list.findIndex((doneItem: any) => doneItem.id === item.id);
    if (index !== -1) {
      this.user.done_list.splice(index, 1);
      this.updateUserData();
      this.calculateListCounts()
    }
  }

  updateUserData() {
    this.http.put(`http://localhost:3000/users/${this.id}`, this.user).subscribe(response => {
    });
  }

  logout() {
    this.router.navigate(["login"]);
  }


  editTask(task: any) {
    this.editedTask = task.task;
    (document.getElementById("newtask") as HTMLInputElement).value = this.editedTask;
    this.editingMode = true;
  }

  updateTask() {
    if (this.editedTask !== '') {
      const index = this.user.todo_list.findIndex((task: any) => task.task === this.editedTask);
      if (index !== -1) {
        this.user.todo_list[index].task = (document.getElementById("newtask") as HTMLInputElement).value;
        this.updateUserData();
        this.editedTask = '';
        this.editingMode = false;
        (document.getElementById("newtask") as HTMLInputElement).value = "";
      }
    }
  }


}
