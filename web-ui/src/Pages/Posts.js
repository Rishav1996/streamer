import { Button, Card, List, Space } from "antd";
import React, { Component } from "react";
import { DARK_COLOR, SECONDARY_COLOR } from "../constant";
import { SyncOutlined, LikeFilled, ShareAltOutlined, CommentOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";


export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  fetchData = () => {
    const posts = { u_name: Cookies.get("user") };
    fetch("http://localhost:8000/post/fetch", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(posts),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          data: data,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <Card
          extra={[
            <Button
              size="large"
              style={{
                background: SECONDARY_COLOR,
                color: DARK_COLOR,
                border: "none",
              }}
              onClick={e=>{e.preventDefault(); this.fetchData()}}
              icon={<SyncOutlined color={DARK_COLOR}></SyncOutlined>}
            >
              <b> Refresh</b>
            </Button>,
          ]}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a style={{ color: DARK_COLOR }} href="_">
                      {item.post_text}
                    </a>
                  }
                  description={
                    <Space align='start'>
                      <LikeFilled color={DARK_COLOR} />
                      <a style={{ color: DARK_COLOR }} href="_">{item.likes}</a>
                      <CommentOutlined color={DARK_COLOR} href="_" />
                      <a style={{ color: DARK_COLOR }} href="_">{item.comments}</a>
                      <ShareAltOutlined color={DARK_COLOR} />
                      <a style={{ color: DARK_COLOR }} href="_">{item.shares}</a>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </>
    );
  }
}
