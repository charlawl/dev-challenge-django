import React, {Dispatch, SetStateAction, useState} from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import SavingsCalculator from './components/SavingCalculator'
 
const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            {/* We've just bundled everything into one file here to 
            get you started!*/}
            <DefaultLayout>
                <Container pt={8}>
                <SavingsCalculator/>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
