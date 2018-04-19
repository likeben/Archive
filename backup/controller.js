const validator = require('validator');
const _ = require('lodash');
const logger = require('../../helper/logHelper').getDefaultLogger('weChat.pm.cartItemController');
const { getError } = require('../../helper/utilHelper');
const cartItemService = require('../../service/pm.cartItemService');


const getServiceName = operationName => {
  const nameMap = {
    add: 'create',
    getList: 'readMany',
    modify: 'update',
    remove: 'deleteOne',
    getDetail: 'readOne'
  };
  return nameMap[operationName];
};

const controller = (model, service) => (operationName, validateFunc) => async(ctx) => {
  const n = `${operationName}${model}`;
  try {
    const { id } = ctx.params;
    if (id && !validator.isMongoId(id)) {
      ctx.status = 400;
      return ctx.body = getError(1005, n);
    }

    const args = {
      data: ctx.request.body,
      condition: ctx.query,
      user: ctx.session.user
    };

    const validationError = _.isFunction(validateFunc) ? validateFunc(args) : null;
    if (validationError) {
      ctx.status = 400;
      return ctx.body = validationError;
    }

    const serviceName = getServiceName(operationName);
    const asyncFunc = service[serviceName];
    const { error, result } = await asyncFunc(args);
    if (error) {
      ctx.status = 400;
      return ctx.body = error;
    }
    ctx.status = 200;
    return ctx.body = result || getError(1002);
  } catch (e) {
    logger.error(`${n} error: `, e);
    ctx.status = 500;
    return ctx.body = getError(1001);
  }
};

const cartItemController = controller('CartItem', cartItemService);

const add = cartItemController('add', ({ data }) => {
  const { product, isCheckout } = data;

  let errorCode = null;
  let phReplacement = null;
  switch (true) {
    case !product || !validator.isMongoId(product):
      errorCode = 5003;
      phReplacement = 'product';
      break;
    case isCheckout && !_.isBoolean(isCheckout):
      errorCode = 5003;
      phReplacement = 'isCheckout';
      break;
    default:
  }

  return errorCode ? getError(errorCode, phReplacement) : null;
});