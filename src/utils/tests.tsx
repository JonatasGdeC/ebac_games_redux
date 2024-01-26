import { PreloadedState } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { AppStore, RootState, configuraStore } from '../store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizarComProvider(
  elemento: React.ReactElement,
  {
    preloadedState,
    store: customStore,
    ...opcoesAdicionais
  }: ExtendedRenderOptions = {}
) {
  const store = customStore || configuraStore(preloadedState)

  // eslint-disable-next-line @typescript-eslint/ban-types
  function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(elemento, {
      wrapper: Encapsulador,
      ...opcoesAdicionais
    })
  }
}
