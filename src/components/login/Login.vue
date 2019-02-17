<template>
    <div style="display: flex; align-items: center; height: 100%;background-color: #e0e0e0">
        <div style="margin-left: 8vw; margin-top: 10vh; height: 90%">
            <router-link to="/"><img style="height: 8vh" src="../../assets/image/title2.png"/></router-link>
        </div>
        <div style="margin-left: 15vw">
            <mu-paper class="paper-content" :z-depth="4">
                <div>
                    <div style="height: 26vh; padding-top: 6vh">
                        <label class="title-lable" style="font-size: 50px;font-weight: 500;">
                            <img src="../../assets/image/name.png"/>
                        </label>
                        <div style="margin-top: 2vh">
                    <span class="welcome-content">
                        登陆群阅，发现更大的世界
                    </span>
                        </div>
                    </div>
                    <input type="text" style="display: none"/>
                    <input type="password" style="display: none"/>
                    <div style="height: 50vh; padding-top: 7vh">
                        <div style="padding: 0 10vh">
                            <div class="account-content">
                                <div class="icon-content">
                                    <mu-icon size="36" color="#e0e0e0" value="account_circle"></mu-icon>
                                </div>
                                <div style="padding-bottom: 2vh">
                                    <mu-text-field id="accountInut" class="input" :solo=isSolo v-model="account"
                                                   placeholder="手机号或邮箱" :error-text="errorMessage.acountErrorMsg"
                                                   @input="isAccountComplete()">
                                    </mu-text-field>
                                </div>
                            </div>
                            <div class="password-content">
                                <div class="icon-content">
                                    <mu-icon size="36" color="#e0e0e0" value="locked"></mu-icon>
                                </div>
                                <div style="padding-bottom: 1vh;width: 100%">
                                    <mu-text-field id="passwordtInut" class="input" :solo=isSolo
                                                   v-model="userInfo.password" :action-icon=" !visibility ? 'visibility_off' : 'visibility'"
                                                   :action-click="() => (visibility = !visibility)" placeholder="密码"
                                                   :type="visibility ? 'text' : 'password'" :error-text="errorMessage.passwordErrorMsg"
                                                   @input="isPassComplete()">
                                    </mu-text-field>
                                </div>
                            </div>
                            <div>
                                <label style="font-size: 10px; font-weight: 100;">
                                    密码只含英文数字下划线 长度在6-18之间 开始为英文
                                </label>
                            </div>
                        </div>
                        <div style="margin-top: 5vh; padding: 0 20%">
                            <mu-button :disabled="!(passwordLegal&&accountLegal)" @click.native="login()" class="mu-button">
                                <label class="login-lable">登陆</label>
                            </mu-button>
                        </div>
                        <div style="margin-top: 5vh; height: 10vh">
                            <hr class="hr"/>
                            <div style="margin-top: 5%">
                                <label style="font-size: 27px; font-weight: 500;">
                                    没有账号？<router-link style="color: #ea6f5a;font-weight: 600" to="/regist">注册</router-link>
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
        name: 'login',
        data () {
            return {
                userInfo: {
                    password: ''
                },
                account: '',
                errorMessage: {
                  acountErrorMsg: '',
                  passwordErrorMsg: ''
                },
                accountLegal: false,
                visibility: false,
                isPhone: false,
                passwordLegal: false,
                isSolo: true,
                open: false,
                dialogMsg: ''
            };
        },
        methods: {
            // 用于对话框的打开与关闭
            close () {
                this.open = !this.open;
            },
            // 登陆函数
            login () {
                // 判断是否是手机号登陆
                if (this.isPhone) {
                    this.userInfo['phone'] = this.account;
                    delete this.userInfo['email'];
                } else {
                    this.userInfo['email'] = this.account;
                    delete this.userInfo['phone'];
                }
                // 登陆验证
                this.$http.post(this.GlobalVar.apiConfig.auth.Login, this.userInfo)
                    .then(
                        res => {
                            if (res.data.code === 200) {
                                console.log('用户获取成功' + JSON.stringify(res.data.result));
                                let userInfo = res.data.result;
                                this.$store.commit('login', {
                                    userInfo: {
                                        userName: userInfo.userName,
                                        userId: userInfo.userId,
                                        userRole: userInfo.userRole,
                                        vipExpTime: userInfo.vipExpTime
                                    },
                                    token: userInfo.token
                                });
                                this.$router.push('/');
                            } else {
                                this.open = true;
                                this.dialogMsg = res.data.message;
                                setTimeout(this.close, 1000);
                            }
                        },
                        err => {
                            console.log('服务器错误' + err);
                        }
                    ).finally();
            },
            // 账号是否合格验证（手机号及邮箱）
            isAccountComplete () {
                if (!this.account) {
                    this.errorMessage.acountErrorMsg = '账号为必填项';
                    this.accountLegal = false;
                    return false;
                } else {
                    if (/^(13[0-9]|14[579]|15[0-35-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.account)) {
                        this.errorMessage.acountErrorMsg = '';
                        this.accountLegal = true;
                        this.isPhone = true;
                        return true;
                    } else {
                        if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.account)) {
                            this.errorMessage.acountErrorMsg = '';
                            this.accountLegal = true;
                            this.isPhone = false;
                            return true;
                        } else {
                            this.errorMessage.acountErrorMsg = '账号不合法';
                            this.accountLegal = false;
                            return false;
                        }
                    }
                }
            },
            // 密码是否合规范的验证
            isPassComplete () {
                if (!this.userInfo.password) {
                    this.errorMessage.passwordErrorMsg = '密码为必填项';
                    this.passwordLegal = false;
                    return false;
                } else {
                    if (/^[a-zA-Z]\w{5,17}$/.test(this.userInfo.password)) {
                        this.errorMessage.passwordErrorMsg = '';
                        this.passwordLegal = true;
                        return true;
                    } else {
                        this.errorMessage.passwordErrorMsg = '密码不合法';
                        this.passwordLegal = false;
                        return false;
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .hr{
        background-color: #eeeeee;
        border:0;
        height: 2px;
    }
    .paper-content {
        height: 80vh;
        width: 32vw;
        background-color: white;
        border-radius: 20px
    }
    .account-content{
        /*border-radius: 10px;*/
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-color: #e0e0e0;
        border-style: solid;
        height: 7%;
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
    .password-content{
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-color: #e0e0e0;
        border-style: solid;
        height: 15%;
        display: flex;
    }
    .mu-button{
        background-color: #ea6f5a;
        /*background-color: #2196f3;*/
        height: 7vh;
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
