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
        let sh, shce, shci, range, rangece, rangeci, ultimate_row, ultimate_row_ce, ultimate_row_ci,
            wsb, wsci, wsce;
        const insert = {}, insertCi = {}, insertCe = {};
        // se lee el archivo || se crea el archivo
        let wb = isExistlocal ?
            XLSX.read(fs.readFileSync(routeName), { type: "buffer" })
            : XLSX.utils.book_new();
        if (isExistlocal) {
            sh = wb.Sheets[wb.SheetNames[0]];
            shce = wb.Sheets[wb.SheetNames[1]];
            shci = wb.Sheets[wb.SheetNames[2]];

            // obtenemos el rango
            range = XLSX.utils.decode_range(sh["!ref"]);
            rangece = XLSX.utils.decode_range(shce["!ref"]);
            rangeci = XLSX.utils.decode_range(shci["!ref"]);

            ultimate_row = Object.assign({}, range).e.r + 1;
            ultimate_row_ce = Object.assign({}, rangece).e.r + 2;
            ultimate_row_ci = Object.assign({}, rangeci).e.r + 2;
        } else {
            wb.Props = {
                Title: title,
                Company: "Bancolombia",
            }
            wb.SheetNames.push("Bancolombia");
            wb.SheetNames.push("CUN-CE");
            wb.SheetNames.push("CUN-CI");
        }
        // se condiciona la informacion de la hoja principal
        const print = array_data.filter(item => item.book === "PRINCIPAL");
        print.forEach((item, i) => {
            insert[insert.hasOwnProperty(item.title) ? `${item.title}-${i}` : item.title] = item.value;
        })
        // se condiciona la informacion de la hoja CE
        const ce = array_data.filter(item => item.book === "CENTRAL_EXTERNA");
        ce.forEach((item, i) => {
            insertCe[insertCe.hasOwnProperty(item.title) ? `${item.title}-${i}` : item.title] = item.value;
        })
        // se condiciona la informacion de la hoja CE
        const ci = array_data.filter(item => item.book === "CENTRAL_INTERNA");
        ci.forEach((item, i) => {
            insertCi[insertCi.hasOwnProperty(item.title) ? `${item.title}-${i}` : item.title] = item.value;
        })
        // se procede a insertar los valores del principal
        wsb = isExistlocal ?
            XLSX.utils.sheet_add_json(sh, [insert], { origin: { r: ultimate_row, c: 0 }, skipHeader: true })
            : XLSX.utils.json_to_sheet([insert]);
        // se procede a insertar los valores de CE
        wsce = isExistlocal ?
            XLSX.utils.sheet_add_json(shce, [insertCe], { origin: { r: ultimate_row_ce, c: 0 } })
            : XLSX.utils.json_to_sheet([insertCe]);
        // se procede a insertar los valores de CI
        wsci = isExistlocal ?
            XLSX.utils.sheet_add_json(shci, [insertCi], { origin: { r: ultimate_row_ci, c: 0 } })
            : XLSX.utils.json_to_sheet([insertCi]);
        // se procede a registrar los valores
        wb.Sheets[wb.SheetNames[0]] = wsb;
        wb.Sheets[wb.SheetNames[1]] = wsce;
        wb.Sheets[wb.SheetNames[2]] = wsci;
        const wOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // se guarda el archivo
        fs.writeFileSync(routeName, new Buffer(wOut));
    } catch (error) {
        r = { bool: false, error };
    }
    return r;
}

function Generate_Array_Xls(model, data, title, structure) {
    let r = { bool: true };
    const key_variable = Object.keys(model);
    data.forEach(item => {
        const array_info_excel = [];
        // asignacion manual omdm
        let book = "PRINCIPAL";
        const cda = item.CDA_ENTRADA;
        if (cda.hasOwnProperty('_attributes')) {
            array_info_excel.push({ title: 'NUMERO_DE_SOLICITUD', value: cda._attributes.NUMERO_DE_SOLICITUD, book })
        }
        key_variable.forEach(key => {
            try {
                let info;
                info = item[key];
                let getData;
                // verificamos si pertenece a CE o CI
                if (structure[key].find(item => item === "CENTRAL_EXTERNA") !== undefined) {
                    book = "CENTRAL_EXTERNA";
                } else if (structure[key].find(item => item === "CENTRAL_INTERNA") !== undefined) {
                    book = "CENTRAL_INTERNA";
                } else {
                    book = "PRINCIPAL";
                }
                if (info.hasOwnProperty('_attributes') || info.hasOwnProperty('_text')) {
                    getData = Object.assign({}, info._attributes || info._text);
                    const list_variables_model = Object.keys(model[key]);
                    list_variables_model.forEach(variable_model => {
                        array_info_excel.push({ title: variable_model, value: getData[variable_model], book })
                    })
                } else {
                    const key_getData = Object.keys(info);
                    const list_variables_model = Object.keys(model[key]);
                    key_getData.forEach(val => {
                        getData = Object.assign({}, info[val]._attributes || info[val]._text);
                        list_variables_model.forEach(variable_model => {
                            array_info_excel.push({ title: variable_model, value: getData[variable_model], book })
                        })
                    })
                }
            } catch (e) {
                console.log(e);
            }
        })
        // vovlemos a iniciarlo en principal
        book = "PRINCIPAL";
        // asignacion manual de los reason number, reason text and desicion response
        try {
            let desicion = Object.assign({}, item.Decision);
            if (desicion.hasOwnProperty("0")) desicion = Object.keys(desicion).map(val => desicion[val]);
            if (Array.isArray(desicion)) {
                desicion.forEach(deci => {
                    // tomamos el desicion result
                    array_info_excel.push({ title: "DecisionResult", value: deci._attributes.DecisionResult, book });
                    // verificamos los reason text and number
                    let reason = Object.assign({}, deci.Reason);
                    if (reason.hasOwnProperty("0")) reason = Object.keys(reason).map(val => reason[val]);
                    // se verifica si hay varias razones
                    if (Array.isArray(reason)) {
                        reason.forEach(reci => {
                            // tomamos el reason order number
                            array_info_excel.push({ title: "RankOrderNumber", value: reci._attributes.RankOrderNumber, book });
                            // tomamos el reason text
                            array_info_excel.push({ title: "ReasonText", value: reci.ReasonText._text, book });
                        })
                    } else {
                        // tomamos el reason order number
                        array_info_excel.push({ title: "RankOrderNumber", value: reason._attributes.RankOrderNumber, book });
                        // tomamos el reason text
                        array_info_excel.push({ title: "ReasonText", value: reason.ReasonText._text, book });
                    }
                })
            } else {
                // tomamos el desicion result
                array_info_excel.push({ title: "DecisionResult", value: desicion._attributes.DecisionResult, book });
                // verificamos los reason text and number
                const reason = Object.assign({}, desicion.Reason);
                // se verifica si hay varias razones
                if (Array.isArray(reason)) {
                    reason.forEach(reci => {
                        // tomamos el reason order number
                        array_info_excel.push({ title: "RankOrderNumber", value: reci._attributes.RankOrderNumber, book });
                        // tomamos el reason text
                        array_info_excel.push({ title: "ReasonText", value: reci.ReasonText._text, book });
                    })
                } else {
                    // tomamos el reason order number
                    array_info_excel.push({ title: "RankOrderNumber", value: reason._attributes.RankOrderNumber, book });
                    // tomamos el reason text
                    array_info_excel.push({ title: "ReasonText", value: reason.ReasonText._text, book });
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
    return Generate_Array_Xls(model, array_data, title, structure);
}

export {
    Generate_Data
}