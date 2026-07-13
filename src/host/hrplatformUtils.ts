export type HttpRequestOptions = {
  errorCodeQuery?: string;
  errorMessageQuery?: string;
  headers?: Record<string, string>;
};

export type HttpRequestCallOptions = {
  input?: RequestInit;
};

export class HttpRequestError extends Error {
  public readonly status: number;

  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class HttpRequest {
  private readonly baseUrl: string;

  private readonly options: HttpRequestOptions;

  public constructor(baseUrl: string, options: HttpRequestOptions = {}) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    this.options = options;
  }

  public async get<T>(path: string, options: HttpRequestCallOptions = {}): Promise<T> {
    const requestHeaders = new Headers(this.options.headers);
    const inputHeaders = new Headers(options.input?.headers);

    inputHeaders.forEach((value, key) => {
      requestHeaders.set(key, value);
    });

    const response = await fetch(this.resolvePath(path), {
      ...options.input,
      method: 'GET',
      credentials: options.input?.credentials ?? 'include',
      headers: requestHeaders,
    });

    if (!response.ok) {
      throw new HttpRequestError(response.status, `Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  private resolvePath(path: string): string {
    return `${this.baseUrl}${path.replace(/^\/+/, '')}`;
  }
}
