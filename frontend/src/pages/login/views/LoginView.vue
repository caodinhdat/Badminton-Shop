<template>
  <div>
    <LoginForm v-if="route.path === '/login'" @success="handleLoginSuccess" />
    <RegisterForm v-else-if="route.path === '/register'" @success="handleRegisterSuccess" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'

const route = useRoute()
const router = useRouter()

const handleLoginSuccess = () => {
  console.log('Login successful')
  // router.push('/dashboard') // tuỳ bạn
}

const handleRegisterSuccess = () => {
  console.log('Register successful')
  router.push('/login') // chuyển về login sau khi đăng ký
}
</script>


<style scoped>
.mode-toggle {
  margin-top: 1rem;
  text-align: center;
  color: #4a5568;
  font-size: 14px;
}

.mode-link {
  color: #7c3aed;
  cursor: pointer;
  font-weight: 600;
  margin-left: 5px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.mode-link:hover {
  color: #5b21b6;
  text-decoration: underline;
}
</style>
