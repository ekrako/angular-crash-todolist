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
    this.todosService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todosService.deleteTodo(todo).subscribe(todo => {
      console.log(todo);
    });
  }
  addTodo(todo: Todo) {
    console.log(todo);
    this.todosService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }
}
