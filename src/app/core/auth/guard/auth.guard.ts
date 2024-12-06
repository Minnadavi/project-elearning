import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  let router = inject(Router);
  //for get user id in the local storage
  let data = localStorage.getItem('uid') ?? "";
  // convert the data to actual form
  let uid = JSON.parse(data!);
  // check if the user is logged in
  if (uid !== null && uid !== '') {
    return true;
  } else {
    //if user not found then redirect to login page
    router.navigate(['/login']);
    return false;
  }
};
