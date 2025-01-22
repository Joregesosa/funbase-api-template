import { migrations } from "./migrations.js";

export const runMigrations = async () => {
  for (let migration of migrations) {
    const { model } = await import(`src/modules/${migration}/Model.js`);

    try {
      await model.sync({ force: true });
      console.log(`The table for the ${migration} model was just created!`);
    } catch (error) {
      console.error("Unable to synchronize the models:", error);
    }
  }
};

runMigrations();
