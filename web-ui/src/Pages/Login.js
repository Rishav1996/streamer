import {
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Image,
  Form,
  Input,
  Button,
} from "antd";
import React, { Component } from "react";
import {
  ANALYTICS_FLAG,
  DARK_COLOR,
  MAIN_FLAG,
  SECONDARY_COLOR,
} from "./../constant";

import Cookies from 'js-cookie'

const { Title } = Typography;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  render() {
    return (
      <>
        <Row style={{ height: "100vh" }} justify="center" align="middle">
          <Col align="center" span={11}>
            <Space align="top" size="middle">
              <Image
                preview={false}
                width={100}
                src="./../assets/streaming.png"
              />
              <Title
                style={{
                  fontSize: 90,
                  color: SECONDARY_COLOR,
                }}
                level="1"
              >
                Streamer
              </Title>
            </Space>
          </Col>
          <Col span={2}>
            <Divider
              type="vertical"
              style={{ backgroundColor: DARK_COLOR, height: "45vh", width: 2 }}
            ></Divider>
          </Col>
          <Col span={11}>
            <Form layout="vertical" style={{ width: 400 }}>
              <Form.Item
                label={
                  <span style={{ color: SECONDARY_COLOR, fontSize: 20 }}>
                    User Name
                  </span>
                }
                value={this.state.user}
                onChange={(e) => {
                  this.setState({ ...this.state, user: e.target.value });
                }}
                name="username"
              >
                <Input
                  placeholder="username"
                  style={{
                    background: "transparent",
                    color: "white",
                    borderWidth: 2,
                    padding: 10,
                  }}
                ></Input>
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ color: SECONDARY_COLOR, fontSize: 20 }}>
                    Password
                  </span>
                }
                name="password"
              >
                <Input
                  placeholder="password"
                  style={{
                    background: "transparent",
                    color: "white",
                    borderWidth: 2,
                    padding: 10,
                  }}
                ></Input>
              </Form.Item>
              <Form.Item>
                <Row justify="end">
                  <Col>
                    <Space justify="end">
                      <Button
                        size="large"
                        style={{
                          background: SECONDARY_COLOR,
                          color: DARK_COLOR,
                          border: "none",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          Cookies.set('user', this.state.user)
                          this.props.updateFlag(MAIN_FLAG);
                        }}
                      >
                        <b>Login</b>
                      </Button>
                      <Button
                        size="large"
                        style={{
                          background: SECONDARY_COLOR,
                          color: DARK_COLOR,
                          border: "none",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.updateFlag(ANALYTICS_FLAG);
                        }}
                      >
                        <b>Analytics</b>
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
