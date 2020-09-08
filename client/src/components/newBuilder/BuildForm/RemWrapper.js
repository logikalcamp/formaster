import React from 'react'

const RemWrapper = (props) => {
    const translateTransformToRem = (transform,remBaseline = 16)=>{
        const convertedValues = transform.replace('translate(', '').replace(')', '')
        .split(',')
        .map(px => px.replace('px', ''))
        .map(px => parseInt(px, 10) / remBaseline)
        .map(x => `${x}rem`)
        const [x, y] = convertedValues
        return `translate(${x},${y})`
    }
    const { children, remBaseline = 16, style } = props
    const child = React.Children.only(children)
    const editedStyle = {
        ...child.props.style,
        ...style,
        transform: translateTransformToRem(style.transform, remBaseline)
    }

    return  React.cloneElement(child, {
        ...child.props,
        ...props,
        style: editedStyle
     })
}

export default RemWrapper