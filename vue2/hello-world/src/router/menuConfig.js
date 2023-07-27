export const routeSource = [{
    "name": "Jcgl",
    "path": "/jcgl",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "ParentView",
    "alwaysShow": true,
    "meta": {
      "title": "基础业务数据管理",
      "icon": "build",
      "noCache": false,
      "link": null
    },
    "children": [{
        "name": "SystemSms",
        "path": "/system/sms",
        "hidden": false,
        "component": "system/sms/index",
        "meta": {
          "title": "短信配置",
          "icon": "button",
          "noCache": false,
          "link": null
        }
      },
      {
        "name": "SystemYypz",
        "path": "/system/yypz",
        "hidden": false,
        "component": "system/yypz/index",
        "meta": {
          "title": "应用配置",
          "icon": "cascader",
          "noCache": false,
          "link": null
        }
      }
    ]
  },
  {
    "name": "SystemLog",
    "path": "/system/log",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "ParentView",
    "alwaysShow": true,
    "meta": {
      "title": "日志管理",
      "icon": "log",
      "noCache": false,
      "link": null
    },
    "children": [{
        "name": "SystemLogOperlog",
        "path": "/system/log/operlog",
        "hidden": false,
        "component": "system/operlog/index",
        "meta": {
          "title": "操作日志",
          "icon": "form",
          "noCache": false,
          "link": null
        }
      },
      {
        "name": "SystemLogLogininfor",
        "path": "/system/log/logininfor",
        "hidden": false,
        "component": "system/logininfor/index",
        "meta": {
          "title": "登录日志",
          "icon": "logininfor",
          "noCache": false,
          "link": null
        }
      }
    ]
  },
  // {
  //   "name": "SystemDept",
  //   "path": "/system/dept",
  //   "hidden": false,
  //   "component": "system/dept/index",
  //   "meta": {
  //     "title": "机构管理",
  //     "icon": "tree",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemPost",
  //   "path": "/system/post",
  //   "hidden": false,
  //   "component": "system/post/index",
  //   "meta": {
  //     "title": "岗位管理",
  //     "icon": "post",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemDict",
  //   "path": "/system/dict",
  //   "hidden": false,
  //   "component": "system/dict/index",
  //   "meta": {
  //     "title": "字典管理",
  //     "icon": "dict",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemConfig",
  //   "path": "/system/config",
  //   "hidden": false,
  //   "component": "system/config/index",
  //   "meta": {
  //     "title": "参数设置",
  //     "icon": "edit",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemNotice",
  //   "path": "/system/notice",
  //   "hidden": false,
  //   "component": "system/notice/index",
  //   "meta": {
  //     "title": "通知公告",
  //     "icon": "message",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemVersion",
  //   "path": "/system/version",
  //   "hidden": false,
  //   "component": "system/version/index",
  //   "meta": {
  //     "title": "版本升级",
  //     "icon": "DocumentCopy",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemCjwd",
  //   "path": "/system/cjwd",
  //   "hidden": false,
  //   "component": "system/cjwd/index",
  //   "meta": {
  //     "title": "常见问答库",
  //     "icon": "skill",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemTemplate",
  //   "path": "/system/template",
  //   "hidden": false,
  //   "component": "system/template/index",
  //   "meta": {
  //     "title": "模板配置",
  //     "icon": "checkbox",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemMdsp",
  //   "path": "/system/mdsp",
  //   "hidden": false,
  //   "component": "system/mdsp/index",
  //   "meta": {
  //     "title": "秒懂视频",
  //     "icon": "dashboard",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemJdalnw",
  //   "path": "/system/jdalnw",
  //   "hidden": false,
  //   "component": "system/jdalnw/index",
  //   "query": "{\"lx\":1}",
  //   "meta": {
  //     "title": "经典案例管理(对外)",
  //     "icon": "client",
  //     "noCache": true,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemZcfg",
  //   "path": "/system/zcfg",
  //   "hidden": false,
  //   "component": "system/zcfg/index",
  //   "meta": {
  //     "title": "政策法规",
  //     "icon": "dict",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemJdal",
  //   "path": "/system/jdal",
  //   "hidden": false,
  //   "component": "system/jdalnw/index",
  //   "query": "{\"lx\":0}",
  //   "meta": {
  //     "title": "经典案例(对内)",
  //     "icon": "component",
  //     "noCache": true,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemDpconfig",
  //   "path": "/system/dpconfig",
  //   "hidden": false,
  //   "component": "system/dpconfig/index",
  //   "meta": {
  //     "title": "大屏配置",
  //     "icon": "cascader",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemDpversion",
  //   "path": "/system/dpversion",
  //   "hidden": false,
  //   "component": "system/dpversion/index",
  //   "meta": {
  //     "title": "大屏版本",
  //     "icon": "cascader",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemDeptshow",
  //   "path": "/system/deptshow",
  //   "hidden": false,
  //   "component": "system/deptshow/index",
  //   "meta": {
  //     "title": "职能部门",
  //     "icon": "cutting",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemDynamic",
  //   "path": "/system/dynamic",
  //   "hidden": false,
  //   "component": "system/dynamic/index",
  //   "meta": {
  //     "title": "建议动态",
  //     "icon": "documentation",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemYtjconfig",
  //   "path": "/system/ytjconfig",
  //   "hidden": false,
  //   "component": "system/ytjconfig/index",
  //   "meta": {
  //     "title": "一体机配置",
  //     "icon": "drag",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemFlclqd",
  //   "path": "/system/flclqd",
  //   "hidden": false,
  //   "component": "system/flclqd/index",
  //   "meta": {
  //     "title": "分类处理清单",
  //     "icon": "dict",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemYtjcofig",
  //   "path": "/system/ytjcofig",
  //   "hidden": false,
  //   "component": "system/ytjconfig/indexonline",
  //   "meta": {
  //     "title": "一体机在线",
  //     "icon": "example",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemYtjversion",
  //   "path": "/system/ytjversion",
  //   "hidden": false,
  //   "component": "system/ytjversion/index",
  //   "meta": {
  //     "title": "一体机版本管理",
  //     "icon": "client",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemSubject",
  //   "path": "/system/subject",
  //   "hidden": true,
  //   "component": "system/subject/index",
  //   "meta": {
  //     "title": "建议主题",
  //     "icon": "component",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemPysuser",
  //   "path": "/system/pysuser",
  //   "hidden": false,
  //   "component": "system/pysuser/index",
  //   "meta": {
  //     "title": "评议室人员维护",
  //     "icon": "ldps",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemClient",
  //   "path": "/system/client",
  //   "hidden": false,
  //   "component": "/system/client/index",
  //   "meta": {
  //     "title": "客户配置",
  //     "icon": "#",
  //     "noCache": false,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemKjrk",
  //   "path": "/system/kjrk",
  //   "hidden": false,
  //   "component": "system/kjrk/index",
  //   "meta": {
  //     "title": "快捷入口",
  //     "icon": "cascader",
  //     "noCache": true,
  //     "link": null
  //   }
  // },
  // {
  //   "name": "SystemSystemGnzjIndex",
  //   "path": "/system/system/gnzj/index",
  //   "hidden": false,
  //   "component": "system/gnzj/index",
  //   "meta": {
  //     "title": "功能组件",
  //     "icon": "exchange",
  //     "noCache": true,
  //     "link": null
  //   }
  // }
]