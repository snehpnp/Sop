// helpers/getSheetPrice.js

import axios from 'axios';
import Papa from 'papaparse';

const CSV_URL =
    'https://docs.google.com/spreadsheets/d/1wwSMDmZuxrDXJsmxSIELk1O01F0x1-0LEpY03iY1tWU/export?format=csv';


    // https://docs.google.com/spreadsheets/d/1CZoeoUXH__2UrFfldIMvczrMuKDIU5ZYdoTrjPplTLI/export?format=csv&gid=0
    
export async function getPriceBySymbol(symbol) {
    try {
        const response = await axios.get(CSV_URL, { responseType: 'text' });
        const result = await new Promise((resolve, reject) => {
            Papa.parse(response.data, {
                header: true,
                skipEmptyLines: true,
                beforeFirstChunk: chunk => {
                    // normalize header to uppercase for consistent key names
                    const [firstLine, ...rest] = chunk.split(/\r?\n/);
                    return [firstLine.toUpperCase(), ...rest].join('\n');
                },
                complete: r => resolve(r),
                error: err => reject(err),
            });
        });


    
        let lookup
        if (symbol == "BANKNIFTY") {
            lookup = 'NIFTY_BANK';
        } else if (symbol == "NIFTY") {
            lookup = 'NIFTY_50';
        } else if (symbol == "FINNIFTY") {
            lookup = 'NIFTY_FIN_SERVICE';
        } else if (symbol == "BANKEX") {
            lookup = 'BSE-BANK';
        }else {
            lookup = symbol
        }
 

        const row = result.data.find(r => r.SYMBOL === lookup);
        if (!row) throw new Error(`Symbol "${symbol}" not found`);

        return {
            symbol: row.SYMBOL,
            price: parseFloat(row.CPRICE) || null,
            raw: row
        };
    } catch (err) {
        console.error('getPriceBySymbol error:', err);
        throw err;
    }
}

