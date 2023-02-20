import React from 'react'
import { Button, Checkbox, Form, Input, Card } from 'antd';

export default function HospitalSetAddOrUpdate() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="医院名称"
          name="hosname"
          rules={[{ required: true, message: '请输入医院名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: '请输入医院编号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: '请输入api基础路径' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人名称"
          name="contactsName"
          rules={[{ required: true, message: '请输入联系人名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人电话"
          name="contactsPhone"
          rules={[{ required: true, message: '请输入联系人电话' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button style={{ marginLeft: 20 }}>取消</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

