/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/7/4
 */

// 设置路由以及ip
// const ip = 'http://192.168.43.151:8080';
// const ip = 'http://192.168.2.205:8080';
const ip = 'http://140.143.138.93/novel';

const apiConfig = {
    auth: {
        Login: ip + '/sign/in',
        RegistPhone: ip + '/register/phone',
        RegistCheckPhone: ip + '/register/checkphone',
        RegisrEmail: ip + '/register/mail',
        Logout: ip + '/sign/out'
    },
    novel: {
        Detail: ip + '/bookinfo/getBookTitles?bookId=',
        uploadFile: ip + '/uploadfile',
        uploadFinish: ip + '/uploadfinish',
        getByTypeOrStatus: ip + '/bookinfo/getByTypeOrStatus',
        topClick: ip + '/count/topclick',
        getContent: ip + '/bookinfo/getBookContentByBook',
        downLoad: ip + '/download?bookId=',
        searchPage: ip + '/bookinfo/getByLimit'
    }
};

export default {
    apiConfig
};
