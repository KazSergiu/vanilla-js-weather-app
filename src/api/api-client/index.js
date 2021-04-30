//  Xhr wrapper

export function apiClient({ method, url, body }, setLoadingState, callback) {
  const succesStatus = 200;
  const responseReady = 4;
  const errorStatus = 400;
  const request = new XMLHttpRequest();
  setLoadingState(true);
  request.onreadystatechange = function () {
    if (this.readyState === responseReady && this.status === succesStatus) {
      setLoadingState(false);
      const data = JSON.parse(this.responseText);
      callback(undefined, data);
    } else if (this.status >= errorStatus) {
      setLoadingState(true);
      callback(
        `Error appeared: code - ${this.status} status - ${this.statusText}`,
        undefined
      );
    }
  };
  request.open(method, url, true);
  request.send();
}
