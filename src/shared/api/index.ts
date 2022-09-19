import axios from "axios";

const appUrl =
  "http://ec2-43-201-20-210.ap-northeast-2.compute.amazonaws.com:8000";

const apiInstant = axios.create({
  baseURL: appUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

apiInstant.interceptors.request.use(async (config) => {
  const userTokenData = JSON.parse(localStorage.getItem("user") || "{}");
  const today = Math.floor(new Date().valueOf() / 1000);
  if (!userTokenData["access"]) {
    return config;
  }
  try {
    if (userTokenData["accessExpire"] > today) {
      config.headers = {
        ...(config.headers || {}),
        authorization: `${userTokenData["access"]}`,
      };
      return config;
    } else if (userTokenData["refreshExpire"] > today) {
      const today = Math.floor(new Date().valueOf() / 1000);
      const { data: tokenData } = await axios.get(appUrl + "/user/token", {
        headers: {
          refresh: userTokenData["refresh"],
        },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          access: tokenData["access"],
          refresh: tokenData["refresh"],
          accessExpire: today + 1800,
          refreshExpire: today + 3600 * 24 * 2,
        })
      );

      config.headers = {
        ...(config.headers || {}),
        authorization: `${tokenData["access"]}`,
      };
      return config;
    }
    localStorage.removeItem("user");
    return config;
  } catch (error) {
    return config;
  }
});

export default apiInstant;
