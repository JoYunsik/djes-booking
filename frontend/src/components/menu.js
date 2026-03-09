import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  SettingOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const {Sider, Content} = Layout;
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('특별실 예약', '1', <FormOutlined />),
    getItem('Settings', 'sub1', <SettingOutlined />, [
      getItem('전담시간표 작성', '2'),
      getItem('특별실 추가/제거','3'),
      getItem('데이터 관리/삭제', '4'),
    ]),
  ];

const yellow = '#FEFFF0';
const blue = '#ECEEFD';
const red = '#FDEDEC';
const Menubar = ({setDefaultsetting})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);
    const [color, setColor] = useState(yellow);
    useEffect(()=>{
      const page = location.pathname;
      if (page === '/'){
        setDefaultsetting(false);
        setColor(yellow);
      } else if (page ==='/set-default/'){
        setDefaultsetting(true);
        setColor(blue);
      }else if (page ==='/settings/rooms/'){
        setColor(red);
      }else if (page ==='/settings/datatable/'){
        setColor(red);
      }
    },[location,color,setColor,setDefaultsetting])
    const onClick = (e) => {
        if(e.key==='1'){
          navigate('/');
        } else if(e.key==='2'){
          navigate('set-default/');
        }else if(e.key==='3'){
          navigate('settings/rooms/');
        } else if(e.key==='4'){
          navigate('settings/datatable/');
        }
      };

    return(
    <Layout
        style={{
            minHeight: '100vh',
            zIndex:'-1'
        }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} />
      </Sider>
      <Content style={{backgroundColor:color}}>
        <Outlet/>
      </Content>
    </Layout>
    
    )
};

export default Menubar;

