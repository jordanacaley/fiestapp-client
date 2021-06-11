import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  console.log(error);
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getServices() {
    return service
      .get("/api/services")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfo() {
    return service
      .get("/api/dashboard")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserServices() {
    return service
      .get("/api/dashboard/services")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneService(serviceId) {
    return service
      .get(`/api/services/${serviceId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteService(serviceId) {
    return service
      .delete("/api/services/" + serviceId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addService(data) {
    return service
      .post("/api/services", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateService(serviceId, data) {
    return service
      .patch(`/api/services/${serviceId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);

  },

  deleteImage(serviceId, image) {
    return service
      .delete(`/api/services/${serviceId}/img`, { params: { image: image } })
      .then((res) => res.data)
      .catch(errorHandler);
  },

};

export default apiHandler;
