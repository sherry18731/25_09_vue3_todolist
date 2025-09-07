<template>
  <div id="signUpPage" class="bg-blue">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/todolist.svg?alt=media&token=a75aa7a4-f3f1-4bce-8a47-3fec34eaa474"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="email"
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="nickname"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="密碼長度需要六個字以上"
            required
            v-model="password"
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            placeholder="請再次輸入密碼"
            required
            v-model="confirmPassword"
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            value="註冊帳號"
            @click="handleRegister"
          />
          <RouterLink class="formControls_btnLink" to="/login">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from '../utils/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 表單資料
const email = ref('')
const nickname = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  // 補上 copilot 提供的防呆
  if (email.value.trim() === '' || password.value.trim() === '') {
    alert('請輸入 email 及密碼')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('密碼與確認密碼不符')
    return
  }
  try {
    await register(email.value, password.value, nickname.value)
    alert('註冊成功')
    router.push('/login')
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || '註冊失敗'
    alert(msg)
  }
}
</script>
