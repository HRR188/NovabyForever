/**
 * Created by harryliu on 23/5/17.
 */

export const getUploadProjectImgs = (state)=>{
    let arr = []
    state.imageUpload.uploadImageList.forEach(function (img) {
        let obj = {}
        obj.src = img.dir + img.name
        obj.size = img.file.size
        obj.iscover = +img.cover
        arr.push(obj)
    })
    return arr;
}
