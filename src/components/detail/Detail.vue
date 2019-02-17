<template>
    <div>
        <div style="background-color: #efebe9; padding: 3vh 15vw; z-index: 2;">
            <div style="margin-top: 10vh; height: 100vh" id="progress">
                <mu-circular-progress class="demo-circular-progress" :stroke-width="7"
                                      :size="56"></mu-circular-progress>
            </div>
            <div id="bookInfo">
                <mu-paper style="display: flex;flex-direction: column; padding: 3vh 5vw;z-index: 2" class="demo-paper"
                          :z-depth="3">
                    <div style="display: flex">
                        <div>
                            <a href="#" @click="goRead('/read', 'Read', {bookInfo})"
                               style="color: #424242; font-size: 34px; font-weight: 600;">
                                <img :src="bookInfo.tImgurl"/>
                            </a>
                        </div>
                        <div style="margin-left: 5vh">
                            <div style="display: flex">
                                <a href="#" @click="goRead('/read', 'Read', {bookInfo})"
                                   style="color: #424242; font-size: 34px; font-weight: 600;">{{bookInfo.tBookname}}</a>
                                <div style="padding-top: 3vh; margin-left: 2vw">
                                    <label style="font-size: 15px; font-weight: 400;">{{bookInfo.tAuthor}}</label>
                                </div>
                            </div>
                            <div style="display: flex; margin-top: 2vh">
                                <p class="tags" v-for="tage in bookInfo.tTags" :key="tage">{{tage}}</p>
                            </div>
                            <div style="display: flex; margin-top: 3vh">
                                <label
                                    style="font-size: 15px; font-weight: 600;color: #424242">字数：{{bookInfo.tWordnumber}}</label>
                                <label style="margin-left: 3vw; font-size: 15px; font-weight: 600;color: #424242">点击量：{{bookInfo.tMonthclicknum}}</label>
                            </div>
                            <div style="display: flex; margin-top: 3vw">
                                <mu-button class="function-button" @click="goRead('/read', 'Read', {bookInfo})">免费阅读
                                </mu-button>
                                <mu-button class="function-button"
                                           @click="goReadNewSection('/read', 'Read', {bookInfo})">最新章节
                                </mu-button>
                                <mu-button class="function-button" @click="download()">下载本书</mu-button>
                            </div>
                        </div>
                        <div style="margin-left: 10vw;display: flex;flex-direction: column;">
                            <p style="font-size: 17px">暂无评价</p>
                            <p style="color: #757575">少于10人评价</p>
                            <label style="margin-top: 3vh">我要评价</label>
                            <div style="">
                                <el-rate v-model="value1"></el-rate>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 5vh">
                        <HR style="border: 0;  height: 2px; background-color: #bdbdbd"/>
                        <p style="padding: 3vh 5vw; font-size: 16px; font-weight: 400;text-align: left;line-height: 4vh;letter-spacing: 3px;
                    font-family: 'Microsoft YaHei UI'">&nbsp;&nbsp;&nbsp;&nbsp;{{bookInfo.tDetail}}</p>
                        <HR style="border: 0;  height: 2px; background-color: #bdbdbd"/>
                    </div>
                </mu-paper>
                <mu-paper style="margin-top: 3vh; padding: 2vh 5vw 5vh 5vw">
                    <div>
                        <label style="font-size: 35px; font-weight: 400; color:#424242;">目 录</label>
                    </div>
                    <div style="margin-top: 1vh">
                        <HR style="border: 0;  height: 2px; background-color: #bdbdbd"/>
                        <ul style="width: 100%; display: flex; flex-wrap: wrap">
                            <li v-for="(section, index) in bookInfo.titles" :key="section.section_id"
                                style="width: 33.3%; text-align: left; list-style:none; margin-top: 2vh">
                                <a href="#" v-if="index<=20" style="color: #212121"
                                   @click="goReadSection('/read', 'Read', {index, bookInfo})">{{section}}</a>
                                <a href="#" v-else style="color: #212121"
                                   @click="goReadSection('/read', 'Read', {index, bookInfo})">{{section}}(vip)</a>
                            </li>
                        </ul>
                    </div>
                </mu-paper>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Detail',
        data () {
            return {
                includeComments: 'Detail',
                value1: null,
                isFirst: true,
                bookInfo: {
                    tImgurl: null
                },
                downloadUrl: ''
            };
        },
        // 页面初始化及数据的初始化
        mounted () {
            this.control(true);
            // 如果是从Read过来的，则不调用接口，否则调用接口取书的信息
            if (this.$route.params.status) {
                this.bookInfo = this.$route.params.bookInfo;
                this.downloadUrl = this.GlobalVar.apiConfig.novel.downLoad + this.$route.params.bookInfo.tBookid;
                this.control(false);
            } else {
                let tBookid = JSON.parse(window.localStorage.getItem('bookInfo')).tBookid;
                this.$http.get(this.GlobalVar.apiConfig.novel.Detail + tBookid)
                    .then(
                        res => {
                            if (res.data.code === 200) {
                                this.bookInfo = res.data.result.bookInfo;
                                this.bookInfo['content'] = res.data.result.novel;
                                this.bookInfo['titles'] = res.data.result.titles;
                                this.downloadUrl = this.GlobalVar.apiConfig.novel.downLoad + tBookid;
                                // console.log(this.bookInfo);
                                this.control(false);
                            } else {
                                console.log('detail' + res);
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    );
            }
        },
        methods: {
            // 去读的页面
            goRead (path, name, params) {
                params['index'] = 0;
                this.$router.push({
                    path: path,
                    name: name,
                    params: params
                });
            },
            // 最新章节调用函数
            goReadNewSection (path, name, params) {
                params['index'] = this.bookInfo.titles.length - 1;
                if (params.index > 20 && !window.localStorage.getItem('token')) {
                    this.$router.replace('/login');
                } else {
                    this.$router.push({
                        path: path,
                        name: name,
                        params: params
                    });
                }
            },
            // 各章节调用函数
            goReadSection (path, name, params) {
                // 如果读的是大于20章的小说且没有登陆，则会被重定向到登陆界面
                if (params['index'] > 20 && !window.localStorage.getItem('token')) {
                    this.$router.replace('/login');
                } else {
                    this.$router.push({
                        path: path,
                        name: name,
                        params: params
                    });
                }
            },
            // 下载小说函数
            download () {
                if (window.localStorage.getItem('token')) {
                    window.location.href = this.downloadUrl;
                } else {
                    this.$router.replace('/login');
                }
            },
            // 当数据还没有拿到时，则用于显示加载中
            control (isShow) {
                let progress = document.getElementById('progress');
                let bookInfo = document.getElementById('bookInfo');
                if (isShow) {
                    progress.style.display = 'block';
                    bookInfo.style.display = 'none';
                } else {
                    progress.style.display = 'none';
                    bookInfo.style.display = 'block';
                }
            }
        }
    };
</script>

<style scoped>
    .tags {
        width: 3vw;
        border-radius: 10px;
        border-style: solid;
        border-width: 2px;
        border-color: #607d8b;
        color: #607d8b;
        height: 3vh;
        margin-right: 1vw
    }

    .function-button {
        border-color: #afb42b;
        border-width: 1px;
        border-radius: 10px;
        border-style: solid;
        margin-right: 2vw;
        color: #afb42b;
    }
</style>
