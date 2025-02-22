import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table,Popconfirm, Modal } from 'antd';
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
  const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  useEffect(() => {
    const username = "Admin";
    const password = "kyim6sFYWc+pEZmd8ps1R4cmIXKYWI4lJInK8Wmno9M=";
    const authToken = btoa(`${username}:${password}`); // Base64 encoding for Basic Auth

    axios
      .get(
        "http://localhost:6048/BC240/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/customers",
        {
          headers: {
            Authorization: `Basic ${authToken}`, // Basic Authorization Header
          },
        }
      )
      .then((response) => {
        // setList(response.data)
        setCustomer(response.data.value)
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
  const columns = [
  // {
  //   title: 'Full Name',
  //   width: 100,
  //   dataIndex: 'name',
  //   key: 'name',
  //   fixed: 'left',
  // },
  {
    title: 'No.',
    width: 150,
    dataIndex: 'number',
    key: 'number',
    sorter: (a, b) => a.number - b.number,
    sortOrder: sortedInfo.columnKey === 'number' ? sortedInfo.order : null,
    ellipsis: true,
    fixed: 'left',
    render: (text) => <a style={{color:'#00838F'}}>{text}</a>,
   
  },
  {
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
    width: 150,
    filteredValue: filteredInfo.name || null,
    onFilter: (value, record) => record.name.includes(value),
    sorter: (a, b) => a.name.length - b.name.length,
    sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: 'Responsibility Center',
    // dataIndex: 'name',
    // key: '2',
    width: 150,
  },
  {
    title: 'Location Code',
    // dataIndex: 'address',
    // key: '3',
    width: 150,
  },
  {
    title: 'Phone No.',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 150,
    render: (text) => <a style={{color:'#00838F'}}>{text}</a>,
  },
  {
    title: 'Contact',
    // dataIndex: 'phoneNumber',
    // key: 'phoneNumber',
    width: 150,
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: 150,
  },
  {
    title: 'Balance (LCY)',
    // dataIndex: 'phoneNumber',
    // key: 'phoneNumber',
    width: 150,
  },
  {
    title: 'Balance Due (LCY)',
    // dataIndex: 'phoneNumber',
    // key: 'phoneNumber',
    width: 150,
  },
  {
    title: 'Sale (LCY)',
    // dataIndex: 'phoneNumber',
    // key: 'phoneNumber',
    width: 150,
  },
  {
    title: 'Payment (LCY)',
    // dataIndex: 'phoneNumber',
    // key: 'phoneNumber',
    width: 150,
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
          <h2>Customers</h2>
          <Input.Search 
            placeholder='Search'
          />
          <Button type="primary" onClick={showModal}>
           New
          </Button>
          <Modal 
          width={1200}
          title="Customer Card" 
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
        dataSource={customer}
        onChange={handleChange}
        scroll={{
          x: 'max-content',
          y: 55 * 8,
        }}
        />
      </div>
  );
};
export default Customer;