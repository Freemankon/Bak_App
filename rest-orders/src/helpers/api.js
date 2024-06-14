import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
} from "helpers/tokenService";

const URL_ENPOINT =
  "https://eu-central-1.aws.data.mongodb-api.com/app/data-plmnnhl/endpoint/data/v1";

const URL_LOGIN =
  "https://eu-central-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-plmnnhl/auth/providers/local-userpass/login";

const URL_REFRESH_TOKEN =
  "https://eu-central-1.aws.services.cloud.mongodb.com/api/client/v2.0/auth/session";

const DEF_BODY = {
  dataSource: "Cluster0",
  database: "rest",
  collection: "products",
};

const instance = axios.create({
  baseURL: URL_ENPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getNewAccessToken = async (refreshToken) => {
  const rs = await axios({
    method: "POST",
    url: URL_REFRESH_TOKEN,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const { access_token } = rs.data;
  return access_token;
};

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const accessToken = await getNewAccessToken(getRefreshToken());
        setAccessToken(accessToken);
        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export const login = async (username, password) => {
  const rs = await axios.post(
    URL_LOGIN,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { access_token, refresh_token } = rs.data;
  setRefreshToken(refresh_token);
  setAccessToken(access_token);
};

export const getProducts = async () => {
  const { data } = await instance.post(`${URL_ENPOINT}/action/find`, DEF_BODY);
  return data.documents.map(({ _id, name, price }) => ({
    id: _id,
    name,
    price,
  }));
};

export const createProduct = async (name, price) => {
  await instance.post(`${URL_ENPOINT}/action/insertOne`, {
    ...DEF_BODY,
    document: {
      name,
      price,
    },
  });
};

export const updateProduct = async (id, name, price) => {
  await instance.post(`${URL_ENPOINT}/action/updateOne`, {
    ...DEF_BODY,
    filter: {
      _id: {
        $oid: id,
      },
    },
    update: {
      name,
      price,
    },
  });
};

export const deleteProduct = async (id) => {
  await instance.post(`${URL_ENPOINT}/action/deleteOne`, {
    ...DEF_BODY,
    filter: {
      _id: {
        $oid: id,
      },
    },
  });
};
