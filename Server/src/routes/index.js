'use strict'

import { Router } from 'express';

const router = Router({
  caseSensitive: true
})

// 4. Import routes
import externalAPI from './externalAPI.js';

// property
import propertyRoutes from './property.route.js';

// packages
import packageRoutes from './packages.route.js';


// 5. Use imported routes in router
router.use('/api', externalAPI)

// property routes
router.use('/api', propertyRoutes)

// packages routes
router.use('/api', packageRoutes)


export default router;