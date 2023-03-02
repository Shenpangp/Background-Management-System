<template>
  <el-form :model="form" :rules="rules" class="login-container" :inline="true" label-width="70px" ref="form">
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
        <el-input  v-model="form.username" placeholder="请输入账号"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password"  v-model="form.password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="Login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import { getMenu } from '@/api/index'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入用户名'
                    }
                ],
                password:[
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入密码'
                    }
                ]
            }            
        }
    },
    methods: {
        Login() {
            // form表单校验
            this.$refs.form.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({data}) => {
                        // console.log(data)
                        if(data.code === 20000) {
                            // token信息存入Cookie用于不同页面间的通信
                            Cookie.set('token', data.data.token)
                            Cookie.set('userName', data.data.name)
                            Cookie.set('userAccess', data.data.access)
                            // 获取菜单的数据存入store中
                            // console.log(data.data.menu)
                            this.$store.commit('getMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            // 跳转到首页
                            this.$router.push('/home')                           
                        } else {
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
            

        }
    }
}
</script>

<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login-title{
        text-align: center;
        margin-bottom: 40px;
        color: #505485;
    }
    .el-input{
        width: 198px;
    }
    .el-button{
        margin-left: 105px;
        margin-top: 10px;
    }
    
}
</style>