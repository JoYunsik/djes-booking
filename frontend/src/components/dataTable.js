import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

const DataTable = ({events, rooms, onSetSelectedId})=>{
    const [, setSearchText] = useState('');
    const [, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    // data 검색 옵션
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
      record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    });
    
    // room id를 room name으로 변환
    const roomNameSelect = (roomId)=>{
        const found = rooms.find((room)=>room.id === roomId);
        return found ? found.room : roomId;
    }
    
    const columns = [
        {
          title: '연도',
          dataIndex: 'year',
          filters: [
            {text:'2024', value:'2024'},{text:'2025', value:'2025'},{text:'2026', value:'2026'},{text:'2027', value:'2027'},{text:'2028', value:'2028'},{text:'2029', value:'2029'},{text:'2030', value:'2030'},{text:'2031', value:'2031'},{text:'2032', value:'2032'},{text:'2033', value:'2033'}
          ],
          onFilter: (value, record) => String(record.year).startsWith(value),
          sorter: (a, b) => a.year - b.year,
        },
        {
          title: '월',
          dataIndex: 'month',
          filters: [
            {text:'1월', value:'1'},{text:'2월', value:'2'},{text:'3월', value:'3'},{text:'4월', value:'4'},{text:'5월', value:'5'},{text:'6월', value:'6'},{text:'7월', value:'7'},{text:'8월', value:'8'},{text:'9월', value:'9'},{text:'10월', value:'10'},{text:'11월', value:'11'},{text:'12월', value:'12'}
          ],
          onFilter: (value, record) => String(record.month).startsWith(value),
          sorter: (a, b) => a.month - b.month,
        },
        {
          title: '일',
          dataIndex: 'date',
          sorter: (a, b) => a.date - b.date,
        },
        {
          title: '교시',
          dataIndex: 'time',
        },
        {
            title: '예약명',
            dataIndex: 'event',
            key: 'event',
            ...getColumnSearchProps('event'),
          },
        {
          title: '전담실',
          dataIndex: 'room',
          filters: rooms.map((room)=>({text:room.room, value:room.room})),
          onFilter: (value, record) => record.room.startsWith(value),
        },
        {
          title: '전담',
          dataIndex: 'defaultevent',
          width:'10%',
          filters: [
            {text:'O',value:'O'},{text:'X',value:'X'}
          ],
          onFilter: (value, record) => record.defaultevent.startsWith(value),
        },
      ];
    // 교시를 문자열로 변환 (5교시는 2개로 분리)
    const getTimeLabel = (time) => {
        if (time === 4) return '5교시(12:20~13:00)';
        if (time === 5) return '5교시(13:00~13:40)';
        if (time === 6) return '6교시';
        return `${time + 1}교시`;
    };

    // events불러와서 data 만들고 역순으로 저장
    const data = events.map((event)=>({
        key:event.id,
        year: event.year,
        month: event.month+1,
        date: event.date,
        time: getTimeLabel(event.time),
        event:event.event,
        room: roomNameSelect(event.room),
        defaultevent: event.defaultevent? 'O' : 'X'
    }))
    const dataset = data.reverse();
    return(
        <Table
            rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows)=> {
                    onSetSelectedId(selectedRowKeys);
                },
            }}
            columns={columns}
            dataSource={dataset}
            size='middle'
            scroll={{ y: 400 }}
            style={{margin:'0 1rem'}}
        />
    )
}

export default DataTable