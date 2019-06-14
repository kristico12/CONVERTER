// dependencies
const fs = window.require('fs');

// utils
import { modelBanco } from './globals_routes';

// banco consumo
const ATTRIBUTES_BANCO_CONSUMO = JSON.parse(fs.readFileSync(`${modelBanco}/CONSUMO_BANCO.json`, 'utf-8'));


export {
    ATTRIBUTES_BANCO_CONSUMO
}