// dependencies
const fs = window.require('fs');

// utils
import { modelBanco, structureBanco, modelBancoHipotecario, structureBancoHipotecario } from './globals_routes';

// banco consumo
const ATTRIBUTES_BANCO_CONSUMO = () => JSON.parse(fs.readFileSync(`${modelBanco}/CONSUMO_BANCO.json`, 'utf-8'));
const STRUCTURE_BANCO_CONSUMO = () => JSON.parse(fs.readFileSync(`${structureBanco}/STRUCTURE_CONSUMO_BANCO.json`, 'utf-8'))

// banco hipotecario
const ATTRIBUTES_BANCO_HIPOTECARIO = () => JSON.parse(fs.readFileSync(`${modelBancoHipotecario}/HIPOTECARIO_BANCO.json`, 'utf-8'));
const STRUCTURE_BANCO_HIPOTECARIO = () => JSON.parse(fs.readFileSync(`${structureBancoHipotecario}/STRUCTURE_HIPOTECARIO_BANCO.json`, 'utf-8'))

export {
    ATTRIBUTES_BANCO_CONSUMO,
    STRUCTURE_BANCO_CONSUMO,
    ATTRIBUTES_BANCO_HIPOTECARIO,
    STRUCTURE_BANCO_HIPOTECARIO
}