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

   endpointNames = EndpointNames;

   constructor() {
      this.setEndpointNamesEnumValues(apiCatalog.apis, EndpointNames);
   }

   generateURL(endpointName: string, pathParam?: string | number, queryParams?: QueryParamConfig[]): string {
      let endPoint = apiCatalog.apis.find(api => api.name === endpointName).endpoint;

      if (endPoint.includes(':{pathParam}') && pathParam) {
         endPoint = endPoint.replace(':{pathParam}', `${pathParam}`);
      }

      if (endPoint.includes('?{queryParams}') && queryParams) {
         endPoint = endPoint.replace('?{queryParams}', this.setQueryParametersString(queryParams)
         );
      }

      return `${this.server}${this.port}${this.baseUrl}${endPoint}`;
   }

   setQueryParametersString(queryParams: QueryParamConfig[]): string {
      let queryParametersString = '';

      queryParams.forEach((queryParam, i) => {
         const AND = queryParams.length === 1 || i === queryParams.length - 1 ? '' : '&';

         queryParametersString += `${queryParam.name}=${queryParam.value}${AND}`;
      });

      return `?${queryParametersString}`;
   }

   setEndpointNamesEnumValues(apis: any[], endpointNamesEnum) {
      const ENUMS = Object.keys(endpointNamesEnum);

      for (let i = 0; i < ENUMS.length; i++) {
         EndpointNames[ENUMS[i]] = apis[i].name;
      }
   }
}

export interface QueryParamConfig {
   name: string;
   value: string;
}

// must be the same ordering as in apis array in api-catalog.json
export enum EndpointNames {
   REGISTER = '',
   LOGIN = '',
   GET_GENRES = '',
   SAVE_GENRE = '',
   UPDATE_GENRE = '',
   DELETE_GENRE = '',
   LIST_DELETE_GENRES = '',
   GET_ARTISTS = '',
   SAVE_ARTIST = '',
   UPDATE_ARTIST = '',
   DELETE_ARTIST = '',
   LIST_DELETE_ARTISTS = '',
   GET_SONGS = '',
   SAVE_SONG = '',
   UPDATE_SONG = '',
   DELETE_SONG = '',
   LIST_DELETE_SONGS = '',
   SOME_SHIT = ''
}
