// state in redux
//
// nextId : number
//  - 다음 id
// words : [ {
//              word: string,
//              desc: string,
//              example: string,
//              id: number,
//              docId: string,
//              createdAt: Date,
//              updatedAt: Date
//          } ]
//  - 단어 리스트

// state in firestroe
//
// dbdict : collection
// docs: {
//          ( docid : random string, )
//          word: string,
//          desc: string,
//          example: string,
//          id: number,
//          createdAt: timestamp,
//          updatedAt: timestamp
//       }

import firebase from "firebase/app";
import { firestore } from "../../../firebase/firebase";

const CARD_COUNT = 4;

// action types
const LOAD = "dict/LOAD";
const ADD = "dict/ADD";
const EDIT = "dict/EDIT";
const REMOVE = "dict/REMOVE";
const LOADED = "dict/IS_LOADED";
const INCREASE_WORD_COUNT = "dict/INCREASE_WORD_COUNT";
const RESET_WORD_COUNT = "dict/RESET_WORD_COUNT";

// action creator
const loadWord = (data) => {
  return { type: LOAD, data };
};

export const addWord = (data) => {
  return { type: ADD, data };
};

export const editWord = (data) => {
  return { type: EDIT, data };
};

export const removeWord = (docId) => {
  return { type: REMOVE, docId };
};

export const updateIsLoaded = (bool) => {
  return { type: LOADED, bool };
};

export const increaseWordCount = () => {
  return { type: INCREASE_WORD_COUNT };
};

export const resetWordCount = () => {
  return { type: RESET_WORD_COUNT };
};

// action creator returning function for db with async(thunk)
const db = firestore.collection("dbdict");

export const loadWordDB = () => (dispatch) => {
  const words = [];
  db.get().then((docs) => {
    docs.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const createdAt = data.createdAt.toDate();
        const updatedAt = data.updatedAt.toDate();
        words.push({ ...data, docId: doc.id, createdAt, updatedAt });
      }
    });
    words.sort((a, b) => b.updatedAt - a.updatedAt);
    dispatch(loadWord(words));
    dispatch(resetWordCount());
    dispatch(updateIsLoaded(true));
  });
};

export const addWordDB = (data) => (dispatch, getState) => {
  dispatch(updateIsLoaded(false));
  const id = getState().dict.nextId;
  const nowDate = new Date();
  const nowTimeStamp = firebase.firestore.Timestamp.fromDate(nowDate);
  db.add({
    id,
    ...data,
    createdAt: nowTimeStamp,
    updatedAt: nowTimeStamp,
  }).then((doc) => {
    const newData = {
      ...data,
      id,
      docId: doc.id,
      createdAt: nowDate,
      updatedAt: nowDate,
    };
    dispatch(addWord(newData));
    dispatch(updateIsLoaded(true));
  });
};

export const editWordDB = (data) => (dispatch) => {
  dispatch(updateIsLoaded(false));
  const { id, word, desc, docId, example, createdAt } = data;
  const nowDate = new Date();
  const nowTimeStamp = firebase.firestore.Timestamp.fromDate(nowDate);
  const createdAtTimeStamp = firebase.firestore.Timestamp.fromDate(createdAt);
  db.doc(docId)
    .update({
      id,
      word,
      desc,
      example,
      createdAt: createdAtTimeStamp,
      updatedAt: nowTimeStamp,
    })
    .then(() => {
      dispatch(editWord({ ...data, updatedAt: nowDate }));
      dispatch(updateIsLoaded(true));
    });
};

export const removeWordDB = (docId) => (dispatch) => {
  dispatch(updateIsLoaded(false));
  db.doc(docId)
    .delete()
    .then(() => {
      dispatch(removeWord(docId));
      dispatch(updateIsLoaded(true));
    });
};

const initialState = {
  nextId: 1,
  isLoaded: false,
  wordCount: CARD_COUNT,
  words: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      if (action.data) {
        return {
          isLoaded: true,
          nextId: action.data.reduce((a, c) => (c.id > a ? c.id : a), 0) + 1,
          words: action.data,
        };
      }
      return state;

    case ADD:
      return {
        nextId: state.nextId + 1,
        words: [action.data, ...state.words],
        wordCount: state.wordCount + 1,
      };

    case EDIT:
      const words = [...state.words];
      const idx = words.findIndex((w) => w.id === action.data.id);
      words[idx] = action.data;
      words.sort((a, b) => b.updatedAt - a.updatedAt);
      return { ...state, words: words };

    case REMOVE:
      return {
        ...state,
        words: state.words.filter((w) => w.docId !== action.docId),
        wordCount: state.wordCount - 1,
      };

    case LOADED:
      return { ...state, isLoaded: action.bool };

    case INCREASE_WORD_COUNT:
      const count = Math.min(state.words.length, state.wordCount + CARD_COUNT);
      return { ...state, wordCount: count };

    case RESET_WORD_COUNT:
      return { ...state, wordCount: CARD_COUNT };

    default:
      return state;
  }
};

export default reducer;
