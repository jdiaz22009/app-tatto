//const env = "prod";
const env = "dev";
const prod = {
  api: {
    url: "http://68.183.161.122:3000/api/",
    secret_token: "D4TAP4R4L0G1N04UTH",
    tatto: {
      POST: {
        auth: "v1/auth/login",
        register: "v1/auth/register",
        forgotPassword: "v1/auth/sendForgotPassword/"
      },
      GET: {
        getValidEmail: "v1/auth/validEmail",
        getOrdersTatto: "v1/auth/getOrderWork"
      }
    }
  }
};
const dev = {
  api: {
    url: "http://192.168.0.8:3000/api/",
    secret_token: "D4TAP4R4L0G1N04UTH",
    tatto: {
      POST: {
        auth: "v1/auth/login",
        register: "v1/auth/register",
        forgotPassword: "v1/auth/sendForgotPassword/"
      },
      GET: {
        getValidEmail: "v1/auth/validEmail",
        getOrdersTatto: "v1/auth/getOrderWork"
      }
    }
  }
};

const config = {
  dev,
  prod
};

export const CONFIGURL = config[env];
