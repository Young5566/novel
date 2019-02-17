<template>
    <div style="width: 100%; display: flex; justify-content: center">
        <div style="width: 70vw; display: flex; flex-direction: column; margin-top: 4vh">
            <mu-paper class="paper-content" :z-depth="3" style="padding: 2vh 2vw; margin-top:3vh;display: flex; border-radius: 20px"
                        v-for="bookInfo in bookList" :key="bookInfo.bookInfo_id">
                <div style="width: 80%;display: flex;">
                    <div>
                        <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})" style="color: #212121"><img :src="bookInfo.tImgurl"/></a>
                    </div>
                    <div style="margin-left: 3vw;">
                        <div style="font-size: 22px; font-weight: 600; text-align: left">
                            <a href="#" @click="goDetail('/detail', 'Detail', {bookInfo})" style="color: #212121">{{bookInfo.tBookname}}</a>
                        </div>
                        <p style="text-align: left">
                            <span style="color:#757575;margin-right: 1vw">{{bookInfo.tAuthor}}</span>
                            <span style="color:#757575;margin-right: 1vw">{{searchValue}}</span>
                            <span style="color:#757575;margin-right: 1vw">{{bookInfo.tSerial}}</span>
                        </p>
                        <div style="text-align: left; padding-right: 3vw">{{bookInfo.tDetail}}</div>
                    </div>
                </div>
                <div style="width: 20%">
                    <mu-button style="" color="primary" @click="goDetail('/detail', 'Detail', {bookInfo})">免费阅读</mu-button>
                </div>
            </mu-paper>
            <div>
                <mu-flex justify-content="center" style="margin: 32px 0;">
                    <mu-pagination :page-size="20" @change="getContent(currentPage)" raised :total="total" :current.sync="currentPage"></mu-pagination>
                </mu-flex>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vip',
        data () {
            return {
                bookList: [],
                total: null,
                searchValue: '',
                currentPage: 1
            };
        },
        methods: {
            // 转到详情页面
            goDetail (path, name, params) {
                window.localStorage.setItem('bookInfo', JSON.stringify(params.bookInfo));
                this.$router.push({
                    path: path,
                    name: name,
                    params: params
                });
            },
            // 分页调用用函数
            getContent (offset) {
                this.$http.get(this.GlobalVar.apiConfig.novel.searchPage + '?' + 'str=' + this.searchValue + '&offset=' + offset * 20 + '&limit=20')
                    .then(
                        res => {
                            if (res.data.code === 200) {
                                // console.log(res.data);
                                this.bookList = res.data.result.bookInfos;
                            } else {
                                console.log('search' + res);
                            }
                        }
                    );
            }
        },
        // 数据初始化
        created () {
            this.total = this.$route.params.data.num;
            this.bookList = this.$route.params.data.bookInfos;
            this.searchValue = this.$route.params.searchValue;
            // console.log(this.bookList);
        }
    };
</script>

<style scoped>

</style>
