type chromeKeyboardDefintion = {
  keyCode: int,
  key: string,
  code: string,
  location: int,
}

@val @module("../../../../js/getKeycodeDefintions")
external getKeycodeDefinition: string => option<chromeKeyboardDefintion> = "getKeycodeDefinition"
