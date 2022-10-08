import { faker } from '@faker-js/faker';
import { Model } from 'sequelize-typescript';

export function createMockData(model: Model, recordAmount: number): Record<string, unknown>[] {
  const fields = model.attributes;
  const mockRecords: Record<string, unknown>[] = new Array(recordAmount);
  let currentRecordAmount = 0;
  let fieldIndex = 0;

  while(currentRecordAmount < recordAmount) {
    if (fieldIndex > fields.length) {
      currentRecordAmount++;
      fieldIndex = 0;
    }

    const currentRecord = mockRecords[currentRecordAmount];
    const currentField = fields[fieldIndex];

    if (currentField.toLowerCase().includes('name')) {
      currentRecord[currentField] = faker.name.firstName();
    }

    currentRecord[currentField] = faker.lorem.word();

    fieldIndex++;
  }

  return mockRecords;
}
