const globalAny: {} = global;

((globalAny as any).requestAnimationFrame = (cb: () => void) => {
  setTimeout(cb, 0);
});

import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as fetch from 'isomorphic-fetch';

enzyme.configure({adapter: new Adapter()});

(globalAny as any).fetch = (url: any, args: any) => {
  let headers = {'Authorization': 'Basic dHl0dXM6cGFzc3dvcmQ='};

  if (args.headers) {
    const additionalHeaders = args.headers.reduce((accum: any, item: any) => {
      accum[item[0]] = item[1];
      return accum;
    },                                            {});
    (<any> Object).assign(headers, additionalHeaders);
    delete args.headers;
  }

  return fetch(url, {
    headers: headers,
    ...args
  });
};
