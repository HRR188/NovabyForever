<template>
    <div class="model-upload-img-warp">
        <input type="file" style="display: none" ref="inputCover" @change="coverPush" >
    </div>
</template>

<script>
    import qiNiu from '../../mixins/qiNiu/qiNiu'

    export default {
        name: 'model-cover-image-upload',
        mixins: [qiNiu],
        props: {
            propImageList: {
                type: Array
            },
        },
        methods: {
            coverPush(file) {
                let _this = this;
                let name = _this.randomWord(true, 12, 14) + '.png';
                let img = {
                    name: name,
                    src: '',
                    dir: name,
                    percent: 0,
                    width: 200,
                    height: 100,
                    isCover: 1,
                };
                let blobFile = this.base64toBlob(file);
                _this.pushImg(img);
                _this.setSrc(name, file);
                _this.uploadImgQiNiu(img, blobFile);
            },
            base64toBlob: function (coverFiles) {
                let arr = coverFiles.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                    type: mime
                });
            },
            pushImg:function (img) {
                this.propImageList.push(img);
                this.imagesChange()
            },
            imagesChange:function (name) {
                let imageList = this.propImageList.map(img => {
                    return {
                        name:img.name,
                        src:img.dir,
                        size:img.size,
                        iscover:img.iscover,
                        width:img.width,
                        height:img.height,
                        base64:img.src
                    }
                });
                    this.$emit('imagesChange',imageList);
            },
            getOssToken() {
                let _this = this;
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('getOssToken/getOssToken').then((response) => {
                        _this.ossSet = response;
                        resolve(true)
                    })
                })
            },
            uploadImgQiNiu(img, file) {
                let _that = this;
                this.startUploadImg();
                let observer = {
                    next: (res) => {
                    },
                    error: (err) => {
                        console.warn('upload progress unable to compute: ' + err);
                    },
                    complete: (res) => {
                        _that.setDir({name: name, dir: res.key, size: file.size});
                        _that.finishUploadImg()
                    }
                };
                qiNiu.uploadQiNiu(file, img.name, observer)
            },
            startUploadImg: function () {
                this.uploadingImgNumberP++
            },
            finishUploadImg: function () {
                this.uploadingImgNumberP--
            },
            setSrc:function (data) {
                this.propImageList.forEach(img =>{
                    if(img.name === data.name){
                        img.src = data.src;
                        return null;
                    }
                });
                this.imagesChange()
            },
            setDir:function (data) {
                this.propImageList.forEach(img =>{
                    if(img.name === data.name){
                        img.dir = data.dir;
                        img.size = data.size;
                        return null;
                    }
                });
                this.imagesChange()
            },
            //random str
            randomWord: function (randomFlag, min, max) {
                let str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                // 随机产生
                if (randomFlag) {
                    range = Math.round(Math.random() * (max - min)) + min;
                }
                for (let i = 0; i < range; i++) {
                    let pos = Math.round(Math.random() * (arr.length - 1));
                    str += arr[pos];
                }
                return str;
            }
        }
    }
</script>

