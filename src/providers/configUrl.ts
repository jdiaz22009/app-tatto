//  const env = "prod";
const env = "dev";
const prod = {
  environment: 'prod',
  api: {
    url: "https://tatto-practica.herokuapp.com/api/",
    secret_token: "D4TAP4R4L0G1N04UTH",
    tatto: {
      POST: {
        auth: "v1/auth/login",
        register: "v1/auth/register",
        forgotPassword: "v1/auth/sendForgotPassword/",
        registerOrder: "v1/auth/createOrderWork",
        orderViewUpdate: "/v1/auth/updateViewOrder"
      },
      GET: {
        getValidEmail: "v1/auth/validEmail",
        getOrdersTatto: "v1/auth/getOrderWork"
      }
    }
  }
};
const dev = {
  environment: 'dev',
  api: {
    url: "http://localhost:3001/api/",
    secret_token: "D4TAP4R4L0G1N04UTH",
    tatto: {
      POST: {
        auth: "v1/auth/login",
        register: "v1/auth/register",
        forgotPassword: "v1/auth/sendForgotPassword/",
        registerOrder: "v1/auth/createOrderWork",
        orderViewUpdate: "/v1/auth/updateViewOrder"
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
