export class DbItem<T> {
  constructor(public title?: string, public action?: Action, public item?: T) {}
}

export enum Action {
  EDIT,
  DELETE,
  NONE
}
