export const api = {
  // baseUrl: 'https://localhost:5001/api', // linux
  // baseUrl: 'https://192.168.1.7:5001/api', // linux
  baseUrl: 'https://localhost:44318/api',
  users: {
    base: '/Users',
    register() {
      return this.base + '/register';
    },
    login() {
      return this.base + '/login';
    }
  },
  genres: {
    base: '/Genres'
  },
  artists: {
    base: '/Artists'
  },
  fullUrl(endPoint: string, id?: number): string {
    let result;
    id
      ? (result = this.baseUrl + endPoint + id.toString())
      : (result = this.baseUrl + endPoint);
    return result;
  }
};
