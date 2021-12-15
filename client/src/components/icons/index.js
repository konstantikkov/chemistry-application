import './index.css'

import arrow from './arrow.svg'
import checkmark from './checkmark.svg'
import recycle from './recycle.svg'
import cross from './cross.svg'

const ICON_DICTIONARY = {
    arrow: arrow,
    checkmark: checkmark,
    recycle: recycle,
    cross: cross
}

export const IconLoader = ({icon, size='sm'}) => {
    return <img className={`Icon${size}`} src={ICON_DICTIONARY[icon]}/>
}