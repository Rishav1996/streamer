import React, { Component } from "react";
import {
  Layout,
  Space,
  Image,
  Typography,
  PageHeader,
  Menu,
  Row,
  Col,
} from "antd";
import {
  BACKGROUND_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
  SECONDARY_COLOR,
} from "../constant";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import Cookies from "js-cookie";

const { Content, Sider } = Layout;
const { Title } = Typography;

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { groups: [] };
  }

  componentDidMount() {
    const groups = { u_name: Cookies.get("user") };
    fetch("http://localhost:8000/group/fetch", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(groups),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          groups: data.groups,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    var groups = [];
    this.state.groups.forEach((e) => {
      groups.push(<Menu.Item key={e}>{e}</Menu.Item>);
    });
    return (
      <>
        <Layout style={{ height: "100vh" }}>
          <PageHeader
            style={{
              background: BACKGROUND_COLOR,
              paddingLeft: 20,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Space align="top">
              <Image
                align="center"
                preview={false}
                width={40}
                src="./../assets/streaming.png"
              />
              <Title
                style={{
                  fontSize: 35,
                  color: SECONDARY_COLOR,
                }}
              >
                Streamer
              </Title>
            </Space>
          </PageHeader>
          <Layout>
            <Sider style={{ background: DARK_COLOR }}>
              <Menu
                style={{ background: "transparent" }}
                defaultSelectedKeys={
                  this.state.groups.length !== 0 ? [this.state.groups[0]] : 0
                }
                theme="dark"
              >
                {groups}
              </Menu>
            </Sider>
            <Content
              style={{
                background: LIGHT_COLOR,
                padding: 20,
                overflowY: "auto",
              }}
            >
              <Row style={{ paddingBottom: 10 }}>
                <Col span={24}>
                  <CreatePost></CreatePost>
                </Col>
              </Row>
              <Row style={{ paddingTop: 10 }}>
                <Col span={24}>
                  <Posts></Posts>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}
