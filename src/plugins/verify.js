/**
 * Created by davidPan on 4/1/18.
 * @description: verify the value as the type
 * @param : verifyList
 * @return : object
 */

export default {
    install:function (Vue) {
        Vue.prototype.$verify = (verifyList) => {
            return new Promise(function(resolve) {
                let verifyListObj = [];
                for (let key in verifyList) {
                    let verifyItem = verifyList[key];
                    if(!verifyItem) {
                        break
                    }
        
                    let isArray = Object.prototype.toString.call(verifyItem) === '[object Array]';

                    if(isArray) {
                        verifyItem.forEach(item => {
                            verifyListObj.push(item)
                        })
                    }
                    else {
                        verifyListObj.push(verifyItem)
                    }
                }

                let result = null;
                for (let key in verifyListObj) {
                    let item = verifyListObj[key], type =  item.test, value = item.value;

                    switch (type) {
                        case 'required':
                            if(value === '') {
                                result =  item.message
                            }
                            break;
                        case 'isNumber':
                            if(isNaN(value)) {
                                result =  item.message
                            }
                            break;
                        case 'minLenth':
                            if(!(value && value.length >= item.rule)) {
                                result =  item.message
                            }
                            break;
                        case 'maxLenth':
                            if(!(value && value.length <= item.rule)) {
                                result =  item.message
                            }
                            break;
                        case 'url':
                            if(!(value && /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(value))) {
                                result =  item.message
                            }
                            break;
                        case 'email':
                            if(!(value && /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value))) {
                                result =  item.message
                            }
                            break;
                        case 'expression':
                            if(!value) {
                                result =  item.message
                            }
                            break;
                        case 'regex':
                            if(!new RegExp(item.rule).test(value)) {
                                result =  item.message
                            } 
                            break;
                        default:
                            break
                    }
        
                    if(result !== null) {
                        break
                    }
                }

                result === null ? resolve({res: true}) : resolve({res:false, msg:result})

                resolve ({res: result === null, msg : result})
            })
        }
    }
}
