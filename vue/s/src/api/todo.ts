import request from '@/utils/request'

// 获取TODO列表
export const api_todo_list: (params?: Api.Params) => Promise<Todo.ListResult> = (params) => request.get('/todo', {params})

// 设置TODO状态
export const api_todo_set_state: (id: number) => Promise<Api.Message> = (id) => request.patch(`/todo/${id}/`)

// 删除Todo
export const api_todo_delete: (id: number) => Promise<Api.Message> = id => request.delete(`/todo/${id}/`)
