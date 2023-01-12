import { AxiosRequestConfig } from 'axios'
import { faker } from '@faker-js/faker'
type Mock = (config: AxiosRequestConfig) => [number, any]

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ]
}
let id = 0
const createId = () => {
  id += 1
  return id
}
export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 16878,
        user_id: 10255,
        amount: 9900,
        note: null,
        tag_ids: [27742],
        happen_at: '2020-10-30T00:00:00.000+08:00',
        created_at: '2022-11-24T18:04:35.284+08:00',
        updated_at: '2022-11-24T18:04:35.284+08:00',
        kind: 'expenses',
        deleted_at: null,
      },
    },
  ]
}
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: 'caiWu1',
      kind: config.params.kind,
      ...attrs,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPaper(page),
  })
  if (kind === 'expense' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expense' && page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, { resources: createTag(30) }]
  }
}
