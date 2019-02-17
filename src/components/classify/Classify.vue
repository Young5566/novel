<template>
    <div style="display: flex;justify-content: center">
        <div style="display: flex;flex-direction: column; align-items: center;margin-top: 5vh; width: 75vw">
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
                            <img :src="carouselImg1">
                        </mu-carousel-item>
                        <mu-carousel-item>
                            <img :src="carouselImg2">
                        </mu-carousel-item>
                        <mu-carousel-item>
                            <img :src="carouselImg3">
                        </mu-carousel-item>
                    </mu-carousel>
                </div>
                <div style="margin-left: 5vh; width: 20%">
                    <div>
                        <label style="font-size: 25px; font-weight: 400;">分 类 行 榜</label>
                        <HR style="border: 0;  height: 2px; background-color: black;"/>
                    </div>
                    <div>
                        <ul style="list-style: none;padding-left: 0">
                            <li style="font-size: 18px; font-weight: 400;" v-for="bookInfo in TopList" :key="bookInfo.tBookid">
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
            <!--<hr class="hr"/>-->
            <ul style="list-style: none; display: flex; width: 90%;flex-wrap: wrap">
                <li style="width: 50%" v-for="bookInfo in bookList" :key="bookInfo.tBookid">
                    <div style="display: flex; padding: 2vh 2vw">
                        <div>
                            <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})" style="color: #212121"><img :src="bookInfo.tImgurl"/></a>
                        </div>
                        <div style="margin-left: 2vw;">
                            <div style="font-size: 22px; font-weight: 600; text-align: left">
                                <!--<router-link :to="{path:'/detail, query:{bookInfo}'}" style="color: #212121"></router-link>-->
                                <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})" style="color: #212121">{{bookInfo.tBookname}}</a>
                            </div>
                            <p style="text-align: left">
                                <span style="color:#757575;margin-right: 1vw">{{bookInfo.tAuthor}}</span>
                                <span style="color:#757575;margin-right: 1vw">{{bookInfo.tType}}</span>
                                <span style="color:#757575;margin-right: 1vw">{{bookInfo.tSerial}}</span>
                            </p>
                            <div style="text-align: left; padding-right: 3vw">{{bookInfo.tDetail.substr(0, 60).concat('......')}}</div>
                        </div>
                    </div>
                </li>
                <hr class="hr"/>
            </ul>
            <div>
                <mu-flex justify-content="center" style="margin: 32px 0;">
                    <mu-pagination :page-size="20" @change="getContent(currentPage)" raised :total="total" :current.sync="currentPage"></mu-pagination>
                </mu-flex>
            </div>
        </div>
    </div>
</template>

<script>
    import Vip from '../Vip/vip';
    import Free from '../free/Free';
    import LimitedFree from '../limitVip/LimitedVip';
    import carouselImg1 from '../../assets/image/img1.jpg';
    import carouselImg2 from '../../assets/image/img2.jpg';
    import carouselImg3 from '../../assets/image/img3.jpg';
    export default {
        components: {
            Vip,
            Free,
            LimitedFree
        },
        name: 'classify',
        data () {
            return {
                carouselImg1,
                carouselImg2,
                carouselImg3,
                total: null,
                currentPage: 1,
                free: false,
                TopList: [],
                bookList: [],
                active: 0
            };
        },
        methods: {
            goDetail (path, name, params) {
                this.$router.push({
                    path: path,
                    name: name,
                    params: params
                });
            },
            getContent (offset) {
                console.log(offset * 20);
                this.$http.get(this.GlobalVar.apiConfig.novel.getByTypeOrStatus + '?' + 'str=已完成&offset=' + offset * 20 + '&last=20')
                    .then(
                        res => {
                            console.log(res.data);
                            this.bookList = res.data.result.bookInfos;
                            console.log(this.bookList);
                        }
                    );
            }
        },
        created () {
            console.log(this.$route.params);
            this.bookList = this.$route.params.result.bookInfos;
            this.TopList = this.bookList.slice(0, 5);
            this.total = this.$route.params.result.num;
        }
    };
</script>

<style scoped>
    .hr{
        background-color: #9e9e9e;
        border:0;
        height: 2px;
        width: 90%;
    }
</style>
