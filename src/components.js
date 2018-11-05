import React from 'react';
import ReactDOM from 'react-dom';
import { format } from 'date-fns'

import './styles.css';

function formatAmount(amount) {
    const className = amount > 0 ? 'amount--positive' : 'amount--negative';
    return <span className={className}>
        {amount > 0 ? '+' : '-'}{(Math.abs(amount) / 100).toFixed(2)}
    </span>;
}

const App = (props) => (
    <div>
        <header></header>
        <main>
            <ul>
                {props.transactions.map(transaction => (
                    <li className="listing">
                        <div className="listing__heading date">{format(transaction.created, 'dddd Do MMMM')}</div>
                        <div className="listing__body">
                            <div className="listing__body-left">
                                <span className="category">{/*transaction.category*/}</span>
                                {transaction.description}
                            </div>
                            <div className="listing__body-right">
                                {formatAmount(transaction.local_amount)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    </div>
);

function renderApp(data) {
    const mount = document.querySelector('.root');
    ReactDOM.render(<App {...data} />, mount);
}

export default renderApp
