export default function assertNotEmpty<T>(
  input: T | null | undefined,
  errorMessage?: string
): asserts input is (Exclude<T, null> & Exclude<T, undefined>) | never {
  if (input === null || input === undefined) {
    throw Error(errorMessage || 'Assertion failed');
  }
}
