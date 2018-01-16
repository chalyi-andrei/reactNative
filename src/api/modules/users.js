// @flow
import CRUD from '../base/crud';

import type { ReqType } from '../index';

export type SomeType = {
  id: number,
};


export default function usersCrud(request: ReqType) {
  const crud: CRUD<SomeType> = new CRUD({
    url: '/users',
    request,
    id: 'id',
  });

  return crud;
}
