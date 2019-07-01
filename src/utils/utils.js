// dependencies
import XLSX from 'xlsx';
const fs = window.require('fs');


// routes
import { xsl } from './globals_routes';


function Generate_Excel(array_data, title) {
    const routeName = `${xsl}/${title}.xlsx`;
    const isExist = () => {
        try {
            return fs.statSync(routeName).isFile();
        } catch (e) {
            return false;
        }
    }
    if (isExist()) {
        // se lee el archivo
        const file = fs.readFileSync(routeName);
        const wb = XLSX.read(file, { type: "buffer" });
        const sh = wb.Sheets[wb.SheetNames[0]];
        // obtenemos el rango
        const range = XLSX.utils.decode_range(sh["!ref"]);
        const ultimate_column = Object.assign({}, range).e.c + 2;
        // procederemos a insertar nuevos valores
        const ws = XLSX.utils.sheet_add_json(sh, array_data, { skipHeader: true, origin: { r: 0, c: ultimate_column } });
        wb.Sheets[wb.SheetNames[0]] = ws;
        const wOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // se guarda el archivo
        fs.writeFileSync(routeName, new Buffer(wOut));
    } else {
        // se crea el archivo
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: title,
            Company: "Bancolombia",
        }
        wb.SheetNames.push("Bancolombia");
        // se inserta en el archivo creado
        const ws = XLSX.utils.json_to_sheet(array_data, { skipHeader: true });
        wb.Sheets["Bancolombia"] = ws;
        const wOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // se guarda el archivo
        fs.writeFileSync(routeName, new Buffer(wOut));
    }
}

function Generate_Array_Xls(model, data, title) {
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
                } else {
                    const key_getData = Object.keys(info);
                    const list_variables_model = Object.keys(model[key]);
                    key_getData.forEach(val => {
                        getData = Object.assign({}, info[val]._attributes);
                        list_variables_model.forEach(variable_model => {
                            array_info_excel.push({ title: variable_model, value: getData[variable_model] })
                        })
                    })
                }
            } catch (e) {
                console.log(e);
            }
        })
        Generate_Excel(array_info_excel, title);
    })
}
function Generate_Data(model, data, structure, title) {
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
    Generate_Array_Xls(model, array_data, title);
}

export {
    Generate_Data
}