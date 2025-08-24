function home() {
  console.log("home action Trigger");
}
function search() {
  console.log("search action Trigger");
}
function library() {
  console.log("library action Trigger");
}

export const actions = {
  home,
  search,
  library,
};
