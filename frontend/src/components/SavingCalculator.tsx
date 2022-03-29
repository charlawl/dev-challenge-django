import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { Alert, AlertIcon, ChakraProvider, extendTheme, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Tooltip, FormLabel} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from '../components/layouts/Default'
import LineChart from '../components/LineChart'
import theme from '../theme'
import MySlider from './SliderCalc'
import { Moment } from 'moment'
import moment from 'moment'
 
const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = [100, 150, 180, 210, 240, 350]


function handleChange(inputs:Object, setChartData:Dispatch<SetStateAction<any>>){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( inputs )
    };
    fetch('http://localhost:8000/interest-data/', requestOptions)
        .then(response => response.json())
        .then(data => setChartData(data.results))
}

const xAxisValues = Array.from(Array(600).keys())
    .map((m:number) => moment().add(m, 'months'))
    .map((m:Moment) => moment(m).year().toString())

const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'});

function SavingsCalculator() {
    const [inputs, setInputs] = useState({initial_amount: 500, monthly_amount: 20, interest_rate: 5}); 
    const [chartData, setChartData] = useState(tempData)
    useEffect(() => {handleChange(inputs, setChartData)}, [inputs])

    const totalSavings = formatter.format(parseInt(chartData.slice(-1)[0].toFixed()))

    return (
        <div>
            <Container pt={6}>
                <LineChart
                    title="Savings Over time"
                    xAxisData={xAxisValues}
                    yAxisData={chartData}
                    xLabel="Years"
                    yLabel="Amount" />
            </Container>
            
            <Container pt={5}>

            <Container pt={5}>
                    <h2>Initial Amount</h2>
                <NumberInput 
                allowMouseWheel 
                step={10} 
                defaultValue={inputs.initial_amount}
                min={0} 
                onChange={(_,value) => {setInputs({ ...inputs, initial_amount: value})}}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>
                </Container>

                <Container pt={5}>
                    <h2>Monthly Contribution</h2>
                    <NumberInput 
                    allowMouseWheel
                    step={10} 
                    defaultValue={inputs.monthly_amount} 
                    min={0}
                    onChange={(_,value) => {setInputs({ ...inputs, monthly_amount: value})}}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </Container>
            
                <Container pt={5}>
                    <h2>Interest Rate (yearly)</h2>
                    <MySlider 
                    max={20}
                    onChange={(e:number) => {setInputs({ ...inputs, interest_rate: e })}}/>
                    </Container>

                    <Container pt={5}>
                    <Alert status='info'>
                    <AlertIcon />
                        You will have saved {totalSavings} in 50 years!
                    </Alert>
                </Container>
            </Container>    
            </div>
    )
}

export default SavingsCalculator
