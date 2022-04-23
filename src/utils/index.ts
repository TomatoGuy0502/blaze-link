export const isValidUrl = (url: string) => {
  const urlReg = /(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return urlReg.test(url)
}
