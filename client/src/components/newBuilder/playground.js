import React,{useState,useEffect} from 'react'
import Draggable from 'react-draggable';
import styled from 'styled-components'
// const {ReactDraggable: Draggable, ReactDOM} = window;

const Container = styled.div`
    .cursor-x{
        cursor: ew-resize;
    }
    .cursor-y{
        cursor: ns-resize;
    }
    .react-draggable{
        cursor: move;
    }
    .no-cursor{
        cursor: auto;
    }
`
const Box = styled.div`
    background: #fff;
    border: 1px solid #999;
    border-radius: 3px;
    width: 180px;
    height: 180px;
    margin: 10px;
    padding: 10px;
    float: left;
`

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


const Builder = () => {
    const [activeDrags,setActiveDrags] = useState(0)
    const [deltaPosition,setDeltaPosition] = useState({x:0,y:0})
    const [controlledPosition,setControlledPosition] = useState({x:-400,y:200})

    const handleDrag = (e, ui) => {
        const {x, y} = deltaPosition;
        setDeltaPosition({x:x+ui.deltaX,y:y+ui.deltaY})
    };

    const onStart = () => {
        setActiveDrags(activeDrags+1)
    }
    
    const onStop = () => {
        setActiveDrags(activeDrags-1)
    }

    const adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = controlledPosition;
        setControlledPosition({x: x - 10, y});
    };

    const adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = controlledPosition;
        setControlledPosition({x, y:y-10});
    };

    const onControlledDrag = (e, position) => {
        const {x, y} = position;
        setControlledPosition({x,y})
    };
    
    const onControlledDragStop = (e, position) => {
        onControlledDrag(e, position);
        onStop();
    };

    const dragHandlers = {onStart: onStart, onStop:onStop};
    
    return (
    <div>
        <h1>React Draggable</h1>
        <p>Active DragHandlers: {activeDrags}</p>
        <p>
          <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">Demo Source</a>
        </p>
        <Draggable {...dragHandlers}>
          <Box>I can be dragged anywhere</Box>
        </Draggable>
        <Draggable axis="x" {...dragHandlers}>
          <Box className="box cursor-x">I can only be dragged horizonally (x axis)</Box>
        </Draggable>
        <Draggable axis="y" {...dragHandlers}>
          <Box className="box cursor-y">I can only be dragged vertically (y axis)</Box>
        </Draggable>
        <Draggable onStart={() => false}>
          <Box>I don't want to be dragged</Box>
        </Draggable>
        <Draggable onDrag={handleDrag} {...dragHandlers}>
          <Box>
            <div>I track my deltas</div>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </Box>
        </Draggable>
        <Draggable handle="strong" {...dragHandlers}>
          <Box className="box no-cursor">
            <strong className="cursor"><div>Drag here</div></strong>
            <div>You must click my handle to drag me</div>
          </Box>
        </Draggable>
        <Draggable handle="strong">
          <Box className="box no-cursor" style={{display: 'flex', flexDirection: 'column'}}>
            <strong className="cursor"><div>Drag here</div></strong>
            <div style={{overflow: 'scroll'}}>
              <div style={{background: 'yellow', whiteSpace: 'pre-wrap'}}>
                I have long scrollable content with a handle
                {'\n' + Array(40).fill('x').join('\n')}
              </div>
            </div>
          </Box>
        </Draggable>
        <Draggable cancel="strong" {...dragHandlers}>
          <Box>
            <strong className="no-cursor">Can't drag here</strong>
            <div>Dragging here works</div>
          </Box>
        </Draggable>
        <Draggable grid={[25, 25]} {...dragHandlers}>
          <Box>I snap to a 25 x 25 grid</Box>
        </Draggable>
        <Draggable grid={[50, 50]} {...dragHandlers}>
          <Box>I snap to a 50 x 50 grid</Box>
        </Draggable>
        <Draggable bounds={{top: -100, left: -100, right: 100, bottom: 100}} {...dragHandlers}>
          <Box>I can only be moved 100px in any direction.</Box>
        </Draggable>
        <Box style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
          <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
            <Draggable bounds="parent" {...dragHandlers}>
              <Box>
                I can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </Box>
            </Draggable>
            <Draggable bounds="parent" {...dragHandlers}>
              <Box>
                I also can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </Box>
            </Draggable>
          </div>
        </Box>
        <Draggable bounds="body" {...dragHandlers}>
          <Box>
            I can only be moved within the confines of the body element.
          </Box>
        </Draggable>
        <Draggable {...dragHandlers}>
          <Box style={{position: 'absolute', bottom: '100px', right: '100px'}}>
            I already have an absolute position.
          </Box>
        </Draggable>
        <Draggable {...dragHandlers}>
          <RemWrapper>
            <Box className="box rem-position-fix" style={{position: 'absolute', bottom: '6.25rem', right: '18rem'}}>
              I use <span style={{ fontWeight: 700 }}>rem</span> instead of <span style={{ fontWeight: 700 }}>px</span> for my transforms. I also have absolute positioning.

              <br /><br />
              I depend on a CSS hack to avoid double absolute positioning.
            </Box>
          </RemWrapper>
        </Draggable>
        <Draggable defaultPosition={{x: 25, y: 25}} {...dragHandlers}>
          <Box>
            {"I have a default position of {x: 25, y: 25}, so I'm slightly offset."}
          </Box>
        </Draggable>
        <Draggable positionOffset={{x: '-10%', y: '-10%'}} {...dragHandlers}>
          <Box>
            {'I have a default position based on percents {x: \'-10%\', y: \'-10%\'}, so I\'m slightly offset.'}
          </Box>
        </Draggable>
        <Draggable position={controlledPosition} {...dragHandlers} onDrag={onControlledDrag}>
          <Box>
            My position can be changed programmatically. <br />
            I have a drag handler to sync state.
            <div>
              <a href="#" onClick={adjustXPos}>Adjust x ({controlledPosition.x})</a>
            </div>
            <div>
              <a href="#" onClick={adjustYPos}>Adjust y ({controlledPosition.y})</a>
            </div>
          </Box>
        </Draggable>
        <Draggable position={controlledPosition} {...dragHandlers} onStop={onControlledDragStop}>
          <Box>
            My position can be changed programmatically. <br />
            I have a dragStop handler to sync state.
            <div>
              <a href="#" onClick={adjustXPos}>Adjust x ({controlledPosition.x})</a>
            </div>
            <div>
              <a href="#" onClick={adjustYPos}>Adjust y ({controlledPosition.y})</a>
            </div>
          </Box>
        </Draggable>

      </div>
    )
}

export default Builder;