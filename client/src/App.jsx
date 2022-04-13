import { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'

function App() {
  return (
    <ApolloProvider client={client}>
      <div>APP</div>
      <Button>Click Here</Button>
    </ApolloProvider>
  )
}

export default App
