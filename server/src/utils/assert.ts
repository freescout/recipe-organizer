export function assertNotNull<T>(
  value: T | null,
  name = "Value"
): asserts value is T {
  if (value === null) {
    throw new Error(`${name} should not be null`);
  }
}
