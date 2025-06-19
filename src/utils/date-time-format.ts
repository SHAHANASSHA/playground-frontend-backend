function formatTimestamp(ms: number) {
 const date = new Date(ms);

 const day = String(date.getDate()).padStart(2, '0');
 const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
 const year = String(date.getFullYear()).slice(-2); // Get last two digits

 let hours = date.getHours();
 const minutes = String(date.getMinutes()).padStart(2, '0');
 const ampm = hours >= 12 ? 'pm' : 'am';

 hours = hours % 12;
 hours = hours ? hours : 12; // Handle 0 (midnight) as 12

 return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}

export default formatTimestamp;