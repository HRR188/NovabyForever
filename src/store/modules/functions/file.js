/**
 * @author harryliu on 21/03/2018
 * @GitHub https://github.com/harry-liu
 */

import api from '../../../api/api'

const file = {
    namespaced:true,
    actions:{
        async getFileTypeList(context,type) {
            let response = await api.getData('getFileTypeList',type);
            return response.data
        }
    }
};

export default file