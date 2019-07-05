const fs = window.require('fs');

// get list files in directory
function List_files(route) {
    return fs.readdirSync(route);
}
//rename files
function Rename_files(oldpath, newpath) {
    fs.renameSync(oldpath, newpath);
}

export {
    List_files,
    Rename_files
}