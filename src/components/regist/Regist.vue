<template>
    <div style="display: flex; height: 100vh;background-color: #e0e0e0">
        <div style="height: 80%;margin-left: 8vw; margin-top: 10vh">
            <router-link to="/"><img style="height: 8vh" src="../../assets/image/title2.png"/></router-link>
        </div>
        <div style="margin-left: 15vw; margin-top: 4vh">
            <mu-paper class="paper-content" :z-depth="4">
                <div>
                    <div style="height: 25vh; padding-top: 4vh">
                        <label class="title-lable" style="font-size: 50px;font-weight: 500;">
                            <img src="../../assets/image/name.png"/>
                        </label>
                        <div style="margin-top: 1vh">
                    <span class="welcome-content">
                        登陆群阅， 发现更大的世界
                    </span>
                        </div>
                    </div>
                    <input type="text" style="display: none"/>
                    <input type="password" style="display: none"/>
                    <div style="height: 45vh; padding-top: 5vh">
                        <div style="padding: 0 5vw">
                            <div class="username-content">
                                <div class="icon-content">
                                    <mu-icon size="36" color="#e0e0e0" value="account_circle"></mu-icon>
                                </div>
                                <div style="padding-bottom: 1vh">
                                    <mu-text-field id="username-input" class="input" :solo=isSolo
                                                   v-model="userInfo.username" :readonly="changeMsg"
                                                   placeholder="用户名" @input="isUserNameComplete()"
                                                   :error-text="errorMessage.userNameErrorMsg">
                                    </mu-text-field>
                                </div>
                            </div>
                            <div class="account-content">
                                <div class="icon-content">
                                    <mu-icon size="36" color="#e0e0e0" value="account_circle"></mu-icon>
                                </div>
                                <div style="padding-bottom: 1vh">
                                    <mu-text-field id="account-input" class="input" :solo=isSolo v-model="account"
                                                   placeholder="手机号或邮箱" :error-text="errorMessage.acountErrorMsg"
                                                   :readonly="changeMsg" @input="isAccountComplete()">
                                    </mu-text-field>
                                </div>
                            </div>
                            <div class="password-content">
                                <div class="icon-content">
                                    <mu-icon size="36" color="#e0e0e0" value="locked"></mu-icon>
                                </div>
                                <div style="padding-bottom: 1vh;width: 100%">
                                    <mu-text-field id="password-input1" class="input" :solo=isSolo :readonly="changeMsg"
                                                   v-model="userInfo.password" :action-icon=" visibilityPassword ? 'visibility' : 'visibility_off'"
                                                   :action-click="() => (visibilityPassword = !visibilityPassword)" placeholder="密码"
                                                   :type="visibilityPassword ? 'text' : 'password'" :error-text="errorMessage.passwordErrorMsg"
                                                   @input="isPassComplete()">
                                    </mu-text-field>
                                </div>
                            </div>
                            <div class="verify-code-content">
                                <div class="icon-content">
                                    <mu-icon size="36" color="#e0e0e0" value="account_circle"></mu-icon>
                                </div>
                                <div style="padding-bottom: 1vh">
                                    <mu-text-field id="verify-code-input" class="input" :solo=isSolo v-model="phoneCode"
                                                   placeholder="验证码" :error-text="errorMessage.phoneCodeErrorMsg"
                                                   @input="isPhoneCodeComplete()">
                                    </mu-text-field>
                                </div>
                                <div style="padding: 1px 0">
                                    <!--<mu-button style="width: 7vw; background-color: #4caf50">-->
                                    <mu-button style="width: 7vw; height: 6vh;background-color: #64b5f6; border-radius: 10px" :disabled="!(AccountLegal&&isPhone&PswLegal&&userNameLegal)" @click.native="getPhoneCode()">
                                        <label style="font-size: 10px; font-weight: 400; color: white" v-show="!showTime">获取验证码</label>
                                        <label id="daojishi" style="font-size: 25px; font-weight: 400; color: white" v-show="showTime"></label>
                                    </mu-button>
                                </div>
                            </div>
                            <div>
                                <label style="font-size: 10px; font-weight: 100;color: red">
                                    密码只含英文数字下划线 长度在6-18之间 开始为英文(邮箱不需验证码)
                                </label>
                            </div>
                        </div>
                        <div style="margin-top: 5vh; padding: 0 5vw">
                            <mu-button @click.native="regist()" :disabled="!(AccountLegal&&PswLegal&&userNameLegal)" class="mu-button1">
                                <label class="login-lable">注册</label>
                            </mu-button>
                        </div>
                        <div style="margin-top: 5vh; height: 10vh">
                            <HR style="border: 0;  height: 2px; background-color: #eeeeee;"/>
                            <div style="margin-top: 2vh">
                                <label style="font-size: 27px; font-weight: 500;">
                                    已有账号？<router-link style="color: #ea6f5a;font-weight: 600" to="/login">登陆</router-link>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
        <mu-dialog :title="dialogMsg" width="360" :open="open"></mu-dialog>
    </div>
</template>

<script>
    export default {
        name: 'regist',
        data () {
            return {
                userInfo: {
                    password: '',
                    username: ''
                },
                errorMessage: {
                    acountErrorMsg: '',
                    passwordErrorMsg: '',
                    phoneCodeErrorMsg: '',
                    userNameErrorMsg: ''
                },
                account: '',
                verifyPassword: '',
                isPhone: false,
                msgLegal: false,
                visibilityPassword: false,
                phoneCode: '',
                showTime: false,
                changeMsg: false,
                CodeLegal: false,
                dialogMsg: '',
                open: false,
                isSolo: true,
                PswLegal: false,
                AccountLegal: false,
                userNameLegal: false
            };
        },
        methods: {
            // 用于是否显示对话框
            close () {
                this.open = !this.open;
            },
            // 注册函数
            regist () {
                // 判断是否是手机号注册
                if (this.isPhone) {
                    if (this.CodeLegal) {
                        this.userInfo['phoneCode'] = this.phoneCode;
                        this.$http.post(this.GlobalVar.apiConfig.auth.RegistCheckPhone, this.userInfo)
                            .then(
                                res => {
                                    if (res.data.code === 200) {
                                        this.$router.push('/login');
                                    } else {
                                        this.open = true;
                                        this.dialogMsg = res.data.message;
                                        setTimeout(this.close, 1000);
                                    }
                                },
                                err => {
                                    console.log(err);
                                }
                            ).finally();
                    } else {
                        this.open = true;
                        this.dialogMsg = '请输入验证码！';
                        setTimeout(this.close, 1000);
                    }
                } else {
                    this.userInfo['email'] = this.account;
                    delete this.userInfo['phone'];
                    console.log(this.userInfo);
                    this.$http.post(this.GlobalVar.apiConfig.auth.RegisrEmail, this.userInfo)
                        .then(
                            res => {
                                console.log(res.data);
                                if (res.data.code === 200) {
                                    this.open = true;
                                    this.dialogMsg = '邮件已发送！';
                                    setTimeout(this.close, 1000);
                                } else {
                                    this.open = true;
                                    this.dialogMsg = res.data.message;
                                    setTimeout(this.close, 1000);
                                }
                            }
                        ).finally('email regist finished');
                }
            },
            // 用于监听账号是否合法
            isAccountComplete () {
                if (!this.account) {
                    this.errorMessage.acountErrorMsg = '账号为必填项';
                    this.msgLegal = false;
                    return false;
                } else {
                    if (/^(13[0-9]|14[579]|15[0-35-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.account)) {
                        this.errorMessage.acountErrorMsg = '';
                        this.AccountLegal = true;
                        this.isPhone = true;
                        return true;
                    } else {
                        if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.account)) {
                            this.errorMessage.acountErrorMsg = '';
                            this.AccountLegal = true;
                            this.isPhone = false;
                            return true;
                        } else {
                            this.errorMessage.acountErrorMsg = '账号不合法';
                            this.AccountLegal = false;
                            return false;
                        }
                    }
                }
            },
            // 用于监听是否有验证码
            isPhoneCodeComplete () {
                if (this.isPhone) {
                    if (!this.phoneCode) {
                        this.errorMessage.phoneCodeErrorMsg = '验证码不能为空';
                        this.CodeLegal = false;
                        return false;
                    } else {
                        this.errorMessage.phoneCodeErrorMsg = '';
                        this.CodeLegal = true;
                        return true;
                    }
                }
            },
            // 用于监听是否有用户名
            isUserNameComplete () {
                if (!this.userInfo.username) {
                    this.errorMessage.userNameErrorMsg = '用户名不能为空';
                    this.userNameLegal = false;
                    return false;
                } else {
                    this.errorMessage.userNameErrorMsg = '';
                    this.userNameLegal = true;
                    return true;
                }
            },
            // 用于监听密码是否合法
            isPassComplete () {
                if (!this.userInfo.password) {
                    this.errorMessage.passwordErrorMsg = '密码为必填项';
                    this.PswLegal = false;
                    return false;
                } else {
                    if (/^[a-zA-Z]\w{5,17}$/.test(this.userInfo.password)) {
                        this.errorMessage.passwordErrorMsg = '';
                        this.PswLegal = true;
                        return true;
                    } else {
                        this.errorMessage.passwordErrorMsg = '密码不合法';
                        this.PswLegal = false;
                        return false;
                    }
                }
            },
            // 用于发送验证码
            getPhoneCode () {
                this.changeMsg = true;
                if (this.isPhone) {
                    this.userInfo['phone'] = this.account;
                    delete this.userInfo['email'];
                } else {
                    this.open = true;
                    this.dialogMsg = '邮箱不需验证码';
                    setTimeout(this.close, 1000);
                }
                this.$http.post(this.GlobalVar.apiConfig.auth.RegistPhone, this.userInfo)
                    .then(
                        res => {
                            if (res.data.code === 200) {
                                this.showTime = true;
                                this.daojishu();
                                this.open = true;
                                this.dialogMsg = res.data.message;
                                setTimeout(this.close, 1000);
                            } else {
                                this.open = true;
                                this.dialogMsg = res.data.message;
                                setTimeout(this.close, 1000);
                            }
                        }
                    ).finally();
            },
            // 用于按钮上的倒数记时
            daojishu () {
                let c = 120;
                setInterval(function () {
                    c = c - 1;
                    if (c <= 0) {
                        document.getElementById('daojishi').innerText = 0;
                        clearInterval(c);
                    } else {
                        document.getElementById('daojishi').innerText = c + ' S';
                    }
                }, 1000);
            }
        }
    };
</script>

<style scoped>
    .paper-content {
        height: 86vh;
        width: 32vw;
        background-color: white;
        border-radius: 20px
    }
    .username-content{
        /*border-radius: 10px;*/
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-color: #e0e0e0;
        border-style: solid;
        height: 7vh;
        display: flex;
        border-bottom: 1px;
    }
    .input{
        height: 100%;
        width: 85%;
        outline: none;
        border:0;
        font-size: 21px;
        font-weight: 500;
        background-color: white
    }
    .verify-code-content{
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-color: #e0e0e0;
        border-style: solid;
        height: 7vh;
        display: flex;
    }
    .account-content{
        border-color: #e0e0e0;
        border-style: solid;
        height: 7vh;
        display: flex;
        border-bottom: 1px;
    }
    .password-content{
        border-color: #e0e0e0;
        border-style: solid;
        height: 7vh;
        display: flex;
        border-bottom: 1px;
    }
    .mu-button1{
        background-color: #ea6f5a;
        /*background-color: #2196f3;*/
        /*background-color: #4caf50;*/
        height: 6vh;
        width: 90%;
        border-radius: 25px;
        border:0;
        outline: none
    }
    .title-lable{
        color: #2196f3
        /*color: #ea6f5a;*/
    }
    .welcome-content{
        font-size: 35px;
        font-weight: 500;
        color: #2196f3
        /*color: #ea6f5a;*/
    }
    .login-lable{
        font-size: 34px;
        font-weight: 400;
        color: white
    }
    .icon-content{
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center
    }

</style>
