<template>
    <div>
        <div style="height: 10vh; padding: 0 8vw; background-color: #f5f5f5">
            <div style="color: red; display: flex;padding-top: 2vh">
                <div>
                    <router-link to="/"><img style="height: 8vh; margin-top: -1vh" src="../../assets/image/title2.png"/>
                    </router-link>
                </div>
                <div
                    style="margin-left: 10vw;border-width:2px; border-style: solid;border-color: #9e9e9e; border-radius: 25px; height: 6vh; padding-left: 2vw; display: flex; background-color: white">
                    <mu-text-field v-model="searchValue" style="border: none" type="text" :solo="isSolo"></mu-text-field>
                    <mu-button flat large @click="searchFun()" color="#9e9e9e" style="border-radius: 25px">
                        <i class="material-icons">search</i>
                    </mu-button>
                </div>
                <mu-button flat large color="#9e9e9e" to="/login" id="login"
                           style="margin-left: 18vw;border-width:1px; border-style: solid;border-color: #9e9e9e; border-radius: 25px;background-color: white">
                    <mu-icon value="account_circle"></mu-icon>
                    &nbsp;&nbsp;登陆
                </mu-button>
                <mu-button flat large color="#9e9e9e" to="/regist" id="regist"
                           style="margin-left: 3vw;border-width:1px; border-style: solid;border-color: #9e9e9e; border-radius: 25px;background-color: white">
                    <mu-icon value="portrait"></mu-icon>
                    &nbsp;&nbsp;注册
                </mu-button>
                <div id="infoDiv" style="display: flex;height: 6vh; padding:2px 2vw; color: white; margin-left: 15vw">
                    <mu-icon value="account_box" color="#9e9e9e" size="36"></mu-icon>
                    <label style="margin-left: 1vw;font-size: 25px; font-weight: 400; color: #9e9e9e">{{userInfo.userName}}</label>
                </div>
                <mu-button flat large color="#9e9e9e" @click="logout()" id="logout"
                           style="margin-left:3vw;border-width:1px; border-style: solid;border-color: #9e9e9e; border-radius: 25px;background-color: white">
                    <mu-icon value="portrait"></mu-icon>
                    &nbsp;&nbsp;退出
                </mu-button>
            </div>
        </div>
        <mu-appbar style="width: 100%; padding: 0 5px;" color="#424242">
            <div style="display: flex; align-items: center">
                <ul style="list-style: none; display: flex">
                    <li class="li">
                        <mu-menu placement="top-start" style="padding-top: 1.5vh" open-on-hover>
                            <mu-button style="background-color: white">
                                <mu-icon size="35" value="list"></mu-icon>
                                全部分类
                            </mu-button>
                            <mu-list slot="content">
                                <mu-list-item button v-for="(value, key) in classifyObj"
                                              @click="goClassfiy(key)" :key="value">
                                    <mu-list-item-title>{{value}}</mu-list-item-title>
                                </mu-list-item>
                            </mu-list>
                        </mu-menu>
                    </li>
                    <li class="li" v-for="(value, key) in classifyObj" :key="value">
                        <a @click="goClassfiy(key)" class="a" href="#">{{value}}</a>
                    </li>
                </ul>
                <mu-button style="margin-left: 15vw; background-color: white" @click.native="openSimpleDialog()">
                    上传小说
                    <mu-icon right value="cloud_upload"></mu-icon>
                </mu-button>
            </div>
        </mu-appbar>
        <mu-dialog :open.sync="openSimple">
            <upload @closeDialog="closeDialog()"></upload>
        </mu-dialog>
    </div>
</template>

<script>
    // 引入子模块
    import Upload from '../upload/Upload';

    export default {
        name: 'app-bar',
        components: {
            Upload
        },
        data () {
            return {
                openSimple: false,
                classifyList: ['已完成', '连载中', '青春', '悬疑', '玄幻', '现言', '古言'],
                classifyObj: {
                    'finish': '已完成',
                    'doing': '连载中',
                    'young': '青春',
                    'ancient': '古言',
                    'now': '现言',
                    'imaginary': '玄幻',
                    'suspense': '悬疑'
                },
                isSolo: true,
                showLogout: 'none',
                searchValue: '',
                logoutStatus: 'false',
                userInfo: ''
            };
        },
        methods: {
            // 路由跳转
            goRouter (path, name, params) {
                this.$router.push({
                    path: path,
                    name: name,
                    params: params
                });
            },
            // 去每个分类页面
            goClassfiy (url) {
                this.goRouter('/' + url, url.substring(0, 1).toUpperCase() + url.substring(1), '');
            },
            // 打开上传对话框
            openSimpleDialog () {
                // 如果没有登陆则不准上传
                if (window.localStorage.getItem('token')) {
                    this.openSimple = !this.openSimple;
                } else {
                    this.$router.replace('/login');
                }
            },
            closeDialog () {
                setTimeout(this.openSimpleDialog, 2000);
            },
            // 注销登陆
            logout () {
                this.$http.post(this.GlobalVar.apiConfig.auth.Logout)
                    .then(
                        res => {
                            if (res.data.code === 200) {
                                this.$store.commit('logout');
                                // 设置appbar的登陆与不登陆时的登陆按钮与退出按钮显示
                                let logout = document.getElementById('logout');
                                let login = document.getElementById('login');
                                let regist = document.getElementById('regist');
                                let infoDiv = document.getElementById('infoDiv');
                                logout.style.display = 'none';
                                infoDiv.style.display = 'none';
                                login.style.display = 'inline';
                                regist.style.display = 'inline';
                            } else {
                                console.log('注销失败');
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).finally(
                    // console.log('finshed')
                );
            },
            // 查询结果并向查询界跳转
            searchFun () {
                this.$http.get(this.GlobalVar.apiConfig.novel.searchPage + '?' + 'str=' + this.searchValue + '&offset=' + 0 + '&limit=20')
                    .then(
                        res => {
                            console.log(res.data);
                            if (res.data.code === 200) {
                                this.goRouter('/middle', 'Middle', {'data': res.data.result, 'searchValue': this.searchValue});
                                this.searchValue = '';
                            }
                        }
                    );
            }
        },
        // 看是否登陆，如果登陆则显示个人信息， 否则显示登陆及注册
        mounted () {
            let login = document.getElementById('login');
            let logout = document.getElementById('logout');
            let regist = document.getElementById('regist');
            let infoDiv = document.getElementById('infoDiv');
            if (window.localStorage.getItem('token')) {
                login.style.display = 'none';
                regist.style.display = 'none';
                logout.style.display = 'inline';
                infoDiv.style.display = 'flex';
                this.userInfo = JSON.parse(window.localStorage.getItem('user'));
                console.log(this.userInfo);
            } else {
                infoDiv.style.display = 'none';
                logout.style.display = 'none';
                login.style.display = 'inline';
                regist.style.display = 'inline';
            }
        }
    };
</script>

<style scoped>
    .li {
        margin-left: 4vw;
        font-size: 20px;
        font-weight: 300;
        color: white;
    }

    .a {
        color: white
    }
</style>
