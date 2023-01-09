'use strict'

import { Router } from 'express';
import packagesController from '../controllers/packages.controller.js';

const router = Router();

router
    .route('/packages')
    .get(packagesController.getAll)
    .post(packagesController.create)

router.route('/packages/:id')
    .delete(packagesController.deletePackages)

export default router;
