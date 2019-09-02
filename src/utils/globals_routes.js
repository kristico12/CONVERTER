// globals routes
const path = require('path');

//utils
import query from './get_query';

//Xsl
const xsl = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Excel");

//consumo banco
const xmlBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Xml/CONSUMO_BANCO");
const modelBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");
const structureBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");

// hipotecario banco
const xmlBancoHipotecario = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Xml/HIPOTECARIO_BANCO");
const modelBancoHipotecario = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");
const structureBancoHipotecario = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");

// empleado banco
const xmlBancoEmpleado = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Xml/EMPLEADO_BANCO");
const modelBancoEmpleado = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");
const structureBancoEmpleado = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");

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