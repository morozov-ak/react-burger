export function deleteCookie(name:string) {
  document.cookie = name + '=; Max-Age=0'
}
