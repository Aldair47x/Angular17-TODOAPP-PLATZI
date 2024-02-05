import { Component, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


interface Task {
  name: string;
  done: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  data: Array<Task> = [
    { name: 'Save the world', done: false },
    { name: 'Climb a mountain', done: true },
    { name: 'Buy an unicorn', done: false },
  ];

  tasks = signal(this.data);

  taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  taskControlEditing = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  updateTaskState(index: number, done: boolean) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) => (i === index ? { ...task, done } : task))
    );
  }

  updateTaskEditing(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index
          ? { ...task, editing: true }
          : { ...task, editing: false }
      )
    );
  }

  updateTaskName(index: number) {
    const inputName = this.taskControlEditing.value;
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index
          ? { ...task, name: inputName, editing: false }
          : { ...task }
      )
    );
  }

  addTask(task: Task) {
    this.tasks.update((tasks) => [...tasks, task]);
  }

  changeHandler() {
    if (this.taskControl.valid) {
      const value = this.taskControl.value.trim();
      if (value !== '') {
        this.addTask({ name: value, done: false });
        this.taskControl.reset();
      }
    }
  }
}
