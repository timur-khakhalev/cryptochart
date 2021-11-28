/* eslint-disable yoda */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

const filtered: any = []
const coinNames: any = []

function getWsReducer(state: any, action: any): any {
    switch (action.type) {
        case 'set': {
            const newestData = action.payload
            newestData.forEach((_coin: any) => {
                if (coinNames.length > 0 ) {
                    if (!coinNames.includes(_coin.s)) coinNames.push(_coin.s)
                } else coinNames.push(_coin.s)
            coinNames.map((_cName: any) => {
                if (_cName === _coin.s) {
                    const index = filtered.findIndex((o: any) => o.s === _cName)
                    if (index >= 0) {
                        filtered[index] = _coin
                    } else {
                        filtered.push(_coin)
                    }
                }
            })
            })
            console.log(filtered.length)
            return {
                ...state,
                filtered
            };
        }
        default:
            return state;
    }
}

export default { getWsReducer };