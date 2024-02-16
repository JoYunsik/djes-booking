import {handleActions} from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';
import { getEvents,postEvents,deleteEvents,removeEvents,clearAllEvents } from '../lib/api';
let id = 1;
const INITIATE = 'events/INITIATE';
const INSERT = 'events/INSERT';
const REMOVE = 'events/REMOVE';
const REMOVEDEFAULT = 'events/REMOVEDEFAULT';
const CLEAREVENTS ='events/CLEAREVENTS';

export const initiateEvents =createRequestThunk(INITIATE, getEvents);

export const insert = (event) => async dispatch => {
  try{
    const response = await postEvents({...event,id:id++})
    dispatch({
      type: INSERT,
      payload: response.data
    })
  } catch(error){
    console.log(error);
    throw error;
  }
}

export const remove = createRequestThunk(REMOVE, deleteEvents);
export const removeDefault = (removeEvent) => async dispatch => {
  try{
    await removeEvents(removeEvent)
    dispatch({
      type: REMOVEDEFAULT,
      payload: removeEvent
    })
  } catch(error){
    console.log(error);
    throw error;
  }
}

export const clearEvents = (clearEvent) => async dispatch =>{
  try{
    await clearAllEvents(clearEvent)
    dispatch({
      type: CLEAREVENTS,
      payload: clearEvent
    })
  } catch(error){
    console.log(error);
    throw error;
  }
}

const initialState = [];
const events = handleActions({
    [INITIATE]: (state,action)=>{
      id = action.payload.length === 0? 1 : action.payload[action.payload.length-1].id + 1 ;
      return action.payload
    },
    [INSERT]: (state,action)=>(state.concat(action.payload)),
    [REMOVE]: (state,action)=>(state.filter(event=> event.id !== action.payload)),
    [REMOVEDEFAULT]: (state,action)=>(state.filter(event=>
            event.date !== action.payload.date ||
            event.month !== action.payload.month ||
            event.year !== action.payload.year ||
            event.time !== action.payload.time ||
            event.room !== action.payload.room ||
            event.event !== action.payload.event ||
            event.defaultevent !== action.payload.defaultevent
        )),
    [CLEAREVENTS]: (state,action)=>(state.filter(event=>
            event.date !== action.payload.date ||
            event.month !== action.payload.month ||
            event.year !== action.payload.year ||
            event.time !== action.payload.time ||
            event.room !== action.payload.room ||
            event.defaultevent !== false
        ))
}, initialState);

export default events;
