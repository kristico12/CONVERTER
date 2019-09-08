// globals routes
const path = require('path');

//utils
import query from './get_query';

//Xsl
const xsl = path.join(query(window.location.search).home, "/Documents/CONVERTER/Excel");

//consumo banco
const xmlBanco = path.join(query(window.location.search).home, "/Documents/CONVERTER/Xml/CONSUMO_BANCO");
const modelBanco = path.join(query(window.location.search).home, "/Documents/CONVERTER/Data Model");
const structureBanco = path.join(query(window.location.search).home, "/Documents/CONVERTER/Data Model");

// hipotecario banco
const xmlBancoHipotecario = path.join(query(window.location.search).home, "/Documents/CONVERTER/Xml/HIPOTECARIO_BANCO");
const modelBancoHipotecario = path.join(query(window.location.search).home, "/Documents/CONVERTER/Data Model");
const structureBancoHipotecario = path.join(query(window.location.search).home, "/Documents/CONVERTER/Data Model");

// empleado banco
const xmlBancoEmpleado = path.join(query(window.location.search).home, "/Documents/CONVERTER/Xml/EMPLEADO_BANCO");
const modelBancoEmpleado = path.join(query(window.location.search).home, "/Documents/CONVERTER/Data Model");
const structureBancoEmpleado = path.join(query(window.location.search).home, "/Documents/CONVERTER/Data Model");

export {
    xsl,
    xmlBanco,
    modelBanco,
    structureBanco,
    xmlBancoHipotecario,
    modelBancoHipotecario,
    structureBancoHipotecario,
    xmlBancoEmpleado,
    modelBancoEmpleado,
    structureBancoEmpleado
}