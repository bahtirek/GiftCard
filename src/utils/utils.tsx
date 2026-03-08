const isPinNotExpired = (timestamp: number) => {
  const now = Date.now();
  const diffInSeconds = Math.abs(now - timestamp) / 1000;   
  return diffInSeconds < 60;
}

const getDate = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return dateString;
}


export {
  isPinNotExpired,
  getDate
}