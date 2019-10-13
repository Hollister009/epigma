// @flow
import React, { useState, useEffect, useRef } from "react"

import produce from "immer"
import uuidv1 from "uuid/v1"

import SelectedShapes from "./SelectedShapes"
import CanvasTransform from "../CanvasTransform"
import ShapeCreate from "../Shape/ShapeCreate"
import ShapeEdit from "../Shape/ShapeEdit"
import ShapeView from "../Shape/ShapeView"

import BEM from "../../utils/BEM"
import "./Canvas.scss"
import { useDispatch } from "react-redux"
const b = BEM("Canvas")

const Canvas = ({
  allShapes,
  viewedShapes,
  editedShape,
  selectedShapes,
  isCreateMode,

  changeMode,
  setEditedShape,
  setShapes,
  selectShape
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const rootEl = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setOffset({ x: 0, y: rootEl.current.getBoundingClientRect().top })
  }, [rootEl])

  return (
    <CanvasTransform>
      <svg className={b()} ref={rootEl}>
        {viewedShapes.map(shape => (
          <ShapeView
            style={shape.style}
            key={shape.id}
            onSelect={() => dispatch(selectShape(shape.id))}
            offset={offset}
            path={shape}
          />
        ))}

        <SelectedShapes offset={offset} shapes={selectedShapes} />

        {editedShape && (
          <ShapeEdit
            key={editedShape.id}
            offset={offset}
            style={editedShape.style}
            path={editedShape}
            onChange={editedShape => {
              dispatch(
                setShapes(
                  produce(allShapes, draft => {
                    const index = draft.findIndex(
                      ({ id }) => editedShape.id === id
                    )
                    draft[index] = editedShape
                  })
                )
              )
              dispatch(setEditedShape(null))
            }}
          />
        )}

        {isCreateMode && (
          <ShapeCreate
            offset={offset}
            onChange={newShape => {
              if (newShape.points && newShape.points.length > 1) {
                const id = uuidv1()
                newShape.id = id //TODO: fix it!
                dispatch(setShapes([...allShapes, newShape]))
                dispatch(selectShape(id))
              }

              dispatch(changeMode("VIEW"))
            }}
          />
        )}
      </svg>
    </CanvasTransform>
  )
}

export default Canvas
