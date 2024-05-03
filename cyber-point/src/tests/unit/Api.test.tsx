import { render, screen } from '@testing-library/react';

import MyHeader from '../../components/MyHeader';

it('Testa se o header é "Lucas Store', () => {
    render (<MyHeader/>);
    expect(screen.getByText(/lucas store/i)).toBeInTheDocument();
});