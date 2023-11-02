'use strict'


const getSelecData = (select = []) => {
    return Object.fromEntries(select.map(e => [e, 1]));
}

const unSelecData = (select = []) => {
    return Object.fromEntries(select.map(e => [e, 0]));
}

module.exports = {
    getSelecData,
    unSelecData,
}