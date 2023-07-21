import { useEffect, useState } from "react";
import { supportedSourceCurr, getLatestExchangeRate } from "./api/exchange-rate";
import InputForm from "./components/InputForm";
import CurrencyTable from "./components/CurrencyTable";

const calcSelectedCurrToUSD = (amount, rate) => {
  return (amount * rate).toFixed(4);
}

function App() {
  const [inputData, setInputData] = useState({ amount: 0, sourceCurr: supportedSourceCurr.at(0), convertedAmount: undefined });
  const [tableData, setTableData] = useState([]);
  const [exchangeRateUSD, setExchangeRateUSD] = useState(undefined);

  useEffect(() => {
    (async() => {
      const result = await getLatestExchangeRate(inputData.sourceCurr);
      if (result.status !== 200) {
        console.log('Error occurred.'); // display an error to the user when it happens
        return;
      }
      setExchangeRateUSD(result.exchangeRateUSD);
    })();
  }, [inputData.sourceCurr]);

  // conversion to USD is managed here
  useEffect(() => {
    const result = calcSelectedCurrToUSD(inputData.amount, exchangeRateUSD); // result can be NaN for the first calculation
    setInputData(prevState => {
      return { ...prevState, convertedAmount: result }
    })
  }, [inputData.amount, exchangeRateUSD])

  const onFormSubmit = e => {
    e.preventDefault();
    console.log(inputData);
    if (!inputData.amount) {
      console.log('No input amount!');
      return;
    }
    setTableData(prevState => {
      return [...prevState, inputData]
    })
  }

  const onInputChange = e => {
    setInputData(prevState => {
      return { ...prevState, amount: e.target.value }
    })
  }

  const onSelectChange = e => {
    setInputData(prevState => {
      return { ...prevState, sourceCurr: e.target.value }
    })
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <InputForm
        inputData={inputData}
        supportedSourceCurr={supportedSourceCurr}
        onFormSubmit={onFormSubmit}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
      />
      <CurrencyTable data={tableData} />
    </div>
  )
}

export default App
