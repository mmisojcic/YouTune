export const api = {
  baseUrl: 'https://localhost:5001/api',
  users: {
    base: '/Users',
    register() {
      return this.base + '/register';
    },
    login() {
      return this.base + '/login';
    }
  },
  fullUrl(endPoint: string, id?: number): string {
    let result;
    id
      ? (result = this.baseUrl + endPoint + id.toString())
      : (result = this.baseUrl + endPoint);
    return result;
  }
};
