import {
  PluginOptions,
  AuthAccessCallback,
  AuthCallback,
  PackageAccess,
  IPluginAuth,
  RemoteUser,
  Logger,
} from '@verdaccio/types';
import {getInternalError, getUnauthorized} from '@verdaccio/commons-api';
import axios, { AxiosResponse } from 'axios';
import {
    NextFunction,
    Request,
    Response
  } from "express";

export type RequestExtend = Request & {remote_user?: RemoteUser}
import createError, {HttpError} from 'http-errors';

import {CustomConfig} from '../types/index';

/**
 * Custom Verdaccio Authenticate Plugin.
 */
export default class AuthCustomPlugin {
  public logger: Logger;
  private foo: string;
  private createAnonymousRemoteUser?: Function;
  private createRemoteUser?: Function;

  public constructor(config: CustomConfig, options: PluginOptions<CustomConfig>) {
    this.logger = options.logger;
    this.foo = config.foo;
    return this;
  }
  /**
   * Authenticate an user.
   * @param user user to log
   * @param password provided password
   * @param cb callback function
   */
  public authenticate(user: string, password: string, cb: AuthCallback): void {
    /**
     * This code is just an example for demostration purpose
     * */
    console.log(user)
    console.log(password)
    console.log(this.foo)
    // this.finbloxui_auth(user, password)
      if (this.foo === "bar" && password === "9999") {
        cb(null, ['group-foo', 'group-bar', 'admin']);
      } else {
        cb(getInternalError("error, try again"), false);
      }
    
  }

  /**
   * Triggered on each access request
   * @param user
   * @param pkg
   * @param cb
   */
  public allow_access(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    this.logger.info({name: user.name, real_groups: user.real_groups.join(",")}, '@{name} is part of real_groups: @{real_groups}');
    /**
     * This code is just an example for demostration purpose
     */
    // if (user.name === this.foo && pkg?.access?.includes[user.name]) {
    if (user.real_groups.includes["access"]) {
      this.logger.debug({name: user.name}, 'your package has been granted for @{name}');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to access this package');
       cb(getInternalError("error, try again"), false);
    }
  }

  /**
   * Triggered on each publish request
   * @param user
   * @param pkg
   * @param cb
   */
  public allow_publish(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    this.logger.info({name: user.name, real_groups: user.real_groups.join(",")}, '@{name} is part of real_groups: @{real_groups}');
    /**
     * This code is just an example for demostration purpose
     */
    // if (user.name === this.foo && pkg?.access?.includes[user.name]) {
    if (user.real_groups.includes("publish")) {
      this.logger.debug({name: user.name}, '@{name} has been granted to publish');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to publish this package');
       cb(getUnauthorized(`${user.name} is not allowed to publish this package`), false);
    }
  }

  public allow_unpublish(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, '@{name} has been granted to unpublish');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to publish this package');
      cb(getInternalError("error, try again"), false);
    }
     */
  }

  public apiJWTmiddleware(helpers: any) {
    this.createAnonymousRemoteUser = helpers.createAnonymousRemoteUser;
    this.createRemoteUser = helpers.createRemoteUser;
    return this.doExternalAuth.bind(this);
  }

  async doExternalAuth(req: RequestExtend, res: Response, _next: NextFunction) {
    if (!(this.createRemoteUser && this.createAnonymousRemoteUser)) {
      throw new Error('createRemoteUser or createAnonymousRemoteUser methods undefined');
    }
    req.pause();
    const next = function(err?: HttpError) {
        req.resume();
        if (err) {
            return _next(err);
        }
        return _next();
    };
    const { authorization } = req.headers;

    if (req.path.includes('login') || req.path.includes('user')) {
        this.logger.info('User Auth/Management not supported');
        const err = createError(403, 'User Auth/Management not supported');
        return next(err);
    }
    if (!authorization || authorization.toUpperCase().startsWith('BASIC')) {
        const err = createError(401, 'Invalid Authorization');
        return next(err);
    }
    try {
        const finbloxuiAuthResponse: any = await this.finbloxui_auth("", authorization);
        if (finbloxuiAuthResponse.status >= 500) {
            this.logger.error('Internal Server Error');
            const err = createError(500, 'Internal Server Error');
            return next(err);
        }
        this.logger.info({ status: finbloxuiAuthResponse.status }, "3 finbloxuiAuthResponse.status: @{status}");
        const body = finbloxuiAuthResponse;
        if (finbloxuiAuthResponse.status !== 200) {
            const err = createError(finbloxuiAuthResponse.status, body.message);
            return next(err);
        }
        const user = body.data;
        this.logger.info(`User Auth Success ${user.name}`);
        req.remote_user = this.createRemoteUser(user.name, user.groups);
        return next();
    } catch (e) {
        const err = createError(403, 'Not Authorized');
        return next(err);
    }
  }

  private async finbloxui_auth(user: string, password: string) {
    try {
        this.logger.info("Calling Finbloxui Authentication");
        const response = await axios.post('http://finbloxui-api:3000/authenticate', {
            password: password
        });
        return response;
      } catch (error) {
        console.error(error);
      }
  }
}
