import Model from '../models/index.js';
import httpStatus from 'http-status';

async function getAll(req, res, next) {
    try {
        const { packages: Packages } = await Model;
        const data = await Packages.findAll();
        return res.status(httpStatus.OK).json({ total: data.length, data })
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: e.message});
        next(err)
    }
}

async function createPackageFromSource(packagesFromSource) {
    try {
        const { packages: Packages } = await Model;
        
        // just speed up the process, i just hide the rest of packages data
        // default data was null, but the key/property still there
        delete packagesFromSource.beds;
        delete packagesFromSource.displayRate;
        delete packagesFromSource.adjustedDisplayRate;

        await Packages.create(packagesFromSource);
    } catch (e) {
        const err = { error: e.message }
        console.error(err);
    }
}

async function create(req, res, next) {
    try {
        const { packages: Packages } = await Model;
        const newPackages = await Packages.create(req.body);
        return res.status(httpStatus.CREATED).json({
            message: 'CREATED',
            data: newPackages,
        })
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: e.message});
        next(err)
    }
}

async function deletePackages(req, res, next) {
    try {
        const { id } = req.params;
        const { packages: Packages } = await Model;

        // check id first
        if (!await Packages.findOne({ where: { id } })) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'data not found' });
        }

        // delete
        await Packages.destroy({
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
    getAll,
    create,
    createPackageFromSource,
    deletePackages,
}