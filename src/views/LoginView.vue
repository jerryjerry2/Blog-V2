<template>
    <div>
        <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-5">
                                <h2 class="fw-bold mb-4 text-center">Login Blogs</h2>

                                <form @submit.prevent="handleLogin">
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email address</label>
                                        <input v-model="email" type="text" class="form-control" id="emailInput"
                                            placeholder="name@example.com" >
                                            <p v-if="error.email">{{ error.email }}</p>
                                    </div>
                                    

                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Password</label>
                                        <input v-model="password" type="password" class="form-control"
                                            id="passwordInput" >
                                            <p v-if="error.password">{{ error.password }}</p>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                    </div>

                                    <div class="d-grid">
                                        <button :disabled="isLoading" type="submit" class="btn btn-primary btn-lg">
                                            <div v-if="!isLoading">
                                                Sign In
                                            </div>
                                            <div v-else class="spinner-border spinner-border-sm" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </button>
                                    </div>

                                    <p class="text-center mt-4 mb-0">Don't have an account? <a href="#"
                                            class="text-decoration-none">Sign Up</a></p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { reactive, ref, nextTick } from 'vue';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { required, validator, isEmail } from '@/utils/validator';
import { notify } from '@/utils/toast';


let email = ref('');
let password = ref('');
let auth = useAuthStore();

const error = reactive({
    email : "",
    password : ""
})

let isLoading = ref(false);

function validate(){
    error.email = validator(email.value, [
        (v) => required(v, 'Email is required'),
        (v) => isEmail(v, 'Email is invalid'),
    ])

    error.password = validator(password.value, [
        (v) => required(v, 'Password is required'),
    ])
    
    return !error.email && !error.password;
}

async function handleLogin() {
    if(!validate()) return;
    isLoading.value = true;

    try {
        await auth.login(email.value, password.value);
        notify.success('Login Success', '/');
    } catch (e) {
        console.log(e);
        notify.error(e.data.message);
    }finally{
        isLoading.value = false;
    }
    
}
</script>