import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ApiResponse {
  balance: Balance;
  transactions: Transaction[];
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get<ApiResponse>('/transactions');

      const formattedTransactions = data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString('pt-BR')
        })
      );

      const formattedBalance: Balance = {
        income: formatValue(+data.balance.income),
        outcome: formatValue(+data.balance.outcome),
        total: formatValue(+data.balance.total)
      }

      setTransactions(formattedTransactions);
      setBalance(formattedBalance);
    }
    loadTransactions();
  }, []);

  return (
    <>
      <Header page="list" />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {balance.outcome}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(
                ({
                  id,
                  title,
                  type,
                  formattedValue,
                  formattedDate,
                  category,
                }: Transaction) => (
                    <tr key={id}>
                      <td className="title">{title}</td>
                      <td className={type}>
                        {type === 'outcome' && '- '}
                        {formattedValue}
                      </td>
                      <td>{category?.title || '-'}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
