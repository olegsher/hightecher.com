import {AbstractControl, ValidationErrors} from '@angular/forms';

export class ConfirmPasswordValidator {
  // static MatchPassword(AC: AbstractControl) {
  //   let password = AC.get('password').value; // to get value in input tag
  //   let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
  //   if(password != confirmPassword) {
  //     console.log('false');
  //     AC.get('confirmPassword').setErrors( {MatchPassword: true} )
  //   } else {
  //     console.log('true');
  //     return null;
  //   }
  // }
  static match(control: AbstractControl): Promise<ValidationErrors|null> {
    // const id = control.value as number;
    const password = control.get('password');
    const passwordConfirmation = control.get('password_confirmation');
    return new Promise(resolve => {
      console.log(control);
      console.log(password);

      console.log(passwordConfirmation);
      if (password.value !== passwordConfirmation.value) {

        resolve({matchPassword: true});
        // control.get('password_confirmation').setErrors({matchPassword: true});
      }
      else {
        resolve(null);
      }
    });
  }
}
