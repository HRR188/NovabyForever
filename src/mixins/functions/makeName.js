/**
 * Created by harryliu on 7/8/17.
 */
export default {
    methods:{
        makeImgName(file){
            let text = "";
            let fileType = file.type;
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( let i=0; i < 10; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            if(fileType.indexOf('jpg') > 0){
                text += '.jpg'
            }
            else if(fileType.indexOf('png') > 0){
                text += '.png'
            }
            else if(fileType.indexOf('jpeg') > 0){
                text += '.jpeg'
            }
            return text;
        }
    }
}