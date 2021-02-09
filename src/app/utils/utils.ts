export function randomAlphaNumeric(length: number) {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getIndex(item: any, list: any) {
  const index = list.findIndex((element: any) => element.id == item.id);
  return index;
}
export function findParent(item: any, list: any) {
  const queue = [...list];
  while (queue.length > 0) {
    let cur = queue.shift();
    if (cur.id == item.node_parent) {
      return cur;
    }
    cur?.children.forEach((child: any) => {
      queue.push(child);
    });
  }
}
