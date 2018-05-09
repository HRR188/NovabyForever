import rules from './rules'

let validation = {};
validation.install = function(Vue, options) {
    Vue.prototype.$validation = function(validata) {
        let errors = [],
            password = '';
        validata.map(function(item, index) {
            if ('string' === (typeof item.regex) && item.regex !== 'conformPassword') { //判断教验regex字段如果是字符串
                let reg = new RegExp(rules[item.regex].regex);
                // if (item.regex === 'password') {
                //     password = item.data
                // }
                (item.regex === 'password') && (password = item.data);
                // if (!reg.test(item.data)) {
                //     errors.push(validata[index].message)
                // }
                (!reg.test(item.data)) && (errors.push(validata[index].message))
            } else if (item.regex === 'conformPassword') {
                // if (item.data.toString() !== password.toString()) {
                //     errors.push(validata[index].message)
                // }
                (item.data.toString() !== password.toString()) && (errors.push(validata[index].message))
            } else {
                let reg = new RegExp(item.regex);
                (!reg.test(item.data)) && (errors.push(validata[index].message))
            }
        });
        if (errors.length) {
            return errors[0]
        } else {
            return true
        }
    }
};
export default validation
/*
    let validata = [
        {
          data:'249585474@qq.com',
          message:'请填写用户id',
          regex:'email'
        },
        {
          data:this.email,
          message:'请填写邮箱',
          regex:'email'
        },
        {
          data:this.password,
          message:'请输入密码',
          regex:'password'
        },
        {
          data:123456789,
          message:'两次密码输入不一致',
          regex:'conformPassword'
        },
        {
          data:18805075325,
          message:'请输入正确的手机号',
          regex:/^1[34578]\d{9}$/
        }
       
      ]
      console.warn(this.$validation(validata))
 */