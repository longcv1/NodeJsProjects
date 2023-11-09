'use strict';

const { getSelecData, unSelecData } = require('../../utils');

const findAllDiscountCodeUnSelect = async ({
   limit = 50,
   page = 1,
   sort = 'ctime',
   filter,
   unSelect,
   model,
}) => {
   const skip = (page - 1) * limit;
   const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
   const results = await model
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(unSelecData(unSelect))
      .lean();

   return results;
};

const findAllDiscountCodeSelect = async ({
   limit = 50,
   page = 1,
   sort = 'ctime',
   filter,
   select,
   model,
}) => {
   const skip = (page - 1) * limit;
   const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
   const results = await model
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(getSelecData(select))
      .lean();

   return results;
};

const checkDiscountExists = async ({model, filter}) => {
   return await model.findOne(filter).lean();
}

module.exports = {
   findAllDiscountCodeUnSelect,
   findAllDiscountCodeSelect,
   checkDiscountExists,
};
