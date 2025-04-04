import './_roompage.scss';


export let number;

export function getRoom(data) {
  let room = {};
  for (let item of data) {
    if (item.number === number) {
      room = item;
    }
  }
  console.log(room)
}
