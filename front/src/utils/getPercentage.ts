export default function getPercentage(partialValue: number, totalValue: number): number {
    return Number.parseFloat(((partialValue / totalValue - 1) * 100).toFixed(2));
}