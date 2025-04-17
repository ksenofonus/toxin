// import './_roompage.scss';

export function getRoom(data, number) {
  let room = {};
  for (let item of data) {
    if (item.number === number) {
      room = item;
    }
  }
  return room;
}
