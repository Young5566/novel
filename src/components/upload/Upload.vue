<template>
    <div style="width: 35vw; padding: 1vh 2vw; display: flex; flex-direction: column">
        <label style="font-size: 34px; font-weight: 400;text-align: center">上传文件</label>
        <div style="margin-top: 2vh; display: flex; flex-direction: column; justify-content: center">
            <div>
                <div style="border-width: 1px; display: flex; align-items: center; height: 7vh">
                    <!--<mu-text-field type="file" id="file" placeholder="请添加文件" style="opacity: 1; margin-top: 4vh"-->
                                   <!--v-model="textFile" @change="uploadConfig"></mu-text-field>-->
                    <input type="file" value="" id="file" @change="uploadConfig">
                </div>
            </div>
            <div>
                <mu-text-field v-model="bookInfo.tBookname"  label="书名" style="font-size: 24px; font-weight: 400;" full-width></mu-text-field>
            </div>
            <div>
                <mu-select label="类型" v-model="bookInfo.tType" style="font-size: 24px; font-weight: 400;" full-width>
                    <mu-option v-for="eachType in typesList" :key="eachType" :label="eachType" :value="eachType"></mu-option>
                </mu-select>
            </div>
            <div>
                <mu-select label="选择标签" multiple chips v-model="bookInfo.tTags" full-width>
                        <mu-option v-for="each in typesList" :key="each" :label="each" :value="each"></mu-option>
                </mu-select>
            </div>
            <div>
                <mu-text-field v-model="bookInfo.tAuthor" label="作者" style="font-size: 24px; font-weight: 400;" full-width></mu-text-field>
            </div>
            <div>
                <mu-text-field v-model="bookInfo.tDetail" label="简介" style="font-size: 15px; font-weight: 400;"  multi-line :rows="3" :rows-max="3" full-width></mu-text-field>
            </div>
            <mu-button color="primary" @click="Upload()">
                <mu-icon left size="30" value="cloud_upload"></mu-icon>
                提交
            </mu-button>
        </div>
        <mu-dialog :title="uploadMsg" width="360" :open="open"></mu-dialog>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data () {
            return {
                typesList: ['', '完本', '免费', '名著', '都市', '修仙', '灵异', '玄幻', '言情'],
                value3: [],
                bookInfo: {
                    tBookname: '',
                    tType: '',
                    tTags: [],
                    tAuthor: '',
                    tDetail: ''
                },
                tAddr: '',
                open: false,
                uploadMsg: ''
            };
        },
        methods: {
            close () {
              this.open = !this.open;
            },
            // 上传文件
            Upload () {
                // 验证是否是登陆状态
                if (window.localStorage.getItem('token') == null) {
                    this.$router.push('/login');
                } else {
                    this.bookInfo['tAddr'] = this.tAddr;
                    this.bookInfo.tTags = this.bookInfo.tTags.join(',');
                    this.$http.post(this.GlobalVar.apiConfig.novel.uploadFinish, this.bookInfo)
                        .then(
                            res => {
                                if (res.data.code === 200) {
                                    this.close();
                                    this.uploadMsg = '上传成功！';
                                    setTimeout(this.close, 1000);
                                    this.$emit('closeDialog');
                                } else {
                                    this.close();
                                    this.uploadMsg = res.data.message;
                                    setTimeout(this.close, 1000);
                                    this.$emit('closeDialog');
                                }
                            },
                            err => {
                                console.log(err);
                            }
                        );
                }
            },
            // 上传配置
            uploadConfig (e) {
                if (window.localStorage.getItem('token') == null) {
                    this.$router.push('/login');
                } else {
                    let formData = new FormData();
                    formData.append('file', e.target.files[0]);
                    let url = this.GlobalVar.apiConfig.novel.uploadFile;
                    // 设置http头
                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    };
                    this.$http.post(url, formData, config).then((response) => {
                        if (response.data.code === 200) {
                            this.close();
                            this.uploadMsg = response.data.message;
                            setTimeout(this.close, 1000);
                            // console.log(response.data.message);
                            this.tAddr = response.data.result;
                        } else {
                            this.close();
                            this.uploadMsg = response.data.message;
                            setTimeout(this.close, 1000);
                            // console.log(response.data.message);
                        }
                    });
                }
            }
        }
    };
</script>

<style scoped>

</style>
