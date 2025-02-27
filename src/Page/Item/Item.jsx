import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table,Popconfirm, Modal,Image } from 'antd';
import { createStyles } from 'antd-style';
import axios from 'axios';
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});


// const GetAPI = () => {
  // axios.get('http://localhost:6048/BC240/api/NET/Custom/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/purchaseRequests')
  const Item = () => {
  const [Item, setItem] = useState([]);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  useEffect(() => {
    const username = "Admin";
    const password = "h2qGeJ0AalVZJwQJDPQ27rbBeEItrQAPTGUl4X+JJ+o=";
    const authToken = btoa(`${username}:${password}`); // Base64 encoding for Basic Auth

    axios
      .get(
        "http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items",
        {
          headers: {
            Authorization: `Basic ${authToken}`, // Basic Authorization Header
          },
        }
      )
      .then((response) => {
        // setList(response.data)
        setItem(response.data.value)
        // setProducts(response.data); // Uncomment if you have a state for products
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []); // Dependency array, leave empty if no dependencies
  const { styles } = useStyle();
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

  // "number": "1000",
  // "displayName": "Bicyclc ty 02",
  // "displayName2": "",
  // "type": "Inventory",
  // "itemCategoryId": "00000000-0000-0000-0000-000000000000",
  // "itemCategoryCode": "",
  // "blocked": false,
  // "gtin": "",
  // "inventory": 188,
  // "unitPrice": 4000,
  // "priceIncludesTax": false,
  // "unitCost": 350.595,
  // "lastDirectCost": 3782.96,
  // "taxGroupId": "00000000-0000-0000-0000-000000000000",
  // "taxGroupCode": "",
  // "baseUnitOfMeasureId": "e30a26e2-66f1-ee11-a201-6045bdc8c10e",
  // "baseUnitOfMeasureCode": "PCS",
  // "generalProductPostingGroupId": "08a8cbe6-66f1-ee11-a201-6045bdc8c10e",
  // "generalProductPostingGroupCode": "RETAIL",
  // "VATProdPostingGroup": "GST15",
  // "WHTProductPostingGroup": "WHT",
  // "inventoryPostingGroupId": "00000000-0000-0000-0000-000000000000",
  // "inventoryPostingGroupCode": "FINISHED",
  // "lastModifiedDateTime": "2025-02-05T03:53:29.79Z",
  // "itemTemplate": ""
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
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width : 50,
    render: (imageUrl) => (
      <Image
        // width={50}
        src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
        alt="Product"
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
const dataSource = Array.from({
  length: 100,
}).map((_, i) => ({
  key: i,
  number: `PR-2411-00 ${i+1}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
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
          width={1200}
          title="Item Card" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Space>
      </div>
      <Table
        className={styles.customTable}
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