export const string2Bin = (str: string) => {
  var result = []
  for (var i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i).toString(2))
  }
  return result
}
