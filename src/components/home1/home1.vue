<template>
    <div style="display: flex;flex-direction: column; align-items: center; padding: 5vh 0; background-color: #efebe9">
        <mu-paper class="demo-paper"
                  style="display: flex;width: 70vw;height: 50vh; padding: 4vh 2vw; border-radius: 10px" :z-depth="3">
            <div style="width: 50vw">
                <mu-carousel :active="active" style="height: 40vh">
                    <mu-icon value="arrow_back" slot="left"></mu-icon>
                    <mu-icon value="arrow_forward" slot="right"></mu-icon>
                    <template slot="indicator" slot-scope="{ index, active }">
                        <mu-button icon class="mu-carousel-indicator-button"
                                   :class="{'mu-carousel-indicator-button__active': active}"
                                   @click="changeActive(index)">
                            <span class="rect-indicator"></span>
                        </mu-button>
                    </template>
                    <mu-carousel-item>
                        <img :src="carouselImg3">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg4">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg5">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg1">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg2">
                    </mu-carousel-item>
                </mu-carousel>
            </div>
            <div style="margin-left: 5vh; width: 20%">
                <div>
                    <label style="font-size: 25px; font-weight: 400;">周 排 行 榜</label>
                    <HR style="border: 0;  height: 2px; background-color: black;"/>
                </div>
                <div>
                    <ul style="list-style: none;padding-left: 0">
                        <li style="font-size: 15px; font-weight: 400;" v-for="bookInfo in bookList.slice(0,6)"
                            :key="bookInfo.tBookid">
                            <div style="text-align: left; padding-left: 1vw">
                                <img style="height: 3vh" src="../../assets/image/fire.png"/>
                                <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})" style="color: #212121">{{bookInfo.tBookname}}</a>
                            </div>
                            <HR style="border: 0;  height: 1px; background-color: #eeeeee;"/>
                        </li>
                    </ul>
                </div>
            </div>
        </mu-paper>
        <mu-paper class="demo-paper"
                  style="display: flex;width: 70vw;height: 70vh; padding: 4vh 2vw; border-radius: 10px; margin-top: 3vh"
                  :z-depth="3">
            <div style="width: 50vw">
                <label style="font-size: 24px; font-weight: 400;color: black">编辑强推</label>
                <HR style="border: 0;  height: 2px; background-color: black;"/>
                <ul style="list-style: none; display: flex; width: 100%;flex-wrap: wrap">
                    <li style="width: 50%" v-for="bookInfo in bookList.slice(6,10)" :key="bookInfo.tBookid">
                        <div style="display: flex; padding: 2vh 2vw">
                            <div style="height: 4vh">
                                <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})"
                                   style="color: #212121"><img :src="bookInfo.tImgurl"/></a>
                            </div>
                            <div style="margin-left: 2vw;">
                                <div style="font-size: 16px; font-weight: 600; text-align: left">
                                    <!--<router-link :to="{path:'/detail, query:{bookInfo}'}" style="color: #212121"></router-link>-->
                                    <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})"
                                       style="color: #212121">{{bookInfo.tBookname}}</a>
                                </div>
                                <p style="text-align: left">
                                    <span
                                        style="color:#757575;margin-right: 1px; font-size: 11px">{{bookInfo.tAuthor}}</span>
                                    <span
                                        style="color:#757575;margin-right: 1px;font-size: 11px">{{bookInfo.tType}}</span>
                                    <span
                                        style="color:#757575;margin-right: 1px; font-size: 11px">{{bookInfo.tSerial}}</span>
                                </p>
                                <div style="text-align: left; padding-right: 1vw">{{bookInfo.tDetail.substr(0,
                                    21).concat('......')}}
                                </div>
                            </div>
                        </div>
                    </li>
                    <hr class="hr"/>
                </ul>
            </div>
            <div style="width: 20%; margin-left: 5vh;">
                <label style="font-size: 24px; font-weight: 400;">风尚阁</label>
                <HR style="border: 0;  height: 2px; background-color: black;"/>
                <div>
                    <ul style="list-style: none; padding-left: 0">
                        <li style="font-size: 15px; font-weight: 400;text-align: left; margin-top: 2vh"
                            v-for="bookInfo in bookList.slice(10,19)" :key="bookInfo.tBookid">
                            <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})" style="color: #212121">{{bookInfo.tBookname}}</a>
                            <HR style="border: 0;  height: 1px; background-color: #eeeeee;"/>
                        </li>
                    </ul>
                </div>
            </div>
        </mu-paper>
    </div>
</template>

<script>
    // 引进轮播图图片
    import carouselImg1 from '../../assets/image/home/98k.jpg';
    import carouselImg2 from '../../assets/image/home/open.jpg';
    import carouselImg3 from '../../assets/image/home/home1.png';
    import carouselImg4 from '../../assets/image/home/home2.jpg';
    import carouselImg5 from '../../assets/image/home/home3.jpg';

    export default {
        name: 'home1',
        data () {
            return {
                carouselImg1,
                carouselImg2,
                carouselImg3,
                carouselImg4,
                carouselImg5,
                active: 0,
                bookList: [],
                detail: ''
            };
        },
        methods: {
            // 换轮播图片
            changeActive (index) {
                this.active = index;
            },
            // 转到详情页面
            goDetail (path, name, params) {
                // 将书的信息存进全局变量
                window.localStorage.setItem('bookInfo', JSON.stringify(params.bookInfo));
                this.$router.push({
                    path: path,
                    name: name,
                    params: params
                });
            }
        },
        // 页面数据的初始化
        created () {
            this.$http.get(this.GlobalVar.apiConfig.novel.topClick + '?limit=20')
                .then(
                    res => {
                        // console.log(res.data);
                        if (res.data.code === 200) {
                            this.bookList = res.data.result;
                        } else {
                           console.log('home1' + res);
                        }
                    }
                );
        }
    };
</script>

<style scoped>

</style>
