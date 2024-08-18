<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { type Register } from '../api/ToDoListApi';

// Form data
const email = ref('');
const password = ref('');
const name = ref('');
const confirmedPassword = ref('');
// Error message
const errorMessage = ref('');

// API URL from environment variable

//const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = 'https://todo.nafistech.com/api';
// Use router for redirection
const router = useRouter();

// Register function
const register = async () => {
  try {
    const response = await axios.post(`${apiUrl}/register`, {
      email: email.value,
      name: name.value,
      password: password.value,
      password_confirmation: confirmedPassword.value
    });

    // Assuming the response contains a token
    const { token } = response.data;

    // Store token in local storage
    localStorage.setItem('authToken', token);

    // Redirect to login page after successful registration
    router.push('/login');
  } catch (error) {
  if (error.response && error.response.data) {
    console.error('Registration error:', error.response.data);
    errorMessage.value = `Registration failed: ${error.response.data.message || 'Please try again.'}`;
  } else {
    errorMessage.value = 'Registration failed. Please try again.';
  }
}

};
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
       <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmpassword">Confirm Password:</label>
        <input type="password" id="confirmedPassword" v-model="confirmedPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>
      Already have an account? <RouterLink to="/login">Go to Login</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.register {
  max-width: 400px;
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

input {
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

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

p {
  text-align: center;
  margin-top: 1rem;
}
</style>
