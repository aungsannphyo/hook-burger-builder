import { useState, useEffect } from "react";

export default errorHttp => {
  const [error, setError] = useState(null);

  const reqInterceptor = errorHttp.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const resInterceptor = errorHttp.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      errorHttp.interceptors.request.eject(reqInterceptor);
      errorHttp.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    this.setState({ error: null });
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
