function timeAgo(timestamp: string) {
 const now = Date.now();
 const diff = now - Number(timestamp); // in milliseconds

 const seconds = Math.floor(diff / 1000);
 if (seconds < 60) return `${seconds} seconds`;

 const minutes = Math.floor(seconds / 60);
 if (minutes < 60) return `${minutes} minutes`;

 const hours = Math.floor(minutes / 60);
 if (hours < 24) return `${hours} hours`;

 const days = Math.floor(hours / 24);
 if (days < 30) return `${days} days`;

 const months = Math.floor(days / 30);
 if (months < 12) return `${months} months`;

 const years = Math.floor(months / 12);
 return `${years} years`;
}

export default timeAgo;