'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.post('/api/user/login', controller.sys.user.login);
  router.get('/api/user/info', jwt, controller.sys.user.getCurUserInfo);

  router.post('/api/change/psw', jwt, controller.sys.user.changePsw);
  router.post('/api/reset/psw', jwt, controller.sys.user.resetPsw);

  router.post('/api/file', controller.sys.file.upload);

  router.get('/api/user/page', jwt, controller.sys.user.page);
  router.post('/api/user/create', jwt, controller.sys.user.create);
  router.post('/api/user/update', jwt, controller.sys.user.update);
  router.post('/api/user/delete', jwt, controller.sys.user.delete);

  router.get('/api/role/query', jwt, controller.sys.role.query);
  router.get('/api/role/page', jwt, controller.sys.role.page);
  router.post('/api/role/create', jwt, controller.sys.role.create);
  router.post('/api/role/update', jwt, controller.sys.role.update);
  router.post('/api/role/delete', jwt, controller.sys.role.delete);

  // 查询所有菜单
  router.get('/api/menu/query/tree', jwt, controller.sys.menu.queryTree);
  // 添加菜单
  router.post('/api/menu/create', jwt, controller.sys.menu.create);
  // 修改菜单
  router.post('/api/menu/update', jwt, controller.sys.menu.update);
  // 删除菜单
  router.post('/api/menu/delete', jwt, controller.sys.menu.delete);
  // 更新角色菜单
  router.post('/api/role/menu/update', jwt, controller.sys.menu.setRoleMenu);
  // 根据角色id查询菜单
  router.get('/api/role/menu', jwt, controller.sys.menu.getRoleMenu);
  // 获取当前用户菜单
  router.get('/api/user/menu', jwt, controller.sys.menu.getCurUserMenu);

  // 通过角色获取对应的用户
  router.get('/api/users/by/role', jwt, controller.sys.user.getUsersByRole);

  // 获取供应商信息
  router.get('/api/supplier', jwt, controller.dev.supplier.page);
  // 添加供应商信息
  router.post('/api/supplier/create', jwt, controller.dev.supplier.createSupplier);
  // 修改供应商信息
  router.post('/api/supplier/update', jwt, controller.dev.supplier.updateSupplier);
  // 删除供应商信息
  router.post('/api/supplier/delete', jwt, controller.dev.supplier.deleteSupplier);

  // 获取设备信息
  router.get('/api/device', jwt, controller.dev.device.page);
  // 修改设备状态
  router.post('/api/device/updateStatus', controller.dev.device.updateStatus);

  // 获取网络安全知识
  router.get('/api/knowledge', jwt, controller.kno.knowledge.page);
  //查找安全知识详情
  router.get('/api/knowledge/detail', jwt, controller.kno.knowledge.getKnowledge);
  // 增加网络安全知识
  router.post('/api/knowledge/create', jwt, controller.kno.knowledge.createKnowledge);
  // 删除网络安全知识
  router.post('/api/knowledge/delete', jwt, controller.kno.knowledge.deleteKnowledge);

  //查看申请订单
  router.post('/api/order', controller.order.order.getOrder);
  //查看订单详情
  router.post('/api/detail', controller.order.detail.getDetail);
  //申请订单及订单详情
  router.post('/api/create/order', controller.order.order.createOrder);
  //订单审批
  router.post('/api/update/order', controller.order.order.orderUpdate)
};
