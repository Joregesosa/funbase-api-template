 import {modulesDir} from "./dirHelper.js";
 console.log(modulesDir);
/**
 * @description This file contains the helper functions for the routes.
 * @param {Array} routes
 * @param {Object} router
 */
export function useRoute(routes, router) {
  routes.forEach(async (route) => {
    let importName = route.toLowerCase()+"Router"
    const module = await import(`${modulesDir}/${route}/Router.js`);
    router.use(`/${route}`,  module[importName]);
  });
}
