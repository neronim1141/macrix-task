import { ValidationErrors } from '@angular/forms';

export const humanizeErrors = (errors?: ValidationErrors | null) => {
  if (errors)
    for (const [key] of Object.entries(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        default:
          return key;
      }
    }
  return 'unknown';
};
