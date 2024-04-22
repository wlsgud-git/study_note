export class HttpClient {
  constructor() {
    this.baseURL = "http://localhost:3000";
  }

  async fetching(url, options) {
    let data;
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
    });

    try {
      data = await res.json();
    } catch (err) {
      console.log(err);
    }

    if (res.status >= 200 && res.status <= 299) {
      return data;
    } else {
      alert("error");
    }
  }
}
