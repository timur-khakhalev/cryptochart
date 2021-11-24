
class Test {
    constructor(list){
        this.list = list
    }

    getList() {
    return this.list.map((c) => {
        return c.symbol
    }).join('')
    }

}

const list = [
{
    "name": "Bitcoin",
    "symbol": "BTC"
},
{
    "name": "Ethereum",
    "symbol": "ETH"
},
{
    "name": "WAX",
    "symbol": "WAXP"
},
{
    "name": "Hive",
    "symbol": "HIVE"
},
{
    "name": "Avalanche",
    "symbol": "AVAX"
}
]

const tst = new Test(list)

console.log(tst)