import axios from "axios";

const API_KEY = 'fca_live_WiqcsOTcOMv52QLVHEQKdPCmkgEZZy1PqBXTl32n';

export const supportedSourceCurr = ['EUR', 'CZK', 'GBP'];

export const getLatestExchangeRate = async baseCurr => {
  const urlParams = `?apikey=${API_KEY}&base_currency=${baseCurr}`;
  const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest${urlParams}`).then(data => {
    return data;
  })

  return {
    status: response.status,
    exchangeRateUSD: response.data.data['USD']
  }
}