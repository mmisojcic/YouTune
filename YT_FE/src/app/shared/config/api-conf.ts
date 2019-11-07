export const apiConf = {
  envs: {
    dev: {
      active: true,
      server: 'https://localhost',
      ports: {
        win: {
          active: true,
          number: ':44318'
        },
        linux: {
          active: false,
          number: ':5001'
        }
      },
      baseUrl: '/api'
    },
    prod: {
      active: false,
      server: 'https://www.facebook.com',
      ports: {},
      baseUrl: ''
    }
  },
  apis: {
    users: {
      register: {
        endpoint: '/Users/register'
      },
      login: {
        endpoint: '/Users/login'
      }
    },

    genres: {
      getGenres: {
        endpoint: '/Genres'
      },
      saveGenre: {
        endpoint: '/Genres'
      },
      updateGenre: {
        endpoint: '/Genres/:id'
      },
      deleteGenre: {
        endpoint: '/Genres/:id'
      },
      listDeleteGenres: {
        endpoint: '/Genres/deleteList'
      }
    },
    artists: {
      getArtists: {
        endpoint: '/Artists'
      },
      saveArtist: {
        endpoint: '/Artists'
      },
      updateArtist: {
        endpoint: '/Artists/:id'
      },
      deleteArtist: {
        endpoint: '/Artists/:id'
      },
      listDeleteArtists: {
        endpoint: '/Artists/deleteList'
      }
    },
    songs: {
      getSongs: {
        endpoint: '/Songs'
      },
      saveSong: {
        endpoint: '/Songs'
      },
      updateSong: {
        endpoint: '/Songs/:id'
      },
      deleteSong: {
        endpoint: '/Songs/:id'
      },
      listDeleteSongs: {
        endpoint: '/Songs/deleteList'
      }
    }
  }
};
