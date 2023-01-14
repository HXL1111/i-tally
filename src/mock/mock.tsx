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
export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs,
  })
  return [200, { resource: createTag() }]
}
export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: 'caiWu4',
    kind: 'expense',
    ...attrs,
  })
  return [200, { resource: createTag() }]
}
export const mockTagCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 27775,
        user_id: 10262,
        name: 'x',
        sign: 'caiWu2',
        deleted_at: null,
        created_at: '2022-11-24T18:04:35.542+08:00',
        updated_at: '2022-11-24T18:04:35.542+08:00',
        kind: 'income',
      },
    },
  ]
}
let id = 0
const createId = () => {
  id += 1
  return id
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: 'caiWu5',
    kind: 'expenses',
    ...attrs,
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, {}]
  }
}
export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expense: 9900,
      income: 9900,
      balance: 0,
    },
  ]
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
    summary: {
      expense: 9900,
      income: 9900,
      balance: 0,
    },
  })
  if (kind === 'expense' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expense' && page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, { resources: createTag(30) }]
  }
}
