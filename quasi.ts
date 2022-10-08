import { faker } from '@faker-js/faker';
import { existsSync } from 'fs';
import { Sequelize } from 'sequelize-typescript';

import config from './config/config.json';

const DEFAULT_RECORD_AMOUNT = 5;

// takes in a count for the amount of records to create
// takes in optional array of models to create mock data for
export async function quasi(recordAmount: number = DEFAULT_RECORD_AMOUNT, specificModels?: string[]): string {
  // setup sequelize instance with specific beforeBulkCreate hooks
  const sequelize = loadSequelize();
  // pull all models for project
  const projectModels = sequelize.models.filter(model => specificModels ? specificModels.contains(model) : true);
  // iterate through models, grabbing statuses from the results
  const results = await Promise.allSettled(
    projectModels.map(async model => {
      model.bulkCreate(createMockData(model, recordAmount));
    }),
  );

  console.log('hello');

  return results;
}

function loadSequelize(): Sequelize {
  const configPath = './config/config.json';

  if (!existsSync(configPath)) {
    throw new Error('No sequelize config for project. Please create one to use quasi!');
  }


  return new Sequelize(config);
}
