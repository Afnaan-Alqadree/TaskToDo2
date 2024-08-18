<template>
  <nav class="navbar">
    
    <div class="links">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/register" class="nav-link">Register</RouterLink>
      <RouterLink to="/login" class="nav-link">Login</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.logo {
  display: block;
}

.links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
