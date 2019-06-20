function Generate_Array_Xls(model, data) {
    const key_variable = Object.keys(model);
    data.forEach(item => {
        const array_info_excel = [];
        key_variable.forEach(key => {
            try {
                let info;
                info = item[key];
                let getData;
                if (info.hasOwnProperty('_attributes')) {
                    getData = Object.assign({}, info._attributes);
                    const list_variables_model = Object.keys(model[key]);
                    list_variables_model.forEach(variable_model => {
                        array_info_excel.push({ title: variable_model, value: getData[variable_model] })
                    })
                    //console.log(list_variables_model);
                    //console.log(getData);
                } else {
                    const key_getData = Object.keys(info);
                    key_getData.forEach(val => {
                        getData = Object.assign({}, info[val]._attributes);
                        //console.log(getData);
                    })
                }
            } catch (e) {
                console.log(e);
            }
        })
        //console.log(typeof item);
        console.log(array_info_excel);
    })
    //console.log(data);
}
function Generate_Data(model, data, structure) {
    // tomamos los keys de entrada de la estructura
    const object_structure = Object.keys(structure);
    // data array files
    const data_data = data.slice();
    const array_data = [];
    data_data.forEach(item => {
        //datos a estraer
        let dataLevel = {};
        object_structure.forEach(key_structure => {
            const data_structure = structure[key_structure].slice();
            let object_temp = item;
            data_structure.forEach(level => {
                object_temp = Object.assign({}, object_temp[level])
            });
            dataLevel[key_structure] = Object.assign({}, object_temp);
        })
        array_data.push(dataLevel);
    });
    Generate_Array_Xls(model, array_data);
}

export {
    Generate_Data
}