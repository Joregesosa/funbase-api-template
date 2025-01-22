 import {routesDir} from "./dirHelper.js";
 console.log(routesDir);
/**
 * @description This file contains the helper functions for the routes.
 * @param {Array} routes
 * @param {Object} router
 */
export function useRoute(routes, router) {
  routes.forEach(async (route) => {
    const fileName = route.charAt(0).toUpperCase() + route.slice(1) + "Router";
    const module = await import(`${routesDir}/${fileName}.js`);
    router.use(`/${route}`, module.default || module);
  });
}
