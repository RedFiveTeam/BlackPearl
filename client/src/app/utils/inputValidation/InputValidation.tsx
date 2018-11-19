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

  isResourceValid(url: string): boolean {
    return this.isHostnameValid(url) || this.isURLValid(url);
  }

  isMGRSValid(mgrs: string) {
    const regex = /^\d{1,2}[A-z]{3}\d{8}(?:\d{2})?$/;
    return regex.exec(mgrs) !== null;
  }
}