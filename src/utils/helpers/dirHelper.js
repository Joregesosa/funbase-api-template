import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolveDir = (relativePath) => path.resolve(__dirname, relativePath);

export const rootDir = resolveDir("../../../");
export const srcDir = resolveDir("../../");
export const modulesDir = resolveDir("../../modules");
export const routesDir = resolveDir("../../routes");
export const seedsDir = resolveDir("../../database/seeds");
export const utilsDir = resolveDir("../../utils");
export const scriptsDir = resolveDir("../../../scripts");
export const configDir = resolveDir("../../config");
export const helpersDir = resolveDir("../../utils/helpers");
export const middlewaresDir = resolveDir("../../middlewares");

export const getDir = resolveDir;

export default {
  rootDir,
  srcDir,
  routesDir,
  modulesDir,
  seedsDir,
  utilsDir,
  scriptsDir,
  configDir,
  helpersDir,
  middlewaresDir,
  getDir,
};
