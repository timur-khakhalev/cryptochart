export function getPercentage(partialValue: number, totalValue: number): number {
    return Number.parseFloat(((partialValue / totalValue - 1) * 100).toFixed(2));
}

export function SeparateDigits(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}