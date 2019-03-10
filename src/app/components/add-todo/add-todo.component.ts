import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/models/Todo";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"]
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  title: string;
  constructor(private todoService: TodoService) {}

  ngOnInit() {}
  onSubmit() {
    const todo = {
      title: this.title,
      completed: false
    };
    console.log(todo);
    this.todoService.addTodo(todo);
  }
}
