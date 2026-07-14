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

  private async request<T>(
    method: 'DELETE' | 'GET' | 'POST',
    path: string,
    options: HttpRequestCallOptions,
    body?: unknown
  ): Promise<T> {
    const requestHeaders = new Headers(this.options.headers);
    const inputHeaders = new Headers(options.input?.headers);

    inputHeaders.forEach((value, key) => {
      requestHeaders.set(key, value);
    });

    if (body !== undefined && !requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    const response = await fetch(this.resolvePath(path), {
      ...options.input,
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: options.input?.credentials ?? 'include',
      headers: requestHeaders,
    });

    if (!response.ok) {
      throw new HttpRequestError(response.status, `Request failed with status ${response.status}`);
    }

    const responseText = await response.text();

    if (responseText === '') {
      return undefined as T;
    }

    const payload = JSON.parse(responseText) as unknown;

    if (typeof payload === 'object' && payload !== null && 'data' in payload) {
      return payload.data as T;
    }

    return payload as T;
  }

  public async get<T>(path: string, options: HttpRequestCallOptions = {}): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  public async post<T>(
    path: string,
    body: unknown,
    options: HttpRequestCallOptions = {}
  ): Promise<T> {
    return this.request<T>('POST', path, options, body);
  }

  public async delete<T>(path: string, options: HttpRequestCallOptions = {}): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }

  private resolvePath(path: string): string {
    return `${this.baseUrl}${path.replace(/^\/+/, '')}`;
  }
}
