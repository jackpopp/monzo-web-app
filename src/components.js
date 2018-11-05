import React from 'react';
import ReactDOM from 'react-dom';

function formatAmount(amount) {
    return `£${((amount > 0 ? Math.abs(amount) : amount) / 100).toFixed(2)}`;
}

const App = (props) => (
    <ul>
        {props.transactions.map(transaction => (
            <li>
                <p>{transaction.description}</p>
                <p>{formatAmount(transaction.local_amount)} - {transaction.category} - {transaction.created}</p>
            </li>
        ))}
    </ul>
);

function renderApp(data) {
    const mount = document.querySelector('.root');
    ReactDOM.render(<App {...data} />, mount);
}

export default renderApp
