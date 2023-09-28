export function formatUnixTimestamp(timestamp: number) {
  // Create a JavaScript Date object by multiplying the timestamp by 1000 to convert it to milliseconds.
  const date = new Date(timestamp * 1000);

  // Extract date components.
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date as "YYYY-MM-DD HH:MM:SS".
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day} ${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedDate;
}
