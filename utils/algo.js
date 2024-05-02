export function InsertSearch(data, t) {
  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let compare = data[mid].innerText;

    if (mid == 0 && t < compare) {
      return -1;
    }

    if (t < compare) right = mid - 1;
    else left = mid + 1;
  }
  return left;
}
