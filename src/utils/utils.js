// dependencies
import XLSX from 'xlsx';
const fs = window.require('fs');


// routes
import { xsl } from './globals_routes';

function Generate_Excel(array_data, title) {
    let r = { bool: true };
    const routeName = `${xsl}/${title}.xlsx`;
    const isExist = () => {
        try {
            return fs.statSync(routeName).isFile();
        } catch (e) {
            return false;
        }
    }
    const isExistlocal = isExist();
    try {
        let sh, range, ultimate_row, ws;
        const insert = {};
        // se lee el archivo || se crea el archivo
        let wb = isExistlocal ?
            XLSX.read(fs.readFileSync(routeName), { type: "buffer" })
            : XLSX.utils.book_new();
        if (isExistlocal) {
            sh = wb.Sheets[wb.SheetNames[0]];
            // obtenemos el rango
            range = XLSX.utils.decode_range(sh["!ref"]);
            ultimate_row = Object.assign({}, range).e.r + 2;
        } else {
            wb.Props = {
                Title: title,
                Company: "Bancolombia",
            }
            wb.SheetNames.push("Bancolombia");
        }
        // se condiciona la informacion
        array_data.forEach((item, i) => {
            insert[insert.hasOwnProperty(item.title) ? `${item.title}-${i}` : item.title] = item.value;
        })
        // se procede a insertar los valores
        ws = isExistlocal ?
            XLSX.utils.sheet_add_json(sh, [insert], { origin: { r: ultimate_row, c: 0 } })
            : XLSX.utils.json_to_sheet([insert]);
        wb.Sheets[wb.SheetNames[0]] = ws;
        const wOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // se guarda el archivo
        fs.writeFileSync(routeName, new Buffer(wOut));
    } catch (error) {
        r = { bool: false, error };
    }
    return r;
}

function Generate_Array_Xls(model, data, title) {
    let r = { bool: true };
    const key_variable = Object.keys(model);
    data.forEach(item => {
        const array_info_excel = [];
        key_variable.forEach(key => {
            try {
                let info;
                info = item[key];
                let getData;
                if (info.hasOwnProperty('_attributes') || info.hasOwnProperty('_text')) {
                    getData = Object.assign({}, info._attributes || info._text);
                    const list_variables_model = Object.keys(model[key]);
                    list_variables_model.forEach(variable_model => {
                        array_info_excel.push({ title: variable_model, value: getData[variable_model] })
                    })
                } else {
                    const key_getData = Object.keys(info);
                    const list_variables_model = Object.keys(model[key]);
                    key_getData.forEach(val => {
                        getData = Object.assign({}, info[val]._attributes || info[val]._text);
                        list_variables_model.forEach(variable_model => {
                            array_info_excel.push({ title: variable_model, value: getData[variable_model] })
                        })
                    })
                }
            } catch (e) {
                console.log(e);
            }
        })
        // asignacion manual de los reason number, reason text and desicion response
        try {
            let desicion = Object.assign({}, item.Decision);
            if (desicion.hasOwnProperty("0")) desicion = Object.keys(desicion).map(val => desicion[val]);
            if (Array.isArray(desicion)) {
                desicion.forEach(deci => {
                    // tomamos el desicion result
                    array_info_excel.push({ title: "DecisionResult", value: deci._attributes.DecisionResult });
                    // verificamos los reason text and number
                    let reason = Object.assign({}, deci.Reason);
                    if (reason.hasOwnProperty("0")) reason = Object.keys(reason).map(val => reason[val]);
                    // se verifica si hay varias razones
                    if (Array.isArray(reason)) {
                        reason.forEach(reci => {
                            // tomamos el reason order number
                            array_info_excel.push({ title: "RankOrderNumber", value: reci._attributes.RankOrderNumber });
                            // tomamos el reason text
                            array_info_excel.push({ title: "ReasonText", value: reci.ReasonText._text });
                        })
                    } else {
                        // tomamos el reason order number
                        array_info_excel.push({ title: "RankOrderNumber", value: reason._attributes.RankOrderNumber });
                        // tomamos el reason text
                        array_info_excel.push({ title: "ReasonText", value: reason.ReasonText._text });
                    }
                })
            } else {
                // tomamos el desicion result
                array_info_excel.push({ title: "DecisionResult", value: desicion._attributes.DecisionResult });
                // verificamos los reason text and number
                const reason = Object.assign({}, desicion.Reason);
                // se verifica si hay varias razones
                if (Array.isArray(reason)) {
                    reason.forEach(reci => {
                        // tomamos el reason order number
                        array_info_excel.push({ title: "RankOrderNumber", value: reci._attributes.RankOrderNumber });
                        // tomamos el reason text
                        array_info_excel.push({ title: "ReasonText", value: reci.ReasonText._text });
                    })
                } else {
                    // tomamos el reason order number
                    array_info_excel.push({ title: "RankOrderNumber", value: reason._attributes.RankOrderNumber });
                    // tomamos el reason text
                    array_info_excel.push({ title: "ReasonText", value: reason.ReasonText._text });
                }
            }
        } catch (error) {
            console.log(error)
        }
        const result = Generate_Excel(array_info_excel, title);
        if (!result.bool) {
            r = result
        }
    })
    return r;
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
    return Generate_Array_Xls(model, array_data, title);
}

export {
    Generate_Data
}