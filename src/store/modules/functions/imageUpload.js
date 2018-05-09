/**
 * Created by harryliu on 19/5/17.
 */
import api from '../../../api/api'

function makeName(file)
{
    let text = "";
    let fileType = file.file.type;
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

class Image{
    constructor(file){
        this.file = file.file;
        this.name = makeName(file);
        this.cover = false;
        this.src = file.src;
        this.percent = 0;
        this.dir = file.dir;
    }
}

const imageUpload = {
    namespaced:true,
    state:{
        uploadImageList:[],
        userCover:'',
        userCoverPosition:{
            top:0,
            left:0
        }
    },
    mutations:{
        addImg:function (state,imgFile) {
            let img = new Image(imgFile);
            if(state.uploadImageList.length === 0){
                img.cover = true;
            }
            state.uploadImageList.push(img)
        },
        changeUserCover:function (state,src) {
            state.userCover = src;
        },
        changeUserCoverPosition:function (state,data) {
            state.userCoverPosition = data
        },
        setCover:function (state,index) {
            for (let i = 0; i< state.uploadImageList.length;i++){
                state.uploadImageList[i].cover = i === index;
            }
        },
        setProgress:function (state,item) {
            state.uploadImageList.forEach(function (img) {
                if(img.name === item.name){
                    img.percent = item.percent;
                }
            })
        },
        deleteImg:function (state,index) {
            if(state.uploadImageList[index].cover){
                state.uploadImageList[0].cover = true;
            }
            state.uploadImageList.splice(index,1);
        },
        clearProjectImgs:function (state) {
            state.uploadImageList = []
        }
    },
    actions:{
        getOssToken:function () {
            let promise = new Promise(function (resolve) {
                api.ossToken().then(function (response) {
                    if (response.data.code === 200) {
                        resolve(response.data.data.osstoken)
                    }
                })
            })
            return promise
        }
    }

}

export default imageUpload