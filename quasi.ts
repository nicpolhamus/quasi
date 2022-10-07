const DEFAULT_RECORD_AMOUNT = 5;
// takes in a count for the amount of records to create
// takes in optional array of models to create mock data for
export async function quasi(recordAmount: number = DEFAULT_RECORD_AMOUNT, specificModels?: string[]): string {
  // setup sequelize instance with specific beforeBulkCreate hooks
  const sequelize = new Sequelize({});
  // pull all models for project
  const projectModels = sequelize.models.filter(model => specificModels ? specificModels.contains(model) : true);
  // iterate through models, grabbing statuses from the results
  const results = await Promise.allSettled(
    Array(recordAmount).map(async () => {
      projectModels.map(createMockData);
    }),
  );

  console.log('hello');

  return results;
}

function createMockData(model: any): string {
}
