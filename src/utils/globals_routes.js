// globals routes
const path = require('path');

//utils
import query from './get_query';

//Xsl
const xslBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Excel");

//consumo banco
const xmlBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Xml/CONSUMO_BANCO");
const modelBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");
const structureBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Data Model");

export {
    xmlBanco,
    xslBanco,
    modelBanco,
    structureBanco
}