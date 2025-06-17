import { createStore } from "vuex";
import api from "../api/mockApi";
import type { Task } from "../types";
export default createStore({
   state: {
      tasks: [] as Task[],
      filter: 0 as Number,
   },
   getters: {
      tasks: (state) => state.tasks,
      filteredTasks: (state) => {
         if (state.filter == 0) {
            return state.tasks;
         } else if (state.filter == 1) {
            return state.tasks.filter((task) => task.completed);
         } else if (state.filter == 2) {
            return state.tasks.filter((task) => !task.completed);
         }
      },
   },
   mutations: {
      SET_TASKS(state, tasks: Task[]) {
         state.tasks = tasks;
      },
      SET_NEW_TASK(state, task: Task) {
         state.tasks.push(task);
      },
      REMOVE_TASK(state, id: Number) {
         state.tasks = state.tasks.filter((item) => item.id !== id);
      },
      CHANGE_STATUS(state, id: Number) {
         let index = state.tasks.findIndex((item) => item.id == id);

         state.tasks[index].completed = !state.tasks[index].completed;
      },
   },
   actions: {
      async getTasks({ commit }) {
         try {
            const tasks = await api.getTasks();
            commit("SET_TASKS", tasks);
         } catch (error) {
            console.error("Ошибка при загрузке задач:", error);
         }
      },
      addTask({ commit }, newTaskName) {
         const newTask = {
            id: Date.now(),
            title: newTaskName,
            completed: false,
         };
         commit("SET_NEW_TASK", newTask);
      },
   },
   modules: {},
});
