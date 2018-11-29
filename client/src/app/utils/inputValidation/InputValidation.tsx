export class InputValidation {
  isURLValid(url: string): boolean {
    url = url.toLowerCase();
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regex.exec(url) !== null;
  }

  isHostnameValid(url: string): boolean {
    url = url.toLowerCase();
    const regex = /https?:\/\/[-a-zA-Z0-9@:%._\-\+~#=]{2,256}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regex.exec(url) !== null;
  }

  isValidResource(url: string): boolean {
    return this.isHostnameValid(url) || this.isURLValid(url) || this.isLocal(url);
  }

  isInternetResource(url: string): boolean {
    return this.isHostnameValid(url) || this.isURLValid(url);
  }

  isMGRSValid(mgrs: string): boolean {
    const regex = /^\d{1,2}[A-z]{3}\d{8}(?:\d{2})?$/;
    return regex.exec(mgrs) !== null;
  }

  isLocal(path: string): boolean {
    const regexStr = ['^(?:file:[\\/\\\\]{2}|[A-z]:[\\/\\\\]|[\\/\\\\]{2}[-A-z0-9@:%.\_\\-\\+~#=]{2,256})',
      '(?:[A-z0-9@:%._\\-\\+\\s~#=\\/\\\\]*)',
      '(?:[^\\/\\\\]*.*\\.[A-z0-9]{2,4})?$'].join('');
    const regex = new RegExp(regexStr);
    return regex.exec(path) !== null;
  }
}