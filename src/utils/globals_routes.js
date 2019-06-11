// globals routes
const path = require('path');

//utils
import query from './get_query';

const xmlBanco = path.join(query(window.location.search).home, "/Documents/XmlToXsl/Xml/CONSUMO_BANCO");

export {
    xmlBanco,
}