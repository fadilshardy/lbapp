const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = (url: string, options: RequestInit = {}): Promise<any> => {
  const fullURL: string = `${baseURL}${url}`;
  const headers: HeadersInit = {
    'X-Requested-With': 'XMLHttpRequest',
    ...options.headers,
  };
  const fetchOptions: RequestInit = { ...options, headers };

  return fetch(fullURL, fetchOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('An error occurred:', error);
      throw error;
    });
};

export default apiClient;
