const BASE_URL = 'https://api.github.com';

async function request<T>(url: string, method = 'GET', data: any = null): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/vnd.github+json',
    };
  }

  try {
    const response = await fetch(BASE_URL + url, options);
    if (response.status === 403) {
      throw new Error('API request limit exceeded');
    }
    if (!response.ok) {
      throw new Error('Cannot fetch issues');
    }
    return response.json();
  } catch (error) {
    throw new Error('Cannot fetch data');
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
