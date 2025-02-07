import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import { HttpStatusCodes } from "./http-status-codes";

const cache = new NodeCache();

export const retrieveCacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if (req.method !== 'POST') {
            const key = req.method + req.originalUrl + JSON.stringify(req.query);
            const cachedData = cache.get(key);

            if (cachedData) {
                res.status(HttpStatusCodes.OK).json(cachedData);
                res.end();
                console.log(`Cache retrieved for ${key} !`);
                return;
            }else{
                console.log(`Cache not found for ${key} !`);
                next();
            }
        }
    } catch (error) {
        console.error(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error retrieving cache',
        });
    }
    next();
};

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const key = req.method + req.originalUrl + JSON.stringify(req.query);
        const maybeCache = cache.get(key);

        if (maybeCache) {
            console.log(`Cache hit for ${key}!`);
            res.json(maybeCache);
        }

        const originalJson = res.json;

        res.json = (body: any): Response<any> => {
            console.log(`Cache set for ${key}!`);
            cache.set(key, body, 60 * 60);
            return originalJson.call(res, body);
        };
    } catch (error) {
        console.error(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error caching data',
        });
    }
};