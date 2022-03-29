import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { ChakraProvider, extendTheme, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Tooltip, FormLabel} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from '../components/layouts/Default'
import LineChart from '../components/LineChart'
import theme from '../theme'
import MySlider from './MySlider'
 
const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 150, 180, 210, 240, 350]
}

function handleChange(inputs:Object, setChartData:Dispatch<SetStateAction<any>>){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( inputs )
    };
    console.log(requestOptions)
    fetch('http://localhost:8000/interest-data/', requestOptions)
        .then(response => response.json())
        .then(data => setChartData({xAxis: Array.from(Array(600).keys()), yAxis: data.results}));
}

function SavingsCalculator() {
    const [inputs, setInputs] = useState({initial_amount: 500, monthly_amount: 20, interest_rate: 0.05}); 
    const [chartData, setChartData] = useState(tempData)
    useEffect(() => {handleChange(inputs, setChartData)}, [inputs])

    return (
        <div>
            <Container pt={6}>
                <LineChart
                    title="Savings Over time"
                    xAxisData={chartData.xAxis}
                    yAxisData={chartData.yAxis}
                    xLabel="Years"
                    yLabel="Amount" />
            </Container>
        
            <Container pt={5}>

            <Container pt={5}>
                    <h2>Initial Amount</h2>
                <NumberInput 
                allowMouseWheel 
                step={10} 
                defaultValue={200}
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
                defaultValue={200} 
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
                <MySlider max={50} onChange={(e:number) => {setInputs({ ...inputs, interest_rate: e })}}/>
                </Container>
            </Container>    
            </div>
    )
}

export default SavingsCalculator
