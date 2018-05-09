/**
 * @author harryliu on 20/03/2018
 * @GitHub https://github.com/harry-liu
 */
import zip from "../../plugins/zip/zip";

function onerror(message) {
    console.error(message);
}
function checkFilesInZip(file, onend) {
    zip.createReader(new zip.BlobReader(file), function(zipReader) {
        zipReader.getEntries(onend);
    }, onerror);
}

export default checkFilesInZip
