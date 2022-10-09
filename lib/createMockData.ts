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

    currentRecord[currentField] = createDataForField(currentField); 

    fieldIndex++;
  }

  return mockRecords;
}

function createDataForField(currentField: string): string {
  switch(true) {
    case currentField.toLowerCase() === 'username':
      return faker.internet.userName();
    case currentField.toLowerCase().includes('name'): 
      return hasFirstOrLastName(currentField) === 'first' ? 
        faker.name.firstName() : faker.name.lastName();
    case currentField.toLowerCase() === 'email':
      return faker.internet.email();
    case currentField.toLowerCase().includes('address'):
      return faker.address.streetAddress(true);
    case currentField.toLowerCase().includes('city'):
      return faker.address.city();
    case currentField.toLowerCase().includes('state'):
      return faker.address.stateAbbr();
    default:
      return faker.lorem.word();
  }
}

function hasFirstOrLastName(nameField: string): string {
  const matches = [...nameField.toLowerCase().matchAll(/(first|last)(name)/g)];

  return matches[1];
}
