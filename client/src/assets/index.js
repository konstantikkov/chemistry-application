import kurisu_smile from './kurisu_smile.svg'
import kurisu_sad from './kurisu_sad.svg'
import kurisu_finger from './kurisu_finger.svg'

const IMAGE_DICTIONARY = {
    kurisu_sad,
    kurisu_smile,
    kurisu_finger
}

export const getImage = (name) => IMAGE_DICTIONARY[name]
