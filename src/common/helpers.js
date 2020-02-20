
const DEFAULT_CLIENT_WIDTH = 1200
const DEFAULT_CLIENT_HEIGHT = 800

export const clientSizePx = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth || DEFAULT_CLIENT_WIDTH,
    height: window.innerHeight || document.documentElement.clientHeight ||
      document.body.clientHeight || DEFAULT_CLIENT_HEIGHT
  }
}

export const clientScrollPx = () => {
  return {
    scrollTop: window.pageYOffset || document.documentElement.scrollTop ||
      document.body.scrollTop,
    scrollLeft: window.pageXOffset || document.documentElement.scrollLeft ||
      document.body.scrollLeft
  }
}

export const clientPx = () => {
  return {
    clientTop: document.documentElement.clientTop || document.body.clientTop || 0,
    clientLeft: document.documentElement.clientLeft || document.body.clientLeft || 0
  }
}

export const detectMobileAndroidDevice = () => navigator.userAgent.match(/Android/i)

export const detectMobileWebOSDevice = () => navigator.userAgent.match(/webOS/i)

export const detectMobileIPhoneDevice = () => navigator.userAgent.match(/iPhone/i)

export const detectMobileIPadDevice = () => navigator.userAgent.match(/iPad/i)

export const detectMobileIPodDevice = () => navigator.userAgent.match(/iPod/i)

export const detectMobileBlackBerryDevice = () => navigator.userAgent.match(/BlackBerry/i)

export const detectMobileWindowsPhoneDevice = () => navigator.userAgent.match(/Windows Phone/i)

export const detectMobileDevice = () => {
  if (detectMobileAndroidDevice() || detectMobileWebOSDevice() ||
  detectMobileIPhoneDevice() || detectMobileIPadDevice() ||
  detectMobileIPodDevice() || detectMobileBlackBerryDevice() ||
  detectMobileWindowsPhoneDevice()) {
    return true
  } else {
    return false
  }
}
