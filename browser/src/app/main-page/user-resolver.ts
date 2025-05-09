import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Motorista } from "./motorista";
import { inject, Injectable } from "@angular/core";
import { UserService } from "../user.service";

export const userResolver: ResolveFn<Motorista> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(UserService).getCurrentUser();
    };