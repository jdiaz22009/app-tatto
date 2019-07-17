const env = "dev";
const dev = {
  api: {
    //url: 'http://192.168.0.7:3000/api/',
    url: "http://192.168.0.6:3000/api/",
    secret_token: "D4TAP4R4L0G1N04UTH",
    tatto: {
      POST: {
        auth: "v1/auth/login",
        register: "v1/auth/register"
      },
      GET: {
        getValidEmail: "v1/auth/validEmail",
        getOrdersTatto: "v1/auth/getOrderWork"
      }
    }
  }
};

const config = {
  dev
};

export const CONFIGURL = config[env];
