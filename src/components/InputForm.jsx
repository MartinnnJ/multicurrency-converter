import styles from '../styles/InputForm.module.scss';
import Card from './UI/Card';

function InputForm({ inputData, supportedSourceCurr, onFormSubmit, onInputChange, onSelectChange }) {
  const amount = !inputData.amount ? 0 : inputData.amount; // if input is empty, then 0 as a preview will be displayed
  const formattedAmount = new Intl.NumberFormat().format(amount);
  const formattedConvertedAmount = new Intl.NumberFormat().format(inputData.convertedAmount);

  const previewOutput = (
    <>{formattedAmount} {inputData.sourceCurr} = <strong>{formattedConvertedAmount} USD</strong></>
  );

  return (
    <Card>
      <div className={styles.input}>
        <form className={styles.input__form} onSubmit={onFormSubmit}>

          <input
            className={styles['input__form--amount']}
            type="number"
            value={inputData.amount}
            onChange={onInputChange}
            placeholder="Amount"
          />

          <select className={styles['input__form--select']} value={inputData.sourceCurr} onChange={onSelectChange}>
            {supportedSourceCurr.map((curr, i) => (
              <option key={i} value={curr}>{curr}</option>
            ))}
          </select>

          <div className={styles['input__form--preview']}>
            {!isNaN(inputData.convertedAmount) ? previewOutput : 'Loading...'}
          </div>

          <button className={styles['input__form--button']}>Add</button>
        </form>
      </div>
    </Card>
  )
}

export default InputForm;