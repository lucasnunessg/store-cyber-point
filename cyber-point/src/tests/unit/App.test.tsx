import { fireEvent, render, screen } from '@testing-library/react';
import { stub } from 'sinon';

import Api from '../../components/api'
import MyHeader from '../../components/MyHeader';

it('Testa se o header é "Lucas Store', () => {
    render (<MyHeader/>);
    expect(screen.getByText(/lucas store/i)).toBeInTheDocument();
});

it('Testa se acha o botão de "Próximo"', () => {
    render (<Api />)
    const inputNextPage = screen.getByText(/Próximo/i);
    expect(inputNextPage).toBeInTheDocument();
});

it('testa se acha o botão "Anterior"', () => {
render(<Api />)
const inputPreviousPage = screen.getByText(/Anterior/i);
expect(inputPreviousPage).toBeInTheDocument();
});

describe('Testes dos botões de paginação', () => {
    it('deve chamar a função handleNextPage quando o botão "Próximo" é clicado', () => {
      const handleNextPage = stub();
      const { getByText } = render(<Api handleNextPage={handleNextPage} />);
      const btnNext = getByText(/Próximo/i);
      fireEvent.click(btnNext);
      expect(handleNextPage.calledOnce).toBeTruthy();
    });
    
    it('deve chamar a função handlePrevPage quando o botão "Anterior" é clicado', () => {
      const handlePrevPage = stub();
      const { getByText } = render(<Api handlePrevPage={handlePrevPage} />);
      const btnPrev = getByText(/Anterior/i);
      fireEvent.click(btnPrev);
      expect(handlePrevPage.calledOnce).toBeTruthy();
    });
  });