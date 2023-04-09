import { ValidationErrors } from '@angular/forms';

export const humanizeErrors = (errors: ValidationErrors) => {
  return Object.keys(errors).map((errorKey: string) => {
    return (
      {
        matDatepickerParse: 'This date is Invalid',
        matDatepickerMax: 'This date is later than allowed',
        required: 'This field is required',
        min: 'This value is too low',
        pattern: 'Invalid pattern',
      }[errorKey] ?? errorKey
    );
  });
};
