
function Generate_Data(model, data, structure) {
    // tomamos los keys de entrada de la estructura
    const object_structure = Object.keys(structure);
    // data array files
    const data_data = data.slice();
    let show = false;
    data_data.forEach(item => {
        object_structure.forEach(key_structure => {
            const data_structure = structure[key_structure].slice();
            //datos a estraer
            let dataLevel = item;
            data_structure.forEach(level => {
                dataLevel = Object.assign({}, dataLevel[level]);
            });
            // se obtiene los datos necesarios
            const infoDataLevel = Object.assign({}, dataLevel);
            if (!show) console.log(infoDataLevel); else show = true;
        })
    });
}

export {
    Generate_Data
}