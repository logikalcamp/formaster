import React from 'react'
import {atom} from 'recoil'

export const ConnectionDetailsAtom = atom({
    key:'dbConfig',
    default:{
        service:1,
        server:'root:A260196r.@routeplan-d416l.gcp.mongodb.net/',
        db:'formastr',
        table:'answers'
    }
})

export const ComponentsAtom = atom({
    key:'asfkanslfnaslfjasflaoms',
    default:[
        {
            text:"comp 1",
            dimensions:{
                width:200,
                height:50
            },
            position:{
                x:0,
                y:0
            }
        }
    ]
})




let fullState = {
    dataBaseConnection:{
        service:'',
        server:'',
        db:'',
        table:'' // alternative name to collection
    },
    components:[

    ]
}