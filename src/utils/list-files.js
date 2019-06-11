const fs = window.require('fs');

// get list files in directory
function List_files(route) {
    return fs.readdirSync(route);
}
export {
    List_files
}