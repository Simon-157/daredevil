export function example() {
  return null;
}


export const fetchData = async () => {
  // Simulate a network request here
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); 
    }, 2000); // Simulate loading time
  });
};