// @flow
import API from '../base/api';

import type { ReqType } from '../index';

class AuthApi extends API {
  url: string = '/users';

  async login(data: Object): Promise {
    console.log('api data:', data);
    console.log(this.url);
    return this.r({
      method: 'POST',
      url: `${this.url}`,
      data,
    });
  }

}

export default function listCrud(r: ReqType) {
  return new AuthApi(r);
}
