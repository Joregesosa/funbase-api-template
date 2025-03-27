import { migrations } from "./migrations.js";

export const runMigrations = async () => {
  for (let migration of migrations) {
    try {
      const module = await import(`../../modules/${migration}/Model.js`);
      const model = module[migration];
      await model.sync({ force: true });
      console.log(`The table for the ${migration} model was just created!`);
    } catch (error) {
      console.error("Unable to synchronize the models:", error);
    }
  }
};

runMigrations(); 