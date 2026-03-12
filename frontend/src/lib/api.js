import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const getEvents = async () => {
    const pageSize = 1000;
    let from = 0;
    let allData = [];
    while (true) {
        const { data, error } = await supabase.from('events').select('*').range(from, from + pageSize - 1);
        if (error) throw error;
        allData = allData.concat(data);
        if (data.length < pageSize) break;
        from += pageSize;
    }
    return { data: allData };
};
export const postEvents = async (event) => {
    const { id, ...eventWithoutId } = event;
    const { data, error } = await supabase.from('events').insert(eventWithoutId).select().single();
    if (error) throw error;
    return { data };
};
export const deleteEvents = async (id) => {
    const { error } = await supabase.from('events').delete().eq('id', Number(id));
    if (error) throw error;
    return { data: id };
};
export const removeEvents = async ({ date, year, month, time, room, event, defaultevent }) => {
    const { error } = await supabase.from('events').delete()
        .eq('date', date).eq('year', year).eq('month', month)
        .eq('time', time).eq('room', room).eq('event', event)
        .eq('defaultevent', defaultevent);
    if (error) throw error;
};
export const clearAllEvents = async ({ date, year, month, time, room }) => {
    const { error } = await supabase.from('events').delete()
        .eq('date', date).eq('year', year).eq('month', month)
        .eq('time', time).eq('room', room).eq('defaultevent', false);
    if (error) throw error;
};
export const postEventsBulk = async (events) => {
    const eventsWithoutId = events.map(({ id, ...e }) => e);
    const { data, error } = await supabase.from('events').insert(eventsWithoutId).select();
    if (error) throw error;
    return { data };
};
export const removeEventsBulk = async ({ time, room, event, dates }) => {
    for (const { date, month, year } of dates) {
        const { error } = await supabase.from('events').delete()
            .eq('date', date).eq('month', month).eq('year', year)
            .eq('time', time).eq('room', room).eq('event', event).eq('defaultevent', true);
        if (error) throw error;
    }
};
export const clearAllEventsBulk = async ({ time, room, dates }) => {
    // dates: [{date, month, year}, ...] 배열로 해당 날짜들만 삭제
    for (const { date, month, year } of dates) {
        const { error } = await supabase.from('events').delete()
            .eq('date', date).eq('month', month).eq('year', year)
            .eq('time', time).eq('room', room).eq('defaultevent', false);
        if (error) throw error;
    }
};
export const getRooms = async () => {
    const { data, error } = await supabase.from('rooms').select('*');
    if (error) throw error;
    return { data };
};
export const postRooms = async (room, max, id) => {
    const { data, error } = await supabase.from('rooms').insert({ id, max, room }).select().single();
    if (error) throw error;
    return { data };
};
export const deleteRooms = async (id) => {
    const { error } = await supabase.from('rooms').delete().eq('id', id);
    if (error) throw error;
    return { data: id };
};
