'use strict';

const getSelecData = (select = []) => {
   return Object.fromEntries(select.map((e) => [e, 1]));
};

const unSelecData = (select = []) => {
   return Object.fromEntries(select.map((e) => [e, 0]));
};

const removeInvalidObj = (obj) => {
   Object.keys(obj).forEach((k) => {
      if (obj[k] == null || typeof obj[k] === 'undefined') {
         delete obj[k];
      }
   });

   return obj;
};

const updateNestedObjParser = (obj) => {
   const result = {};
   Object.keys(obj).forEach(k => {
      if(typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
         const response = updateNestedObjParser(obj[k]);
         Object.keys(response).forEach(a => {
            result[`${k}.${a}`] = response[a];
         })
      } else {
         result[k] = obj[k];
      }
   })

   return result;
}

module.exports = {
   getSelecData,
   unSelecData,
   removeInvalidObj,
   updateNestedObjParser,
};
