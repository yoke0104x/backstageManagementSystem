import { useState } from 'react';
import { Upload, Button, Icon ,Table,Modal} from 'antd';
import XLSX from 'xlsx';
const confirm = Modal.confirm;

function tabfrom(){
    const [colums,setColumns] = useState([])
    const [dataSource,setDataSource] = useState([])
    //导入excel
    function uploadExcel(info){
        console.log(info)
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            // 读出excel文件
            const wb = XLSX.read(bstr, {type:'binary'});
            // 读出第一张excel表
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            // 把第一张表的数据转化为json对象
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            console.log('webbooks...', wb, data);
            // 处理表头数据
            setColumns(data[0].map((item, index)=>{
              return {
                title: item,
                dataIndex: index,
                key: index
              }
            }))

                // 处理表格数据
            setDataSource(data.slice(1).map((item, index)=>{
                let obj = {key: index};
                item.forEach((val, key)=>{
                obj[key] = val;
                })
                return obj;
            }))
            };
            reader.readAsBinaryString(info.file.originFileObj);
    }
    //导出excel
    function exportExcel(){
        if (!dataSource.length){
            return;
          }
      
          console.log('dataSourece', dataSource, colums);
          let header = {};
          [...colums].forEach((item,index)=>{
            header[index] = item.title;
          })
          // 1.创建一个websheet
          let ws = XLSX.utils.json_to_sheet([header].concat(dataSource),
            {header: Object.keys(dataSource), skipHeader:true}
          );
          // 2.创建一个webbook
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws);
          // 3.写到本地
          confirm({
            title: '您确定要导出当前的表格吗?',
            content: 'Are you sure you want to export the current table?',
            okText: 'Yes/我确定(•‾̑⌣‾̑•)✧',
            okType: 'danger',
            cancelText: 'No/考虑一下ಥ_ಥ',
            onOk() {
              XLSX.writeFile(wb, 'out.xlsx');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    return (
        <div className="content">
            <h2 style={{marginTop: "10px" }}>表格操作</h2>
            <div className="el_conent">
            <Upload accept='.xlsx,.xls,.csv' onChange={info=>uploadExcel(info)}>
                <Button>
                    <Icon type="upload" /> 上传表格
                </Button>
            </Upload>
            <Table columns={colums} dataSource={dataSource}/>
            {dataSource.length?<Button onClick={()=>exportExcel()}><Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />导出表格</Button>:null}
            </div>
        </div>
    );
}
export default tabfrom