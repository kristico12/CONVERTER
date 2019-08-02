// dependencies
const fs = window.require('fs');

// utils
import { modelBanco, structureBanco } from './globals_routes';

// banco consumo
const ATTRIBUTES_BANCO_CONSUMO = JSON.parse(fs.readFileSync(`${modelBanco}/CONSUMO_BANCO.json`, 'utf-8'));
const STRUCTURE_BANCO_CONSUMO = JSON.parse(fs.readFileSync(`${structureBanco}/STRUCTURE_CONSUMO_BANCO.json`, 'utf-8'))

export {
    ATTRIBUTES_BANCO_CONSUMO,
    STRUCTURE_BANCO_CONSUMO
}