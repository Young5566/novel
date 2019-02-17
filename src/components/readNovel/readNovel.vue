<template>
    <div class="read-content">
        <div class="button-content">
            <div>
                <mu-button class="mu-button" to="/">
                    <label class="button-lable">首页</label>
                </mu-button>
            </div>
            <div>
                <mu-button class="mu-button" @click="changeDialogStatus()">
                    <div style="display: flex; flex-direction: column">
                        <!--<label style=""><i class="material-icons">list</i></label>-->
                        <label class="button-lable">目录</label>
                    </div>
                </mu-button>
            </div>
            <div>
                <mu-button class="mu-button" @click="goDetail()">
                    <label class="button-lable">书页</label>
                </mu-button>
            </div>
            <div>
                <mu-button class="mu-button" @click="goLastrSections()">
                    <label class="button-lable">上一章</label>
                </mu-button>
            </div>
            <div>
                <mu-button class="mu-button" @click="goNextrSections()">
                    <label class="button-lable">下一章</label>
                </mu-button>
            </div>
        </div>
        <div>
            <div class="read-back" id="info">
                <div class="book-img" style="height: 35vh; display: flex; justify-content: center; align-items: center">
                    <img :src="bookInfo.tImgurl"/>
                </div>
                <label style="font-size: 40px; font-weight: 400; letter-spacing: 5px">{{bookInfo.tBookname}}</label>
                <label style="font-size: 20px; font-weight: 300;">{{bookInfo.tAuthor}}</label>
                <div class="info-list" style="display: flex;padding: 2vh 10vw; justify-content: center">
                    <div style="flex-grow: 1">
                        <p class="info-p" style="">{{bookInfo.tType}}</p>
                        <span class="info-span">类型</span>
                    </div>
                    <div style="flex-grow: 1">
                        <p class="info-p">{{bookInfo.tUpdatedate}}</p>
                        <span class="info-span">上架</span>
                    </div>
                    <div style="flex-grow: 1">
                        <p class="info-p">字数：{{bookInfo.tWordnumber}}</p>
                        <span class="info-span">{{bookInfo.tSerial}}</span>
                    </div>
                </div>
                <div
                    style="height: 15vh; display: flex; justify-content: center; align-items: center; flex-direction: column">
                    <span>
                        <p style="font-size: 20px; font-weight: 400">
                            本书由群阅书苑进行电子制作与发行
                        </p>
                        <p style="font-size: 10px; font-weight: 400;">
                            <i class="material-icons" style="font-size: 1px"></i>
                            版权所有 侵权必究
                        </p>
                    </span>
                </div>
            </div>
            <div class="read-back" style="margin-top: 5vh; padding-top: 3vh">
                <div>
                    <span class="title-content" style="" v-html="title"></span>
                </div>
                <div style="padding: 0 5vw; text-align: left">
                    <span class="text-content" style="" v-html="sectionContent"></span>
                </div>
            </div>
        </div>
        <div class="up-to-top-content">
            <mu-button @click.native="toTop" id="to-top-button">
                <label class="icon-lable">
                    <i class="material-icons">keyboard_capslock</i>
                </label>
            </mu-button>
        </div>
        <mu-dialog width="360" scrollable :open.sync="dialogStatus">
            <mu-list>
                <mu-list-item :key="eachTitle" v-for="(eachTitle, titleIndex) in bookInfo.titles">
                    <mu-list-item-content>
                        <a href="#" style="font-size: 14px; font-weight: 400;color: #212121" @click="goTitle(titleIndex)">{{eachTitle}}</a>
                    </mu-list-item-content>
                </mu-list-item>
            </mu-list>
        </mu-dialog>
    </div>
</template>

<script>
    export default {
        name: 'read-novel',
        data () {
            return {
                title: '',
                bookInfo: null,
                sectionContent: null,
                book: null,
                index: null,
                isFirst: true,
                dialogStatus: false
            };
        },
        // 页面的数据初始化
        created () {
            this.book = this.$route.params;
            this.bookInfo = this.book.bookInfo;
            this.index = this.book.index;
            this.isFirstFun();
            this.title = this.book.bookInfo.titles[this.book.index];
            let lastTitle = '';
            // 判断是否是最后一章
            if (this.book.index === this.bookInfo.titles.length) {
                lastTitle = '';
            } else {
                lastTitle = this.bookInfo.titles[this.book.index + 1];
            }
            let jsonObj = {
                'novel': this.bookInfo.content,
                'thisTitle': this.bookInfo.titles[this.book.index],
                'lastTitle': lastTitle
            };
            this.index = this.book.index;
            this.$http.post(this.GlobalVar.apiConfig.novel.getContent, jsonObj)
                .then(
                    res => {
                        if (res.data.code) {
                            this.sectionContent = res.data.result;
                        } else {
                            console.log('readNovel' + res);
                        }
                    },
                    err => {
                        console.log(err);
                    }
                ).finally();
        },
        // 用于是否显示置顶按钮
        mounted () {
            window.addEventListener('scroll', this.scrollToTop);
            this.showFirstPage();
        },
        // 用于监听是否是第一章，即是否要显示第一章的封页
        watch: {
            isFirst: 'showFirstPage'
        },
        methods: {
            // 改变是否是第一章
            isFirstFun () {
                if (this.index === 0) {
                    this.isFirst = true;
                } else {
                    this.isFirst = false;
                }
            },
            // 用于控制是否显示第一章
            showFirstPage () {
                let info = document.getElementById('info');
                if (this.isFirst) {
                    info.style.display = 'flex';
                } else {
                    info.style.display = 'none';
                }
            },
            // 置顶时将垂直像素数改为0
            toTop () {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
            // 用于控制是否显示置顶按钮
            scrollToTop (el) {
                let topBtn = document.getElementById('to-top-button');
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let browserHeight = window.outerHeight;
                if (scrollTop > browserHeight) {
                    topBtn.style.display = 'block';
                } else {
                    topBtn.style.display = 'none';
                }
            },
            // 去下一章按钮函数
            goNextrSections () {
                // 如果没有登陆且访问的为大于20章的小说，则重定向到登陆界面
                if (this.index + 1 > 20 && !window.localStorage.getItem('token')) {
                    this.$router.replace('/login');
                } else {
                    let lastTitle = '';
                    // 用于判断是否是最后一章。如果是则将lastTitle置为null
                    if (this.index === this.bookInfo.titles.length) {
                        this.title = this.bookInfo.titles[this.index];
                        lastTitle = null;
                    } else {
                        this.title = this.bookInfo.titles[this.index + 1];
                        lastTitle = this.bookInfo.titles[this.index + 2];
                    }
                    let jsonObj = {
                        'novel': this.bookInfo.content,
                        'thisTitle': this.title,
                        'lastTitle': lastTitle
                    };
                    if (this.index === this.bookInfo.titles.length) {
                        this.index = this.bookInfo.titles.length;
                    } else {
                        this.index += 1;
                    }
                    this.$http.post(this.GlobalVar.apiConfig.novel.getContent, jsonObj)
                        .then(
                            res => {
                                if (res.data.code === 200) {
                                    this.sectionContent = res.data.result;
                                    this.isFirstFun();
                                } else {
                                    console.log('readNovel' + res);
                                }
                            }
                        );
                }
            },
            // 去上一章函数
            goLastrSections () {
                let lastTitle = '';
                if (this.index === 0) {
                    this.title = this.bookInfo.titles[0];
                    lastTitle = this.bookInfo.titles[1];
                } else {
                    lastTitle = this.title;
                    this.title = this.bookInfo.titles[this.index - 1];
                }
                let jsonObj = {
                    'novel': this.bookInfo.content,
                    'thisTitle': this.title,
                    'lastTitle': lastTitle
                };
                if (this.index === 0) {
                    this.index = 0;
                } else {
                    this.index -= 1;
                }
                this.$http.post(this.GlobalVar.apiConfig.novel.getContent, jsonObj)
                    .then(
                        res => {
                            if (res.data.code === 200) {
                                this.sectionContent = res.data.result;
                                this.isFirstFun();
                            } else {
                                console.log('readNovel' + res);
                            }
                        }
                    );
            },
            // 返回书的详情页
            goDetail () {
                this.$router.push({
                    path: '/detail',
                    name: 'Detail',
                    params: {'bookInfo': this.bookInfo, 'status': 1}
                });
            },
            // 用于改变目录显示状态
            changeDialogStatus () {
                this.dialogStatus = !this.dialogStatus;
            },
            // 根据目录中的章节标题跳转到某章节
            goTitle (titleIndex) {
                // 如果没有登陆且访问的为大于20章的小说，则重定向到登陆界面
                if (titleIndex > 20 && !window.localStorage.getItem('token')) {
                    this.$router.replace('/login');
                } else {
                    this.dialogStatus = false;
                    let lastTitle = '';
                    if (titleIndex === 0) {
                        this.title = this.bookInfo.titles[0];
                        lastTitle = this.bookInfo.titles[1];
                    } else {
                        if (titleIndex === this.bookInfo.titles.length) {
                            this.title = this.bookInfo.titles[titleIndex];
                            lastTitle = null;
                        } else {
                            this.title = this.bookInfo.titles[titleIndex];
                            lastTitle = this.bookInfo.titles[titleIndex + 1];
                        }
                    }
                    let jsonObj = {
                        'novel': this.bookInfo.content,
                        'thisTitle': this.title,
                        'lastTitle': lastTitle
                    };
                    this.$http.post(this.GlobalVar.apiConfig.novel.getContent, jsonObj)
                        .then(
                            res => {
                                if (res.data.code === 200) {
                                    this.index = titleIndex;
                                    this.isFirstFun();
                                    this.sectionContent = res.data.result;
                                }
                            }
                        );
                }
            }
        },
        // 移除监听垂直像素事件
        destroyed () {
            window.removeEventListener('scroll', this.scrollToTop);
        }
    };
</script>

<style scoped>
    .read-back {
        background-image: url("../../assets/image/readBack2.jpg");
        width: 50vw;
        background-color: #d7ccc8;
        margin-left: 25vw
    }

    .read-content {
        display: flex;
        background-color: #d7ccc8;
        padding-top: 1vh;
    }

    .button-content {
        display: flex;
        flex-direction: column;
        position: fixed;
        margin-left: 17vw;
        margin-top: 50vh
    }

    .mu-button {
        height: 8vh;
        width: 10vh;
        background-color: #EBD6D6;
    }

    .button-lable {
        font-size: 15px;
        font-weight: 500
    }

    .text-content {
        font-size: 18px;
        font-weight: 400;
        line-height: 5vh;
        letter-spacing: 2px;
        font-family: 'Microsoft YaHei UI';
        color: #212121
    }

    .title-content {
        font-size: 35px;
        font-weight: 500;
        color: #212121;
    }

    .up-to-top-content {
        margin-left: 2vw;
        margin-top: 80vh
    }

    #to-top-button {
        height: 8vh;
        width: 10vh;
        background-color: #EBD6D6;
        position: fixed;
    }

    .icon-lable {
        font-size: 24px;
        font-weight: 500
    }

    .info-p {
        font-size: 17px;
        font-weight: 400;
    }

    .info-span {
        font-size: 15px;
        font-weight: 400;
    }

    #info {
        height: 80vh;
        flex-direction: column;
        padding-top: 3vh;
    }
</style>
