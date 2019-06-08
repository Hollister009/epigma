import produce from "immer"
import { createPoint } from "../utils/helper"
import { CREATE_DOCUMENT } from "../actions/actionTypes"

const defaultState = {
  "1": {
    id: "1",
    title: "star",
    author: "",
    contributors: [],
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    shapes: [
      {
        // this is a shape in a documents
        id: "1",
        points: [
          createPoint(139, 157.3333282470703),
          createPoint(424, 294.3333282470703),
          createPoint(433, 80.33332824707031),
          createPoint(136, 251.3333282470703),
          createPoint(568, 174.3333282470703),
          createPoint(131, 155.3333282470703)
        ],
        style: {
          color: "#232323"
        }
      },

      {
        // this is a shape in a documents
        id: "A",
        points: [
          createPoint(179, 257.3333282470703),
          createPoint(524, 394.3333282470703)
        ],
        style: {
          color: "#232323"
        }
      }
    ]
  },
  "2": {
    id: "2",
    title: "line",
    author: "",
    contributors: [],
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    shapes: [
      {
        // this is a shape in a documents
        id: "3",
        points: [
          createPoint(139, 107.3333282470703),
          createPoint(424, 294.3333282470703)
        ],
        style: {
          color: "#232323"
        }
      }
    ]
  }
}

export default (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_DOCUMENT:
        const newDocumentIndex = Object.keys(draft).length + 1
        return {
          ...draft,

          [String(newDocumentIndex)]: {
            id: newDocumentIndex,
            title: action.title,
            author: "",
            contributors: [],
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            shapes: []
          }
        }

      default:
        return draft
    }
  })

export const getAllExistingDocuments = state => Object.values(state)
export const getDocumentById = (id, state) => state[id]