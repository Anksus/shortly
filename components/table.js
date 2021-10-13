import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import _default from "antd/lib/message";
import { signIn, signOut, useSession } from "next-auth/client";

/* eslint-disable */

// origin data initialisation
const originData = [];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
// Edit table decleration
const EditableTable = () => {
  const [session, loading] = useSession();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const email = session ? session.user.email : "";
  useEffect(() => {
    fetch("https://sh.anksus.me/api/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        res.json().then((d) => {
          const newData = d.map((res) => {
            return {
              shortUrl: res.shortid,
              originalUrl: res.url,
              key: res.shortid,
            };
          });
          setData(newData);
        });
      })
      .catch((e) => {
        alert(e);
      });
  }, [email]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      shortUrl: "",
      originalUrl: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        const someData = item.shortUrl;
        fetch("https://sh.anksus.me/api/change-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            __shortid: someData,
            url: row.originalUrl,
          }),
        })
          .then((e) => {
            console.log(e);
          })
          .catch((e) => {
            console.log(e);
          });

        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  // columns

  const columns = [
    {
      title: "shortUrl",
      dataIndex: "shortUrl",
      width: "15%",
      editable: false,
    },
    {
      title: "originalUrl",
      dataIndex: "originalUrl",
      width: "75%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 5,
        }}
        tableLayout={"fixed"}
        size={"small"}
      />
    </Form>
  );
};
/* eslint-enable */

export default EditableTable;
