import { render, screen } from '@testing-library/react';

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