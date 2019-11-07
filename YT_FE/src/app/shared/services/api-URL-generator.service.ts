import { Injectable } from '@angular/core';
import * as apiCatalog from '../config/api-catalog.json';

@Injectable({
  providedIn: 'root'
})
export class ApiURLGeneratorService {
  env = apiCatalog.envs.find(env => env.active);
  server = this.env.server;
  port = this.env.ports.length === 0 ? '' : this.env.ports.find(port => port.active).number;
  baseUrl = this.env.baseUrl;

  constructor() {}

  generateURL(endpointName?: string, pathParam?: any): string {
    let endPoint = apiCatalog.apis.find(api => api.name === endpointName).endpoint;

    if (endPoint.includes(':id') && pathParam) {
      endPoint = endPoint.replace(':id', pathParam);
    }

    return `${this.server}${this.port}${this.baseUrl}${endPoint}`;
  }
}
