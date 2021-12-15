const levels = [
    {
        components:{
            1: {
                title: 'Ca(OH)2',
                type: 'solid',
                properties:{
                    color: 0xD1ED58,
                    opacity: 1
                }
            },
            2: {
                title: 'HNO3',
                type: 'liquid',
                properties:{
                    color: 0x87EAED,
                    opacity: 0.4
                }
            },
            3: {
                title: 'H2SO4',
                type: 'liquid',
                properties:{
                    color: 0xB758ED,
                    opacity: 0.5
                }
            },
            4: {
                title: 'Ca',
                type: 'solid',
                properties:{
                    color: 0xED9964,
                    opacity: 1
                }
            },
        },
        task: {
            title:'Что необходимо смешать, чтобы получить: ',
            items:['CaSO4 +', 'H2O']
        },
        pointsSuccess: 50,
        pointsFail: -25,
        success:[1,3],
        errors:[[2,3]]
    },
    {
        components:{
            1: {
                title: 'Zn',
                type: 'solid',
                properties:{
                    color: 0xD1ED58,
                    opacity: 1
                }
            },
            2: {
                title: 'HCl',
                type: 'liquid',
                properties:{
                    color: 0x87EAED,
                    opacity: 0.4
                }
            },
            3: {
                title: 'Cl',
                type: 'liquid',
                properties:{
                    color: 0xB758ED,
                    opacity: 0.5
                }
            },
            4: {
                title: 'ZnCl',
                type: 'solid',
                properties:{
                    color: 0xED9964,
                    opacity: 1
                }
            },
        },
        task: {
            title:'Что необходимо смешать, чтобы получить: ',
            items:['ZnCl2 +', 'H2']
        },
        pointsSuccess: 50,
        pointsFail: -25,
        success:[1, 2],
        errors:[[2, 3]]
    },
    {
        components:{
            1: {
                title: 'Fe',
                type: 'solid',
                properties:{
                    color: 0xD1ED58,
                    opacity: 1
                }
            },
            3: {
                title: 'FeCl',
                type: 'liquid',
                properties:{
                    color: 0xB758ED,
                    opacity: 0.5
                }
            },
            4: {
                title: 'CuSO3',
                type: 'solid',
                properties:{
                    color: 0xED9964,
                    opacity: 1
                }
            },
            5: {
                title: 'Zn',
                type: 'solid',
                properties:{
                    color: 0x87EAED,
                    opacity: 0.4
                }
            },
            7: {
                title: 'CuSO4',
                type: 'solid',
                properties:{
                    color: 0x87EAED,
                    opacity: 0.4
                }
            }
        },
        task: {
            title:'Что необходимо смешать, чтобы получить: ',
            items:['FeSO4 +', 'Cu']
        },
        pointsSuccess: 50,
        pointsFail: -25,
        success:[1,7],
        errors:[]
    },
    {
        components:{
            1: {
                title: 'Na2O',
                type: 'solid',
                properties:{
                    color: 0xFFED58,
                    opacity: 1
                }
            },
            2: {
                title: 'H20',
                type: 'liquid',
                properties:{
                    color: 0xD1EDFF,
                    opacity: 0.1
                }
            },
            3: {
                title: 'HNO3',
                type: 'liquid',
                properties:{
                    color: 0xD1FF58,
                    opacity: 0.4
                }
            },
            4: {
                title: 'H2SO4',
                type: 'liquid',
                properties:{
                    color: 0xFFFFFF,
                    opacity: 0.2
                }
            }
        },
        task: {
            title:'Что необходимо смешать, чтобы получить: ',
            items:['NaOH']
        },
        pointsSuccess: 50,
        pointsFail: -25,
        success:[1,2],
        errors:[]
    },
    {
        components:{
            1: {
                title: 'Al4C3',
                type: 'solid',
                properties:{
                    color: 0xFFFFFF,
                    opacity: 1
                }
            },
            2: {
                title: 'H20',
                type: 'liquid',
                properties:{
                    color: 0xD1EDFF,
                    opacity: 0.1
                }
            },
            3: {
                title: 'Al(NO3)2',
                type: 'solid',
                properties:{
                    color: 0xFFFFFF,
                    opacity: 1
                }
            },
            4: {
                title: 'H3PO4',
                type: 'liquid',
                properties:{
                    color: 0xFF00FF,
                    opacity: 0.3
                }
            }
        },
        task: {
            title:'Что необходимо смешать, чтобы получить: ',
            items:['Al(OH)3 +', 'CH4']
        },
        pointsSuccess: 50,
        pointsFail: -25,
        success:[1,2],
        errors:[]
    }
]

export const nextLevel = (prev) => {
    let level = prev
    while(level === prev){
        level = Math.floor(Math.random() * 100) % levels.length
    }
    return {level: levels[level], level_num: level}
}