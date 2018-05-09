/**
 * @author harryliu on 20/03/2018
 * @GitHub https://github.com/harry-liu
 */

class File{
    constructor({id,dir = '',name,file,size,isCorrectFile = true,status = 'waiting',progress = 0}){
        this.name = name;
        this.progress = progress;
        this.id = id;
        this.file = file;
        this.size = size;
        this.status = status; //0: 还没上传 1：开始上传 2：上传成功 3：上传失败
        this.isCorrectFile = isCorrectFile;
        this.dir = dir;
    }
    setCustomValue(value){
        if(value !== null && typeof value === 'object'){
            Object.assign(this,value)
        }
    }
    get getSrc(){
        if(this.dir){
            return this.dir + '/' + this.name
        }
        else{
            return this.name
        }
    }
    get getSize(){
        return this.size
    }
}

export default File