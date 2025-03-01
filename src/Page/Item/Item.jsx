import React, { useState, useEffect } from "react";
import { Space, Table, Popconfirm, Image, Modal, Row, Col, Input, Button, Form, Card, Select, message,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const Item = () => {
  const [items, setItems] = useState([]); // Holds fetched items
  const [filteredItems, setFilteredItems] = useState([]); // Holds filtered items based on search
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for insert/update
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [currentItem, setCurrentItem] = useState(null); // Track selected item

  const username = "Admin";
  const password = "h2qGeJ0AalVZJwQJDPQ27rbBeEItrQAPTGUl4X+JJ+o=";
  const authToken = btoa(`${username}:${password}`); // Base64 encoding for Basic Auth

  // Fetch Items
  useEffect(() => {
    axios
      .get(
        "http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items",
        { headers: { Authorization: `Basic ${authToken}` } }
      )
      .then((response) => {
        const updatedItems = response.data.value.map((item) => ({
          ...item,
          itemPicture: `http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items(${item.id})/picture/pictureContent`,
        }));
        setItems(updatedItems);
        setFilteredItems(updatedItems); // Initially, display all items
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Handle input changes for new/editing item
  const handleInputChange = (field, value) => {
    setCurrentItem({ ...currentItem, [field]: value });
  };

  // Show Modal for Adding New Item
  const showAddModal = () => {
    setCurrentItem({ number: "", displayName: "", displayName2: "", type: "", unitPrice: 0, inventory: 0 });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Show Modal for Editing Item
  const showEditModal = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Save Item (Insert/Update)
  const saveItem = async () => {
    setLoading(true);
    try {
      const dynamicItem = {
        number: currentItem?.number || "",
        displayName: currentItem?.displayName || "",
        displayName2: currentItem?.displayName2 || "",
        type: currentItem?.type || "Inventory",
        // unitPrice: currentItem?.unitPrice || 0,
        // inventory: currentItem?.inventory || 0,
      };

      if (isEditing) {
        await axios.patch(
          `http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items(${currentItem.id})`,
          dynamicItem,
          { headers: { Authorization: `Basic ${authToken}`, "Content-Type": "application/json" } }
        );
        message.success("Item updated successfully!");
        setItems((prev) => prev.map((item) => (item.id === currentItem.id ? currentItem : item)));
      } else {
        const response = await axios.post(
          "http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items",
          dynamicItem,
          { headers: { Authorization: `Basic ${authToken}`, "Content-Type": "application/json" } }
        );
        message.success("Item added successfully!");
        setItems([...items, dynamicItem]);
      }

      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      message.error("Operation failed. Check console.");
      console.error("Save Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Item
  const deleteItem = async (itemId) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items(${itemId})`,
        { headers: { Authorization: `Basic ${authToken}` } }
      );
      message.success("Item deleted successfully!");
  
      // Fetch updated items after deletion
      const response = await axios.get(
        "http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items",
        { headers: { Authorization: `Basic ${authToken}` } }
      );
      const updatedItems = response.data.value.map((item) => ({
        ...item,
        itemPicture: `http://localhost:5048/BC250/api/v2.0/companies(6bb14571-2c38-ef11-8c07-48a472dd88bb)/Items(${item.id})/picture/pictureContent`,
      }));
  
      setItems(updatedItems);
      setFilteredItems(updatedItems); // Update filteredItems as well
    } catch (error) {
      message.error("Failed to delete item.");
      console.error("Delete Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Search Handler
  const handleSearch = (value) => {
    if (typeof value === 'string') {
      // Convert the search term to lowercase for case-insensitive comparison
      const searchTerm = value.toLowerCase();
  
      // Filter items based on the search query (matching number)
      const filteredData = items.filter((item) =>
        item.number.toLowerCase().includes(searchTerm) // Case insensitive match
      );
  
      setFilteredItems(filteredData);
    } else {
      // If value is not a string, log the issue or handle it gracefully
      console.warn("Search value is not a string:", value);
    }
  };

  const columns = [
    { title: "No.", dataIndex: "number", key: "number", width: 100 },
    { title: "Description", dataIndex: "displayName", key: "displayName", width: 100 },
    { title: "Description 2", dataIndex: "displayName2", key: "displayName2", width: 150 },
    { title: "Item Type", dataIndex: "type", key: "type", width: 50 },
    { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", width: 50 },
    { title: "Quantity", dataIndex: "inventory", key: "inventory", width: 50 },
    {
      title: "Picture",
      dataIndex: "itemPicture",
      key: "itemPicture",
      width: 70,
      render: (itemPicture) => <Image src={itemPicture} alt="Image" style={{ borderRadius: "5px" }} />,
    },
    {
      title: "Action",
      fixed: "right",
      width: 120,
      render: (record) => (
        <Space>
          <Button style={{ fontSize: 10, padding: 10 }} onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => deleteItem(record.id)} // Call delete function
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ fontSize: 10, padding: 10 }} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space>
        <h2>Items</h2>
        <Input.Search
          placeholder="Search by Number"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button type="primary" onClick={showAddModal}>
          New
        </Button>
      </Space>

      {/* Insert/Edit Modal */}
      <Modal
        width={800}
        title={isEditing ? "Edit Item" : "Create New Item"}
        open={isModalOpen}
        onOk={saveItem}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        centered
      >
        <Card>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Item No.">
                  <Input
                    value={currentItem?.number}
                    onChange={(e) => handleInputChange("number", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Description">
                  <Input
                    value={currentItem?.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Description 2">
                  <Input
                    value={currentItem?.displayName2}
                    onChange={(e) => handleInputChange("displayName2", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Attach Image">
                  <Upload beforeUpload={() => false} showUploadList={true}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Item Type">
                  <Select
                    value={currentItem?.type}
                    onChange={(value) => handleInputChange("type", value)}
                    placeholder="Select Item Type"
                  >
                    <Option value="Laptop">Laptop</Option>
                    <Option value="Desktop">Desktop</Option>
                    <Option value="Tablet">Tablet</Option>
                    <Option value="Accessories">Accessories</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Unit Price">
                  <Input
                    value={currentItem?.unitPrice}
                    onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Quantity">
                  <Input
                    value={currentItem?.inventory}
                    onChange={(e) => handleInputChange("inventory", e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>

      {/* Items Table */}
      <Table columns={columns} dataSource={filteredItems} scroll={{ x: "max-content", y: 55 * 8 }} />
    </div>
  );
};
export default Item;