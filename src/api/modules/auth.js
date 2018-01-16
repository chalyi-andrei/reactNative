// @flow
import API from '../base/api';

import type { ReqType } from '../index';

class AuthApi extends API {
  url: string = '/register';

  async login(data: Object): Promise {
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
