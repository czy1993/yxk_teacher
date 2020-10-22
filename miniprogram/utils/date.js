// 获取当前时间
let Time = function () {
  let d = new Date();
  let year = d.getFullYear();
  let month = change(d.getMonth() + 1);
  let day = change(d.getDate());
  return year + '-' + month + '-' + day 
}
function change(t) {
  if (t < 10) {
    return "0" + t;
  } else {
    return t;
  }
}

export default Time