import React, {useCallback} from 'react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip} from '@chakra-ui/react'
 
type ChangeFunction = (value:number)=> void

function MySlider({onChange, max} : {onChange:ChangeFunction, max:number}){
    const [sliderValue, setSliderValue] = React.useState(5)
    const [showTooltip, setShowTooltip] = React.useState(false)

    return (
        <Slider
            id='slider'
            defaultValue={5}
            min={0}
            max={max}
            colorScheme='teal'
            onChangeEnd={useCallback((e) => {
                onChange(e)
                setSliderValue(e)},[])}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}       
            >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
                hasArrow={true}
                bg='teal.500'
                color='white'
                placement='top'
                isOpen={showTooltip}
                label={`${sliderValue}`}
            >
                <SliderThumb />
            </Tooltip>
        </Slider>
    )
}

export default MySlider


