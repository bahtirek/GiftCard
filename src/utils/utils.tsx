  const isPinNotExpired = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.abs(now - timestamp) / 1000;   
    return diffInSeconds < 60;
  }

export {
  isPinNotExpired
}