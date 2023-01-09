'use strict'

import { Router } from 'express';
import handler from './handlers/externalAPIHandler.js';
import propertyController from '../controllers/property.controller.js';

const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      // 6. Call handler to response with data
      const response = await handler.getListFromAPI();
      const { results: data } = response?.outlets?.availability || [];

      // check and store data from source
      const properties = await propertyController.getPropertyCount();
      console.log({ properties });

      // check properties if 0/null, send the from source payload into createDataFromSource fn
      if (!properties) {
        const init = await propertyController.createDataFromSource(data);
        console.log({ init });
      }
      
      res.json({
        status: 'OK',
        total: data.length,
        data,
      });

    } catch (err) {
      next(err);
    }
  }
);

export default router;