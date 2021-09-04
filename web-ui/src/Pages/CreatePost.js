import { Card, Input, Form, Upload, Row, Col, Button } from "antd";
import React, { Component } from "react";
import { DARK_COLOR, SECONDARY_COLOR } from "../constant";
import { PlusOutlined } from "@ant-design/icons";

export default class CreatePost extends Component {
  render() {
    return (
      <>
        <Card>
          <Form>
            <Form.Item name="post">
              <Input
                style={{
                  background: "transparent",
                  color: DARK_COLOR,
                  borderWidth: 2,
                  padding: 10,
                  border: "none",
                }}
                type="text"
                placeholder="Say something nice !!!"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Upload onPreview={e=>{return ;}} actions="none" maxCount={1} listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Row justify="start">
                <Col>
                  <Button
                    size="large"
                    style={{
                      background: SECONDARY_COLOR,
                      color: DARK_COLOR,
                      border: "none",
                    }}
                  >
                    <b>Post It</b>
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}
