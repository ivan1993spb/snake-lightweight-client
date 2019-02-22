
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
