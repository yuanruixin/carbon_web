export function isMobile() {
  let mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  // 获取当前用户代理字符串
  let userAgent = navigator.userAgent;
  // 检测是否匹配到移动设备关键字

  if (mobileRegex.test(userAgent)) return true

  else return false
}