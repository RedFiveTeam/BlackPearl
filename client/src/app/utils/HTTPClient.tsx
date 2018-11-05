import * as urljoin from 'url-join';

export class ErrorResponse {
  constructor(public message: string) {
  }
}

export class UnauthorizedErrorResponse extends ErrorResponse {

}

export class HTTPClient {
  constructor(private baseURL: string = '/') {
  }

  async getJSON(path: string) {
    const resp = await fetch(urljoin(this.baseURL, path));
    return await resp.json();
  }

  async postJSON(path: string, body: string) {
    const resp = await fetch(
      urljoin(this.baseURL, path),
      {
        method: 'POST',
        headers: [['Content-Type', 'application/json']],
        body: body,
      }
    );
    const json = await resp.json();
    this.handleErrors(resp.status, json);
    return json;
  }

  async putJSON(path: string, body: string) {
    const resp = await fetch(
      urljoin(this.baseURL, path),
      {
        method: 'PUT',
        body: body,
        headers: [['Content-Type', 'application/json']],
      }
    );
    const json = await resp.json();
    this.handleErrors(resp.status, json);
    return json;
  }

  async put(path: string) {
    const resp = await fetch(urljoin(this.baseURL, path), {method: 'PUT'});
    const json = await resp.json();
    this.handleErrors(resp.status, json);
    return json;
  }

  async deleteJSON(path: string) {
    const resp = await fetch(urljoin(this.baseURL, path), {method: 'DELETE'});
    return await resp.json();
  }

  async delete(path: string, body?: string) {
    const resp = await fetch(
      urljoin(this.baseURL, path),
      {
        method: 'DELETE',
        body: body ? body : null,
        headers: [['Content-Type', 'application/json']],
      }
    );

    if (resp.status < 200 || resp.status >= 300) {
      throw new Error('Failed to setPendingDelete item');
    }
  }

  async postFile(path: string, file: File, timezone: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timezone', timezone);
    return await fetch(
      urljoin(this.baseURL, path),
      {
        method: 'POST',
        body: formData
      }
    );
  }

  private handleErrors(status: number, json: any) {
    if (status < 200 || status >= 300) {
      throw json.errors.reduce(
        (accum: any, e: any) => {
          accum[e.field] = e.defaultMessage || 'There was an error.';
          return accum;
        },
        {}
      );
    }
  }
}
