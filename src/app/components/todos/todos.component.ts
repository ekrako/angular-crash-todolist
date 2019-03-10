import { TodoService } from "./../../services/todo.service";
import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/Todo";
import { from } from "rxjs";
@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor(private todosService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().subscribe(todos => {
      console.log(todos);
      this.todos = todos;
    });
  }
}
