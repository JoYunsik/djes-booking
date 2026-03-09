import { Select,ConfigProvider } from 'antd';

const RoomSelect = ({ rooms, currRoom, select }) => {
    const handleChange = (value) => {
        select(value);
    };
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                    borderRadius: 4,
                    colorBgContainer: '#FCFEFC',
                    fontSize: 24,        
                },
            }}
        >
            <Select
                defaultValue={rooms.length > 0 ? rooms[0].id : undefined}
                style={{
                    width: 160,
                    height: 52,
                }}
                onChange={handleChange}
                options={
                    rooms.map((room) => ({
                        value: room.id,
                        label: room.room,
                    }))
                }
            />
        </ConfigProvider>
    );
}

export default RoomSelect;

