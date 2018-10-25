export class InputValidation {

  isURLValid(url: string): boolean {
    url = url.toLowerCase();
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regex.exec(url) !== null;
  }
}