import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Modal, Card } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  DingtalkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { ErrorNotification, SuccessNotification } from "../../helpers/Notifications";

const Details = () => {
  let { id } = useParams();
  const [user, setUser] = useState();
  const [newUser, setnewUser] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  let navigate = useNavigate();

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:5000/users/${id}`);
    const response = await res.json();
    setUser(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users?id=${id}`, {
        method: "DELETE",
      });
      const response = await res.json();
      SuccessNotification({ description: response.message });
      navigate(`/`);
    } catch (error) {
      ErrorNotification({ description: error.message })
    }
  };

  const handleEditClick = async () => {
    setIsModalVisible(true);
    setnewUser(user[0]);
  };
  const handleOk = () => {
    setIsModalVisible(false);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch(`http://localhost:5000/users/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        SuccessNotification({
          description: "User was updated successfully",
        });
        navigate(`/`)
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      {user &&
        user.map((user) => (
          <Card
            title="Details"
            bordered={true}
            style={{
              width: 300,
              border: "1px solid",
              backgroundColor: "wheat",
            }}
            key={user.id}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <UserOutlined style={{ fontSize: "24px", marginRight: 5 }} />
              <p>{user.name}</p>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <DingtalkOutlined style={{ fontSize: "24px", marginRight: 5 }} />
              <p>{user.username}</p>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <MailOutlined style={{ fontSize: "24px", marginRight: 5 }} />
              <p>{user.email}</p>
            </div>
          </Card>
        ))}
      <div>
        <Button
          type="danger"
          style={{ margin: 10, width: 100 }}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
        <Button
          type="primary"
          style={{ margin: 10, width: 100 }}
          onClick={handleEditClick}
        >
          Edit
        </Button>
        <Modal
          title="Edit User Info"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            id="name"
            defaultValue={user ? user[0].name : ""}
            onChange={handleChange}
          />
          <Input
            id="username"
            defaultValue={user ? user[0].username : ""}
            onChange={handleChange}
          />
          <Input
            id="email"
            defaultValue={user ? user[0].email : ""}
            onChange={handleChange}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Details;
