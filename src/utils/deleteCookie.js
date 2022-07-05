import { setCookie } from "./setCookie";

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
