import { Todo } from "./../models/Todo";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit: string = "?_limit=5";
  todosCollection: AngularFirestoreCollection;
  todos: Observable<Todo[]>;
  private todoDoc: AngularFirestoreDocument<Todo>;
  todo: Observable<Todo>;
  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.todosCollection = this.afs.collection<Todo>("todos");
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getTodos(): Observable<Todo[]> {
    return this.todos;
  }
  toggleCompleted(todo: Todo): void {
    this.todoDoc = this.afs.doc(`todos/${todo.id}`);
    this.todoDoc.update(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoDoc = this.afs.doc(`todos/${todo.id}`);
    this.todoDoc.delete();
  }

  addTodo(todo: any): void {
    this.todosCollection.add(todo);
    // return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
