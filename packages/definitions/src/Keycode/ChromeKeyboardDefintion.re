type chromeKeyboardDefintion = {
  keyCode: int,
  key: string,
  code: string,
  location: int,
};

[@bs.val] [@bs.module "./getKeycodeDefinitions.js"]
external getKeycodeDefinition: string => option(chromeKeyboardDefintion) =
  "getKeycodeDefinition";