import request from '@/utils/request'

// 保存聊天
export function videoTalkAdd(data) {
  return request({
    url: '/wsxf/videoTalk/add/',
    method: 'post',
    data
  })
}

// 获取聊天
export function videoTalkList(params) {
  return request({
    url: '/wsxf/videoTalk/list/',
    method: 'get',
    params
  })
}

/**
 * 附件列表 todo 改成wsxf
 */
export function getFjList(orderId) {
  return request({
    url: '/xfjc/videoTalk/getFjList',
    method: 'get',
    params: { orderId }
  })
}

/**
 * 更新附件关联id为预约记录id  todo 改成wsxf
 */
export function updateFj(data) {
  return request({
    url: '/xfjc/videoXfr/updateFj',
    method: 'post',
    data
  })
}

/**
 * 获取好视通token
 */
export function getHstToken(orderId) {
  return request({
    url: '/xfjc/videoRoom/getTokenByOrderId',
    method: 'get',
    params: { orderId }
  })
}

/**
 * 获取视频参与所有用户
 */
export function getVideoUser(roomId) {
  return request({
    url: '/xfjc/videoXfr/getVideoUser',
    method: 'get',
    params: { roomId }
  })
}

export function getOrderRoomId(orderId) {
  return request({
    url: '/xfjc/videoXfr/getOrderRoomId',
    method: 'get',
    params: { orderId }
  })
}

export function saveOrderRoomId(orderId, roomId) {
  return request({
    url: '/xfjc/videoXfr/saveOrderRoomId',
    method: 'get',
    params: { orderId, roomId }
  })
}

/**
 * 获取527签名
 */
export function get527Sign() {
  return request({
    url: '/xfjc/videoRoom/get527Sign',
    method: 'get',
  });
}

/**
 * 获取527服务器配置
 */
export function get527ServerConfig() {
  return request({
    url: '/xfjc/videoRoom/get527ServerConfig',
    method: 'get',
  });
}
