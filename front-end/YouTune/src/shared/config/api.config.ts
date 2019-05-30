export const api = {
  baseUrl: 'https://localhost:44318/api',
  users: {
    base: '/Users',
    register: '/register',
    login: '/login'
  },
  fullUrl(endPoint: string, id?: number): string {
    let result;
    id
      ? (result = this.baseUrl + endPoint + id.toString())
      : (result = this.baseUrl + endPoint);
    return result;
  }
};
