import moment from 'moment'
moment.locale("zh-cn")
//格式化时间
const formatTime = {
    getTime:(date) => {
        //日期格式化
        return moment(date).format('YYYY/MM/DD');
    }
}

export default formatTime