import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { mockSession, mockTagIndex } from '../mock/mock'

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
  }
  get<R = unknown>(
    url: string,
    query?: Record<string, JSONValue>,
    config?: GetConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'get',
    })
  }
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PostConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PatchConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: DeleteConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'delete',
    })
  }
}

const mock = (response: AxiosResponse) => {
  if (
    location.hostname !== 'localhost' &&
    location.hostname !== '127.0.0.1' &&
    location.hostname !== '192.168.1.7'
  ) {
    return false
  }
  switch (response.config?.params?._mock) {
    // case 'tagIndex':
    //   ;[response.status, response.data] = mockTagIndex(response.config)
    //   return true
    // case 'itemCreate':
    //   ;[response.status, response.data] = mockItemCreate(response.config)
    //   return true
    // case 'itemIndex':
    //   ;[response.status, response.data] = mockItemIndex(response.config)
    //   return true
    // case 'tagCreate':
    //   ;[response.status, response.data] = mockTagCreate(response.config)
    case 'session':
      ;[response.status, response.data] = mockSession(response.config)
      return true
  }
  return false
}

export const http = new Http('/api/v1')

http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${jwt}`)
  }
  return config
})

http.instance.interceptors.response.use(
  (response) => {
    mock(response)
    return response
  },
  (error) => {
    if (mock(error.response)) {
      return error.response
    } else {
      throw error
    }
  }
)
http.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 429) {
        alert('你太频繁了')
      }
    }
    throw error
  }
)
function mockItemCreate(config: AxiosRequestConfig<any>): [number, any] {
  throw new Error('Function not implemented.')
}

function mockTagCreate(config: AxiosRequestConfig<any>): [number, any] {
  throw new Error('Function not implemented.')
}
