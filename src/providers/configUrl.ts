const env = 'dev'
const dev ={

  api:{
    //url: 'http://192.168.0.7:3000/api/',
    url: 'http://192.168.0.7:3000/api/',
    tatto: {
      POST:{
        auth: 'v1/auth/login',
        register: 'v1/auth/register'
      }

    }
  }
}

const config = {
  dev
}

export const CONFIGURL = config[env]