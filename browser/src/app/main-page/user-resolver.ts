import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Motorista } from "./motorista";
import { inject, Injectable } from "@angular/core";
import { UserService } from "../user.service";
import { Gestor } from "./gestor";
import { Cliente } from "./cliente";

export const userResolver: ResolveFn<Motorista | Gestor | Cliente> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(UserService).getCurrentUser();
    };