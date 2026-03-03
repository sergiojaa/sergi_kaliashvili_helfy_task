export function parseTaskId(idParam: string): number | null {
    const parsed = Number(idParam);
  
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return null;
    }
  
    return parsed;
  }