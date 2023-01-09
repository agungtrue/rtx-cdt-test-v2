'use strict'

import { Router } from 'express';
import propertyController from '../controllers/property.controller.js';
import propertyMiddleWare from '../middlewares/property.middleware.js';

const router = Router();

router
    .route('/property')
    .get(propertyController.getAllProperty)
    .post(propertyMiddleWare.createProperty, propertyController.createOneProperty)

router.route('/property/:id')
    .get(propertyController.getAllProperty)
    .put(propertyMiddleWare.updateProperty, propertyController.updateProperty)
    .delete(propertyController.deleteProperty)

export default router;
