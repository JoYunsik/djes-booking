import {createAction, handleActions} from 'redux-actions';
import { deleteRooms, getRooms, postRooms } from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

const INSERT = 'rooms/INSERT';
const REMOVE = 'rooms/REMOVE';
const SELECT = 'rooms/SELECT';
const INITIATE = 'rooms/INITIATE';
let id = 1;

export const insert = (room,max) => async dispatch =>{
    try{
        const response = await postRooms(room,max,id);
        dispatch({
            type: INSERT,
            payload: response.data
        })
        id++;
    } catch(error){
        console.log(error);
        throw error;
    }
}
export const remove = createRequestThunk(REMOVE, deleteRooms);
export const select = createAction(SELECT, id=>id);
export const initiateRooms = createRequestThunk(INITIATE, getRooms);

const initialState = {currRoom:1, rooms:[{id:1, max:1, room:'..laoding'}]}

const rooms = handleActions({
    [INSERT]: (state,action)=>({...state, rooms: state.rooms.concat(action.payload)}),
    [REMOVE]: (state,action)=>({...state, rooms: state.rooms.filter(room=>room.id !== action.payload)}),
    [SELECT]: (state,action)=>({...state, currRoom: action.payload }),
    [INITIATE]: (state,action)=>{
        id = action.payload[action.payload.length-1].id + 1;
        return {...state, rooms: action.payload}
    },
}, initialState);

export default rooms;