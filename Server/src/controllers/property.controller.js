import Model from '../models/index.js';
import httpStatus from 'http-status';
import packagesController from './packages.controller.js';

async function createOneProperty(req, res, next) {
    try {
        const { property: Property } = await Model;

        // at the moment we just allow these values for create property
        // refer into 'Server/src/middlewares/property.middleware.js' at createProperty function
        const payload = req.body;
        const newProperty = await Property.create(payload);
        return res.status(httpStatus.CREATED).json({ message: 'CREATED', data: newProperty })
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        next(err)
    }
}

// check data on first load, if it's' not exist then get from source
async function getPropertyCount() {
    const { property: Property } = await Model;
    return await Property.count();
}

async function createDataFromSource(dataSource) {
    try {
        // model init
        const { property: Property } = await Model;
        
        for (const row of dataSource) {
            const { property :propertyRow, packages: packagesRow } = row;

            // delete few key/property, since i just pass the storing data
            // just passed the db structure, since mostly i create as a String/char
            propertyRow.starRating = 4;
            delete propertyRow.heroImage;
            delete propertyRow.contacts;

            // the idea to store JSON data into location and trustYou
            // since the focus is not really in DB structure but get from source
            // but i already make the update api works with JSON value in DB
            propertyRow.location = JSON.stringify(propertyRow.location);
            propertyRow.trustYou = JSON.stringify(propertyRow.trustYou);

            // add property
            await Property.create(propertyRow);
            await packagesController.createPackageFromSource(packagesRow[0]);
        }

        // send latest data on DB;
        return await getPropertyCount();
    } catch (e) {
        console.error(e);
        const err = { error: e.message };
        console.error(err);
    }
    
}

async function getAllProperty(req, res, next) {
    try {
        // model init
        const { property: Property } = await Model;
        const { packages: Packages } = await Model;

        // if request was based on ID
        const { id } = req.params;

        // response based
        const response = [];
        let data = [];

        // query based/first args
        const queryBased = {
            order: [
                ['createdAt', 'ASC'],
            ],
        };

        // check if contain pagination request
        if (req.query?.offset && req.query?.limit) {

            // adding new key value for pagination purposes
            queryBased.offset = req.query.offset;
            queryBased.limit = req.query.limit;
            data = await Property.findAll(queryBased); // property list
        }
        // find with id
        else if (id) {
            queryBased.where = { id };
            data = await Property.findAll(queryBased); // property list
        }
        else {
            data = await Property.findAll(queryBased); // property list
        }

        // map the data propertyb with packages
        for (const propertyRow of data) {

            // parse json data
            if (propertyRow?.location) {
                propertyRow.location = JSON.parse(propertyRow.location);
              }
            if (propertyRow?.trustYou) {
                propertyRow.trustYou = JSON.parse(propertyRow.trustYou);
            }

            // where join cases
            const propertyCode = propertyRow.propertyCode;

            // packages find with property.propertyCode
            const packagesRow = await Packages.findOne({ where: { propertyCode } });

            // push data and make a obj
            response.push({
                property: propertyRow,
                packages: packagesRow
            });
        };

        return res.status(httpStatus.OK).json({
            ...(!id && { // just show if was get all request (not by id)
                total: await Property.count(),
                count: response.length,
            }),
            data: response,
        });
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        next(err)
    }
}

async function updateProperty(req, res, next) {
    try {
        // model init
        const { property: Property } = await Model;
        const { id } = req.params;

        // at the moment we just allow these values for updating property
        // refer into 'Server/src/middlewares/property.middleware.js' at updateProperty function
        const { location, trustYou, name } = req.body;

        // update data
        await Property.update({
            location,
            trustYou,
            name,
        },
        { where: { id } });

        return res.status(httpStatus.OK).json({ message: 'Successfully update' });
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        next(err)
    }
}

async function deleteProperty(req, res, next) {
    try {
        const { id } = req.params;
        const { property: Property } = await Model;

        // check id first
        if (!await Property.findOne({ where: { id } })) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'data not found' });
        }

        // delete
        await Property.destroy({
            where: { id },
        });
        return res.status(httpStatus.OK).json({ message: 'successfully deleted'});
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        next(err)
    }
    return res.status(httpStatus.OK).json({ message: 'Successfully deleted'});
}

export default {
    createOneProperty,
    getAllProperty,
    updateProperty,
    deleteProperty,
    getPropertyCount,
    createDataFromSource,
}