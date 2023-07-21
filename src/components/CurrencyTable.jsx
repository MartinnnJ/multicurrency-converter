import styles from '../styles/CurrencyTable.module.scss';
import Card from './UI/Card';

const calcTotalAmount = arr => {
  return arr.reduce((a, b) => a + b, 0);
}

function CurrencyTable({ data }) {
  const allAmounts = data.map(obj => +obj.convertedAmount); // maybe try to use useMemo hook for better app performance
  const outputSum = data.length === 0 ? '0,0000' : calcTotalAmount(allAmounts).toFixed(4);

  return (
    <Card>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Base Currency</th>
            <th>Converted To USD</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={3}>Nothing to display</td></tr>
          ) : (
            data.map((row, i) => {
              const formattedAmount = new Intl.NumberFormat().format(row.amount);
              const formattedConvertedAmount = new Intl.NumberFormat().format(row.convertedAmount);

              return (
                <tr key={i}>
                  <td>{formattedAmount}</td>
                  <td>{row.sourceCurr}</td>
                  <td>{formattedConvertedAmount} $</td>
                </tr>
              )
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td><strong>{outputSum} $</strong></td>
          </tr>
        </tfoot>
      </table>
    </Card>
  )
}

export default CurrencyTable;