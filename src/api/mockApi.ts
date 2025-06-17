export interface Task {
   id: number;
   title: string;
   completed: boolean;
}

const tasks: Task[] = [
   { id: 1, title: "Выучить Vue", completed: true },
   { id: 2, title: "Написать приложение", completed: false },
];

export default {
   getTasks(): Promise<Task[]> {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve(tasks); // автоматически определится как Promise<Task[]>
         }, 300);
      });
   },
};
