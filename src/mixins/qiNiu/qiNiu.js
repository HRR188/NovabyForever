/**
 * @author harryliu on 19/03/2018
 * @GitHub https://github.com/harry-liu
 */

import * as qiniu from 'qiniu-js'
import store from '../../store/store'

let QiNiu = {
    async getQiNiuToken(){
        return await store.dispatch('qiNiu/getQiNiuToken');
    },
    async uploadQiNiu(file,name,observer){
        let setting = await this.getQiNiuToken();
        let observable = qiniu.upload(file, name, setting.data.token,{params:{}},{region:setting.data.region});
        observable.subscribe(observer)
    }
};

export default QiNiu