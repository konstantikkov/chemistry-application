import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {GridWrapper} from "../../components/grid-wrapper";
import {GridCell} from "../../components/grid-wrapper/grid-cell";
import {Block} from "../../components/block";
import {Button} from "../../components/button";
import {StatusTitle} from "../../components/status-title";
import {getAnswer, getClientName, getGameEnd, getLevel, getStatistic, getStatus} from "../../__data__/selectors";
import {Title} from "../../components/title";
import {FlexWrapper} from "../../components/flex-wrapper";
import {ImageLoader} from "../../components/image-loader";
import {getImage} from "../../assets";
import {fetchGameEnd, setStage} from "../../__data__/actions";

const style = {
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '20% 35% 15% 15% 15%'
}

export const StatusScreen = ({ score, prev, setFlag }) => {
    const dispatch = useDispatch()
    const status = useSelector(getStatus)
    const statistic = useSelector(getStatistic)
    const clientName = useSelector(getClientName)
    const gameEnd = useSelector(getGameEnd)

    const level = useSelector(getLevel)
    const answer = useSelector(getAnswer)

    const newLevel = () => {
        setFlag(false)
        setTimeout(()=>{
            prev()
        }, 1000)
    }

    const restartLevel = () => {
        setFlag(false)
        dispatch(fetchGameEnd())
        setTimeout(()=>{
            dispatch(setStage(1))
        }, 1000)
    }


    return(
        <GridWrapper style={style}>
            <GridCell style={{gridColumnStart: 1, gridColumnEnd: 3}}>
                <Block isFlex>
                    <StatusTitle title={status === 'error'? 'Этап провален':'Этап пройден!'} level={status === 'error'? 'error':'success'}/>
                </Block>
            </GridCell>
            <GridCell style={{gridRowStart: 2, gridRowEnd: 5}}>
                <Block title={`Статистика. ${clientName}`}>
                    <FlexWrapper>
                        <Title size='lg' value='Ваш суммарный счет'/><Title size='lg' value={statistic.score}/>
                    </FlexWrapper>
                    <FlexWrapper>
                        <Title size='lg' level='Success' value='Успешных этапов'/><Title level='Success' size='lg' value={statistic.success}/>
                    </FlexWrapper>
                    <FlexWrapper>
                        <Title size='lg' level='Error' value='Проваленных этапов'/><Title level='Error' size='lg' value={statistic.error}/>
                    </FlexWrapper>
                    <FlexWrapper direction='Vertical'>
                        <Title size='giga' value={statistic.last} level={statistic.last>0? 'Success': 'Error'}/>
                        <Title size='lg' value='На этом этапе вы получили'/>
                    </FlexWrapper>
                </Block>
            </GridCell>
            <GridCell style={{ gridRowStart: 2, gridRowEnd: 4 }}>
                <Block
                    title={status==='error'?'Не отчаивайся!': 'Отлично!'}
                    description={status==='error'?`Открой учебник на странице... ${clientName}, да ты итак все знаешь. Попробуй еще раз. Это случайность.`:`Хорошая работа, ${clientName}. Решишь еще пару примеров?`}>
                    <FlexWrapper direction='Vertical'>
                        <ImageLoader style={{width: '130px'}} image={getImage('kurisu_finger')}/>
                    </FlexWrapper>
                </Block>
            </GridCell>
            <GridCell style={{ gridRowStart: 4, gridRowEnd: 5 }}>
                <Block isFlex={true} >
                    <FlexWrapper direction='Center'>
                        <Title value='Ответ:' size='lg'/>
                        {
                            level.success.map(
                                (item, key) => <Title size='lg' value={String(level.components[item].title) + ((key === level.success.length - 1) ? ' ' : ' +')}/>)
                        }
                    </FlexWrapper>
                </Block>
            </GridCell>
            <GridCell style={{ gridRowStart: 5, gridRowEnd: 6,  gridColumnStart: 2, gridColumnEnd: 3 }}>
                <Block isFlex={true} >
                    <FlexWrapper direction='Center'>
                        <Title value='Ваш ответ:' size='lg'/>
                        {
                            Object.entries(answer).map(
                                (item, key) =>
                                    <Title
                                        size = 'lg'
                                        level = {`${
                                            level.success.find((successItem) => successItem===Number(item[0])) ? 'Success' : 'Error'
                                        }`}
                                        value={item[1].title + ((key ===  Object.keys(answer).length - 1) ? '' : ' +')}
                                    />)
                        }
                    </FlexWrapper>
                </Block>
            </GridCell>
            {
                !gameEnd?
                    <Button title="Следующий этап" handler={newLevel}/>
                    :
                    <Button title='В меню' handler={restartLevel}/>
            }
        </GridWrapper>
    )
}

//
//`${()=>{
//                                             const item_ = level.success.find((successItem)=>successItem===item[0])
//
//                                         }}`
//

// {`${()=>{
//     const item_ =level.success.find((successItem)=>successItem===item[0])
//     console.log(item_, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
//     return level.success.find((successItem)=>successItem===item[0])?'Success': 'Error'
// }}`}