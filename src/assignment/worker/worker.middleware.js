const loggingMiddleware = (store) => {
    return (next) => {
      return (action) => {
        console.log('dispatch', action.type);
        let result = next(action);
        return result;
      };
    };
};