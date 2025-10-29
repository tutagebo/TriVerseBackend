export function uuidParse(str: string): Uint8Array {
  const hex = str.replace(/-/g, "");
  if (hex.length !== 32) throw new Error("Invalid UUID");
  const arr = new Uint8Array(16);
  for (let i = 0; i < 16; i++) arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return arr;
}

export function uuidStringify(arr: Uint8Array): string {
  const hex = Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  return (
    hex.slice(0, 8) + "-" +
    hex.slice(8, 12) + "-" +
    hex.slice(12, 16) + "-" +
    hex.slice(16, 20) + "-" +
    hex.slice(20)
  );
}