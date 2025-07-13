<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/user">User</router-link>
    <router-link to="/login">Login</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #e0bbff; 
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

.navbar a.router-link-exact-active {
  color: #6a0dad; /* tím đậm khi active */
}
</style>
