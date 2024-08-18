<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>
      Don't have an account? <RouterLink to="/register">Go to Register</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Form data
const email = ref('');
const password = ref('');

// Error message
const errorMessage = ref('');

// API URL from environment variable
const apiUrl ='https://todo.nafistech.com/api';

// Use router for redirection
const router = useRouter();

// Login function
const login = async () => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email: email.value,
      password: password.value
    });

    // Assuming the response contains a token
    const { token } = response.data;

    // Store token in local storage
    localStorage.setItem('authToken', token);

    // Handle successful login (e.g., redirect to home or dashboard)
    router.push('/'); // Redirect to home page or any other page you prefer
  } catch (error) {
    errorMessage.value = 'Login failed.';
    console.error('Login error:', error);
  }
};
</script>

<style scoped>
.login {
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
