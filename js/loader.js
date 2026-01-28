import { elLoader } from "./html.js";

export function loader(bool) {
  if (bool) {
    elLoader.classList.remove("hidden");
  } else {
    elLoader.classList.add("hidden");
  }
}
