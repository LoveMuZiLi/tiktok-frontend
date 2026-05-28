/**
 * 互动数展示：
 * - < 1万：原样整数
 * - ≥ 1万：以「万」为单位，不展示完整数字
 * - ≥ 100万：万为单位，小数点后保留 1 位
 * - ≥ 1亿：以「亿」为单位
 */
export function formatCount(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0";
  const num = Math.floor(n);

  if (num >= 100_000_000) {
    return `${trimOneDecimal(num / 100_000_000)}亿`;
  }
  if (num >= 1_000_000) {
    return `${formatWanOverMillion(num)}万`;
  }
  if (num >= 10_000) {
    return `${trimOneDecimal(num / 10_000)}万`;
  }
  return String(num);
}

/** ≥ 100万：1234567 → 123.5（万）；12345678 → 1234.6 */
function formatWanOverMillion(n: number): string {
  const wan = n / 10_000;
  const fixed = wan.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}

function trimOneDecimal(value: number): string {
  const fixed = value.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}
