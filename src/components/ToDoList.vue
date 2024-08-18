<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <form @submit.prevent="createTask">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newTask.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="newTask.description" required />
      </div>
      <div>
        <label for="status">Status:</label>
        <select id="status" v-model="newTask.status" required>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
           <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>
          <select v-model="task.status" @change="updateTaskStatus(task.id, task.status)">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </td>
          <td>
            <button @click="deleteTask(task.id)">Delete</button> <!-- Delete button -->
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const newTask = ref({
  title: '',
  description: '',
  status: 'pending'
});

const tasks = ref([]);

// API URL from environment variable
const apiUrl = 'https://todo.nafistech.com/api';

const token = localStorage.getItem('authToken');

const createTask = async () => {
  try {
    await axios.post(`${apiUrl}/tasks`, newTask.value,
         {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
     );
    // Refresh task list after adding a new task
    await fetchTasks();
    // Clear the form
    newTask.value = { title: '', description: '', status: 'pending' };
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

const fetchTasks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    tasks.value = response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}; 
const deleteTask = async (taskId: number) => {
  try {
    await axios.delete(`${apiUrl}/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Remove the deleted task from the tasks array
    tasks.value = tasks.value.filter(task => task.id !== taskId);

    console.log('Task Deleted:', taskId);
  } catch (error) {
    if (error.response) {
      console.error('Error deleting task:', error.response.data);
    } else {
      console.error('Error deleting task:', error.message);
    }
  }
};

const updateTaskStatus = async (taskId: number, status: string) => {
  try {
    await axios.patch(`${apiUrl}/tasks/${taskId}`, { status }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Find and update the task in the local array
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.status = status;
    }
  } catch (error) {
    if (error.response) {
      console.error('Error updating task status:', error.response.data);
    } else {
      console.error('Error updating task status:', error.message);
    }
  }
};
// Fetch tasks on component mount
fetchTasks();
</script>

<style scoped>
.todo-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

thead th {
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem;
  text-align: left;
}

tbody td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
