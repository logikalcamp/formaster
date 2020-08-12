import React from 'react'



const Main = ({arr,setArr}) => {
    
    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>ערך אמיתי</th>
                        <th>ערך לתצוגה</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((x,i)=>{
                        return (
                            <tr>
                                <td><input type="text" value={x.value} onChange={(e)=>{
                                    let d = [...arr]
                                    d[i].value = e.target.value
                                    setArr(d)
                                }} /></td>
                                <td>
                                    <input type="text"
                                    value={x.label}
                                    onChange={(e)=>{
                                        let d = [...arr]
                                        d[i].label = e.target.value
                                        setArr(d)
                                    }}
                                    />
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        let d = [...arr]
                                        d.splice(i,1)
                                        setArr(d)
                                    }}>
                                        מחק 
                                    </button>
                                </td>
                            </tr>
                        )   
                    })}
                </tbody>
            </table>
            <button onClick={()=>{
                let d = [...arr]
                d.push({value:'',label:''})
                setArr(d)
            }}>
                הוספת שורה
            </button>
        </React.Fragment>
    )
}

export default Main;