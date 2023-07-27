import request from '@/utils/request'

// 获取欢迎信息
export function sendWelcome() {
  return request({
    url: '/wsxf/forward/welcome',
    method: 'post'
  })
}

// 获取欢迎信息
export function talking(data) {
  return request({
    url: '/wsxf/forward/talking',
    method: 'post',
    data: data
  })
}

//生成信访件
export function savexfj(data) {
  return request({
    url: '/wsxf/xfj/CommitTalkXfj',
    method: 'post',
    data: data
  })
}

//常见问题
export function commonproblem(data) {
  data.status = '1'
  return request({
    url: '/wsxf/talkProblem/list',
    method: 'get',
    params: data
  })
}

//聊天记录
export function talkhis(data) {
  return request({
    url: '/wsxf/talkHistory/list',
    method: 'get',
    params: data
  })
}

//检测是否第一次
export function checkFirst() {
  return request({
    url: '/wsxf/xfj/checkFrequency',
    method: 'get',
    params: {
      type: 0
    }
  })
}
