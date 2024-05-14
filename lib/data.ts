import { create } from "zustand";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  content: string;
}

interface TodoState {
    todo: Todo;
    todoList: Todo[];
    setTodo: (todo: Todo) => void;
    setTodoList: (todoList: Todo[]) => void;
}

const useTodo = create<TodoState>((set) => ({
    todo: { id: 0, title: '', completed: false, content: '' },
    setTodo: (t: Todo) => set({ todo: t }),
    todoList: [],
    setTodoList: (todoList: Todo[]) => set({ todoList: todoList }),
}));


export { useTodo };
export type { Todo };