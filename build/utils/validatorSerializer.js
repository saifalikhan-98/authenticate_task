"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldValidator = void 0;
class FieldValidator {
  constructor(model) {
    this.model = model;
    this.validationSchema = this.generateValidationSchema();
  }
  generateValidationSchema() {
    const attributes = this.model.rawAttributes;
    const schema = {};
    for (const [key, value] of Object.entries(attributes)) {
      schema[key] = {
        required: !value.allowNull,
        nullable: value.allowNull,
        type: value.type.key // Assuming type is key
        // Add more validations as needed based on value.type
      };
    }
    return schema;
  }
  validate(data) {
    const fields = Object.keys(this.model.rawAttributes);
    const excludedFields = ['id', 'createdAt', 'updatedAt'];
    const includedFields = fields.filter(field => !excludedFields.includes(field));
    const missingFields = includedFields.filter(field => !(field in data));
    if (missingFields.length > 0) {
      return `The following fields are required: ${missingFields.join(', ')}`;
    }

    // Perform other validations as needed

    return null; // Return null if validation passes
  }
}
exports.FieldValidator = FieldValidator;