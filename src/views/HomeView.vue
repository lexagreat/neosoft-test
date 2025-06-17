<script setup lang="ts">
import store from '@/store'
import { ref, onMounted, computed } from 'vue';

onMounted(async () => {
   await store.dispatch('getTasks');
   console.log(store.state.tasks);
})
const newTaskName = ref<String>("")
const addNewTask = () => {
   if (!newTaskName.value.length) return;
   store.dispatch('addTask', newTaskName.value);
   newTaskName.value = ""
}
const removeTask = (id) => {
   store.commit('REMOVE_TASK', id);
}
const changeStatus = (id, checked) => {
   store.commit('CHANGE_STATUS', id, checked);
}
</script>

<template>
   <main>
      <div class="tasks-actions">

         <ul class="tasks-actions__filters">
            <li>
               <label>
                  <input type="radio" name="taskFilter" :value="0" v-model="store.state.filter">
                  Все
               </label>
            </li>
            <li>
               <label>
                  <input type="radio" name="taskFilter" :value="1" v-model="store.state.filter">
                  Выполненные
               </label>
            </li>
            <li>
               <label>
                  <input type="radio" name="taskFilter" :value="2" v-model="store.state.filter">
                  Активные
               </label>
            </li>
         </ul>
         <div class="tasks-actions__new" v-if="!store.state.filter">
            <input type="text" v-model="newTaskName" @keyup.enter="addNewTask">
            <button @click="addNewTask">Добавить новую задачу</button>
         </div>
      </div>
      <ul class="tasks-list">
         <li class="task-card" :class="{ completed: item.completed }" v-for="item in store.getters.filteredTasks"
            :key="item.id">
            <button @click="removeTask(item.id)" class="task-card__remove">
               X
            </button>
            <h4 class="task-card__title">{{ item.title }}</h4>
            <label>
               <input :checked="item.completed" type="checkbox" @change="changeStatus(item.id, $event.target.checked)">
               Готово
            </label>
         </li>
      </ul>
   </main>
</template>


<style lang="scss">
main {
   padding: 20px 100px;
   display: flex;
   flex-direction: column;
   gap: 32px;
}

.tasks-actions {
   display: flex;
   justify-content: space-between;
}

.tasks-actions__new {
   display: flex;
   gap: 12px;

   button {
      padding: 0 8px;
      height: 24px;
      background-color: #6f6f6f23;
      border-radius: 8px;
   }

   input {
      height: 24px;
      border: 1px solid black;
      border-radius: 8px;
   }
}

.tasks-actions__filters {
   display: flex;
   gap: 12px;

   label {
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: 1px solid black;
      padding: 0 8px;
      transition: 0.3s;

      &:has(input:checked) {
         background-color: black;
         color: white;
      }
   }

   input {
      display: none;
   }
}

.tasks-list {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 20px;
}

.task-card {
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 20px;
   padding: 12px;
   border: 1px solid red;
   border-radius: 8px;

   &.completed {
      border-color: green;
   }

   button {
      padding: 0 8px;
      height: 24px;
      background-color: #6f6f6f23;
      border-radius: 8px;
   }
}

.task-card__remove {
   position: absolute;
   top: 10px;
   right: 10px;
}
</style>