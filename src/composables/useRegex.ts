const urlReg = /(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

export const useRegex = () => ({
  isValidUrl: (url: string) => urlReg.test(url)
})
