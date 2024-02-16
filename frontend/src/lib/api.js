import Axios from 'axios';

const url = process.env.REACT_APP_API_HOST
export const getEvents = ()=>{
    return Axios.get(`${url}/events/`);
};
export const postEvents = (event)=>{
    return Axios.post(`${url}/events/`, event);
};
export const deleteEvents = (id)=>{
    return Axios.delete(`${url}/events/${id}/`)
};
export const removeEvents = (removeEvent)=>{
    return Axios.delete(`${url}/events/remove_default/`,{data:removeEvent})
};
export const clearAllEvents = (clearEvent)=>{
    return Axios.delete(`${url}/events/clear_events/`,{data:clearEvent})
};
export const getRooms = ()=>{
    return Axios.get(`${url}/rooms/`);
};
export const postRooms = (room,max,id)=>{
    return Axios.post(`${url}/rooms/`,{id, max, room});
};
export const deleteRooms = (id)=>{
    return Axios.delete(`${url}/rooms/${id}/`)
};
