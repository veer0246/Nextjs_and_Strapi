'use strict';

/**
 * userd service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::userd.userd');
