// Simenti ID generation utilities

let counter = 10; // Start after demo data (00001-00010)

export function generateSimentiId(): string {
  counter++;
  const year = new Date().getFullYear();
  const padded = String(counter).padStart(5, '0');
  return `GOV-GB-${year}-${padded}`;
}

export function resetCounter(start: number = 10): void {
  counter = start;
}

export function parseSimentiId(id: string): { year: number; number: number } | null {
  const match = id.match(/^GOV-GB-(\d{4})-(\d{5})$/);
  if (!match) return null;
  return { year: parseInt(match[1]), number: parseInt(match[2]) };
}

export function isValidSimentiId(id: string): boolean {
  return /^GOV-GB-\d{4}-\d{5}$/.test(id);
}
