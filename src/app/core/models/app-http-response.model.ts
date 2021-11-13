import {HttpResponse} from "@angular/common/http";

export class AppHttpResponse<T> {
  statusCode: number;
  headers: string | { [name: string]: string | string[] };
  body: T[];

  constructor() {
    this.statusCode = 0;
    this.headers = '';
    this.body = [];
  }
}

