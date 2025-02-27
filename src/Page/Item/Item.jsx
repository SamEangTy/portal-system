import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table,Popconfirm, Modal,Image ,InputNumber} from 'antd';
// import { createStyles } from 'antd-style';
import { Row, Col } from 'antd';
import axios from 'axios';
// const useStyle = createStyles(({ css, token }) => {
//   const { antCls } = token;
//   return {
//     customTable: css`
//       ${antCls}-table {
//         ${antCls}-table-container {
//           ${antCls}-table-body,
//           ${antCls}-table-content {
//             scrollbar-width: thin;
//             scrollbar-color: #eaeaea transparent;
//             scrollbar-gutter: stable;
//           }
//         }
//       }
//     `,
//   };
// });
  const Item = () => {
  const [Item, setItem] = useState([]);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pictureURL,setPictureURL] = useState([]);
  useEffect(() => {
    const username = "Admin";
    const password = "h2qGeJ0AalVZJwQJDPQ27rbBeEItrQAPTGUl4X+JJ+o=";
    const authToken = btoa(`${username}:${password}`); // Base64 encoding for Basic Auth

    axios
      .get(
        "http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items",
        {
          headers: {
            Authorization: `Basic ${authToken}`,
          },
        }
      )
      .then((response) => {
        const updatedItems = response.data.value.map((item) => ({
          ...item,
          itemPicture: `http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items(${item.id})/picture/pictureContent`,
        }));
        setItem(updatedItems);
        console.log(updatedItems);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const HandleEdit = () =>{
    setIsModalOpen(true);
  }
  const HandleDelete = () =>{

  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'number',
    });
  };
  const columns = [
  {
    title: 'No.',
    width: 100,
    dataIndex: 'number',
    key: 'number',
    sorter: (a, b) => a.number - b.number,
    sortOrder: sortedInfo.columnKey === 'number' ? sortedInfo.order : null,
    ellipsis: true,
    fixed: 'left',
    render: (text) => <a style={{color:'#00838F'}}>{text}</a>,
   
  },
  {
    title: 'Description',
    width: 100,
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Description 2',
    width: 150,
    dataIndex: 'displayName2',
    key: 'displayName2',
  },
  {
    title: 'Item Type',
    width: 50,
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Unit Price',
    width: 50,
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  },
  {
    title: 'Quanity',
    width: 50,
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: 'Picture',
    dataIndex: 'itemPicture',
    key: 'itemPicture',
    width : 70,
    render: (itemPicture) => (
      <Image
      // http://localhost:5048/BC250/api/net/custom/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/items(da3b5306-67f1-ee11-a201-6045bdc8c10e)/picture
       //http://localhost:5048/BC250/api/net/custom/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/items(da3b5306-67f1-ee11-a201-6045bdc8c10e)/picture/pictureContent"
        src={itemPicture}
        alt={"Image"}
        style={{ borderRadius: '5px' }}
      />
    )
  },
  
  {
    title: 'Action',
    // key: 'operation',
    fixed: 'right',
    width: 90,
    type : 'secondary',
    render: () => <div style={{width:90}}>
      <Space>
        <Button 
        color="primary" 
        variant="filled" 
        style={{fontSize:10,padding:10}}
        onClick={showModal}
        >
          Edit
        </Button>
        <Popconfirm
          title="Delete the record"
          description="Are you sure to delete this record?"
          okText="Yes"
          cancelText="No"
        >
          <Button color="danger" variant="filled" style={{fontSize:10,padding:10}}>Delete</Button>
        </Popconfirm>
      </Space>
    </div>,
  },
];
  return (
    <div>
      <div>
        <Space>
          <h2>Items</h2>
          <Input.Search 
            placeholder='Search'
          />
          <Button type="primary" onClick={showModal}>
           New
          </Button>
          <Modal
            width={800} 
            title="Item Card"
            open={isModalOpen}
            onOk={() => handleOk(Item)}
            onCancel={handleCancel}
          >
      <Row gutter={16}>
        {/* Left Half - Editable Item Details */}
        <Col span={12}>
          <Space direction="vertical">
            
          <Input addonBefore="Item No." value={Item.number} onChange={(e) => handleChange('number', e.target.value)} />
          <Input addonBefore="Item No." value={Item.displayName} onChange={(e) => handleChange('displayName', e.target.value)} />
          <Input addonBefore="Item No." value={Item.displayName2} onChange={(e) => handleChange('displayName2', e.target.value)} />
          </Space>
        </Col>
        <Col span={12}>
          <Space direction="vertical">
          <Input addonBefore="Item No." value={Item.type} onChange={(e) => handleChange('type', e.target.value)} />
          <InputNumber 
            addonBefore="Item No." 
            style={{ width: '100%' }}
            value={Item.unitPrice} 
            onChange={(value) => handleChange('unitPrice', value)} 
            />
          <InputNumber 
          addonBefore="Item No." 
          style={{ width: '100%' }}
          value={Item.inventory} 
          onChange={(value) => handleChange('inventory', value)} 
          />
          </Space>
        </Col>

        {/* Right Half - Image Preview */}
        {/* <Col span={12} style={{ textAlign: 'center' }}> */}
          {/* <p><strong>Picture:</strong></p> */}
          {/* <Image
            width={200}
            src={Item.imageUrl}
            alt="Product"
            style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '5px' }}
          /> */}
          {/* <Input 
            placeholder="Image URL" 
            value={Item.imageUrl} 
            onChange={(e) => handleChange('imageUrl', e.target.value)} 
          /> */}
        {/* </Col> */}
      </Row>
    </Modal>
        </Space>
      </div>
      <Table
        // className={styles.customTable}
        columns={columns}
        dataSource={Item}
        onChange={handleChange}
        scroll={{
          x: 'max-content',
          y: 55 * 8,
        }}
        />
      </div>
  );
};
export default Item;