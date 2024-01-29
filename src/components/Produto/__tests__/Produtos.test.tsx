import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizarComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
  preco: 199.9,
  precoAntigo: 299.9,
  titulo: 'Hogwarts Legacy'
}

describe('Testes para o componente produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizarComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
  })

  test('Deve renderizar um item ao carrinho', () => {
    const { store } = renderizarComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
