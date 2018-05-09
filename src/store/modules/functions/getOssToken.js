/**
 * Created by harryliu on 12/8/17.
 */
import api from '../../../api/api'

const getOssToken = {
    namespaced:true,
    actions:{
        getOssToken:function () {
            return new Promise(function (resolve) {
                api.ossToken().then(function (response) {
                    if (response.data.code === 200) {
                        resolve(response.data.data.osstoken)
                    }
                })
            })
        }
    }
}

export default getOssToken