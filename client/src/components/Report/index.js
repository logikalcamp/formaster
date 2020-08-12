import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import {getAnswers, getForms} from '../../api'
import moment from 'moment'
import Loader from './Loader'

const Container = styled.div`
    width:100%;
    z-index:1;
    height:100vh;
    background:#eaeaea;
    direction:rtl;
    position:fixed;
    top:0;
    h1{
        width:100%;
        text-align:center;
        background:#6098ff;
        margin:0;
        color:white;
        padding:1rem 0;
    }
`

const Table = styled.table`
    width:80%;
    margin:2rem auto;
    border:1px solid #828282;
    thead{
        tr{
            th{
                border-bottom:1px solid #828282;
            }
        }
    }
    tr{
        th,td{
            text-align:right;
            padding:1rem;
        }
    }

    .zugi{
        background:#e2e1e1;
    }
    .izugi{
        background:#f5f5f5;
    }
`

const ignoreTypes = ['title','description','break_line']

const Main = ({match}) => {
    const [form,setForm] = useState({})
    const [loader,setLoader] = useState(true)
    const [answers,setAns] = useState([])
    const [order,setOrder] = useState([])
    useEffect(() => {
        async function getAns(){
            let z = await getForms({formID:match.params.id})
            await console.log(z)
            await setForm(z.data[0])
            await setLoader(false)
            let arr = await []
            await z.data[0].stracture.map((q,i)=>{
                if(!ignoreTypes.includes(q.type)){
                    if(q.keys){
                        arr.push(q.keys)
                    }else{
                        arr.push(i)
                    }
                }
            })
            await arr.push('pn')
            await arr.push('timestamp')
            await console.log(arr)
            await setOrder(arr)


            let d = await getAnswers({formID:match.params.id})
            await console.log(d)
            await setAns(d.data)
        }
        getAns()
    }, [])

    return (
        <Fragment>
            {
                loader ? 
                <Loader/>
                :
                <Container>
                    <h1>
                        תשובות
                        {
                            form.stracture.map((x)=>{
                                if(x.type == 'title'){
                                    return ` עבור "${x.value}"`
                                }
                            })
                        }
                    </h1>
                    <Table cellSpacing={0}>
                        <thead>
                            <tr>
                            {
                                form.stracture.map((x)=>{
                                    if(!ignoreTypes.includes(x.type)){
                                        return (
                                            <th>
                                                {x.label}
                                            </th>
                                        )
                                    }
                                })
                            }
                                <th>מספר אישי</th>
                                <th>מועד רישום</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.map((z,j)=>{
                                return (
                                    <tr className={j%2 == 0 ? "zugi":"izugi" }>
                                        {
                                            order.map((w)=>{
                                                let label = ''
                                                if(w == 'timestamp'){
                                                    label = moment(z[w]).format(' DD/MM/YYYY , HH:mm ')
                                                }
                                                form.stracture.map((x)=>{
                                                    if(x.keys == w){
                                                        console.log(x.type)
                                                        if(x.type == 'multiple'){
                                                            x.options.map((r)=>{
                                                                if(r.value == z[w]){
                                                                   label = r.label
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                                return (
                                                    <td>
                                                        { label != '' ? label : z[w]}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            }
        </Fragment>
    )
}

export default Main;