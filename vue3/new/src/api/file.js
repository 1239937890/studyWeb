import request from "@/utils/request";

// 查询附件列表
export function listFile(service,query) {
  return request({
    url: `/${service}/file/list`,
    method: "get",
    params: query,
  });
}

// 删除附件
export function delFile(service,fjids) {
  return request({
    url: `/${service}/file/remove/${fjids}` ,
    method: "get",
  });
}
