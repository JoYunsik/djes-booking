import { Button } from "antd";

const DataTableHeader = ({selectedId,eventRemove}) =>{
    const handleOnClick =() =>{
        selectedId.map((key)=>eventRemove(key));
    }

    return(
        <div style={{display:'flex', justifyContent:'right',margin:'1rem'}}className='dataTableHeader'>
            <h1 style={{
                textAlign:'center',
                position:'absolute',
                left:'50%',
                transform: 'translate(-50%, -50%)',
            }}>
                데이터 조회 / 삭제
            </h1>
            <Button 
                type='primary' 
                size="large" 
                danger 
                style={{textAlign:'center', margin:'auto', marginRight:'1rem' }}
                onClick={handleOnClick}
            >
                삭제
            </Button>
        </div>

    )
}

export default DataTableHeader;