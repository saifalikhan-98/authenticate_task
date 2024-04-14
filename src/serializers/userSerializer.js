import { FieldValidator } from "../utils/validatorSerializer.js";
import { User } from "../models/User.js";

const validateRegistrationUserInput = (req, res, next) => {

    const userValidator = new FieldValidator(User);

    // Use the validator to validate user data
    const userData =req.body

    const validationResult = userValidator.validate(userData);
    if (validationResult) {
        console.error('Validation failed:');
        console.error(validationResult);
        return res.status(400).json({ error: validationResult })
    }
    next();
  };



export {validateRegistrationUserInput};