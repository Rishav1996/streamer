import React, { Component } from "react";
import {
  Layout,
  Space,
  Image,
  Typography,
  PageHeader,
  Col,
  Row,
  Card,
  Alert,
} from "antd";
import { BACKGROUND_COLOR, LIGHT_COLOR, SECONDARY_COLOR } from "../constant";
import { io } from "socket.io-client";
import ApexChart from "react-apexcharts";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import StreamingPlugin from "chartjs-plugin-streaming";

Chart.register(StreamingPlugin);

const { Content } = Layout;
const { Title } = Typography;

const socket = io("ws://localhost:3001/");

export default class Analytics extends Component {
  intervalID = undefined;
  duration = 600000;
  refresh = 30000;

  optionsActiveUsers = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "realtime",
        realtime: {
          duration: this.duration,
          refresh: this.refresh,
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: Date.now(),
                y: this.state.active_user,
              });
            });
          },
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  optionsLikes = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "realtime",
        realtime: {
          duration: this.duration,
          refresh: this.refresh,
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: Date.now(),
                y: this.state.likes,
              });
            });
          },
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  optionsPosts = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "realtime",
        realtime: {
          duration: this.duration,
          refresh: this.refresh,
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: Date.now(),
                y: this.state.posts,
              });
            });
          },
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  optionsShares = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "realtime",
        realtime: {
          duration: this.duration,
          refresh: this.refresh,
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: Date.now(),
                y: this.state.shares,
              });
            });
          },
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  optionsComments = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "realtime",
        realtime: {
          duration: this.duration,
          refresh: this.refresh,
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: Date.now(),
                y: this.state.comments,
              });
            });
          },
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      active_user: 0,
      likes: 0,
      posts: 0,
      comments: 0,
      emotions: {},
      shares: 0,
      data: {
        datasets: [
          {
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.2,
          },
        ],
      },
    };
  }

  filterMessages = (message) => {
    var tag = message.tag;
    var data = message.data;

    if (tag === "logins") {
      var active_user = parseInt(data.active_users);
      this.setState({
        ...this.state,
        active_user: active_user,
      });
    } else if (tag === "likes") {
      var likes = parseInt(data.no_of_likes);
      this.setState({
        ...this.state,
        likes: likes,
      });
    } else if (tag === "shares") {
      var shares = parseInt(data.no_of_shares);
      this.setState({
        ...this.state,
        shares: shares,
      });
    } else if (tag === "comments") {
      var comments = parseInt(data.no_of_comments);
      this.setState({
        ...this.state,
        comments: comments,
      });
    } else if (tag === "posts") {
      var posts = parseInt(data.no_of_posts);
      this.setState({
        ...this.state,
        posts: posts,
      });
    } else if (tag === "emotions") {
      this.setState({
        ...this.state,
        emotions: data,
      });
    }
  };

  componentDidMount() {
    socket.on("message", (message) => {
      this.filterMessages(JSON.parse(message));
    });
    setInterval(this.forceUpdate(), 1000);
  }

  render() {
    var DONUT_CHART_HEIGHT = 250;
    var CARD_HEIGHT = "45vh";

    var activeUsersSeries = [
      { name: "Active Users", data: this.state.active_user },
    ];
    var emotionsSeries = [];
    var emotionsLabels = [];
    Object.keys(this.state.emotions).forEach((e) => {
      emotionsLabels.push(this.state.emotions[e]["p_emotion"]);
      emotionsSeries.push(parseInt(this.state.emotions[e]["count"]));
    });

    console.log(activeUsersSeries);

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
                Streamer Analytics
              </Title>
            </Space>
          </PageHeader>
          <Layout>
            <Content
              style={{
                background: LIGHT_COLOR,
                padding: 10,
                overflowY: "auto",
              }}
            >
              <Row>
                <Col style={{ padding: 5 }} span={8}>
                  <Card
                    title="Active Users Trend"
                    style={{ height: CARD_HEIGHT }}
                  >
                    <Line
                      data={this.state.data}
                      options={this.optionsActiveUsers}
                    />
                  </Card>
                </Col>
                <Col style={{ padding: 5 }} span={8}>
                  <Card title="Likes Trend" style={{ height: CARD_HEIGHT }}>
                    <Line data={this.state.data} options={this.optionsLikes} />
                  </Card>
                </Col>
                <Col style={{ padding: 5 }} span={8}>
                  <Card
                    title="Posts Users Trend"
                    style={{ height: CARD_HEIGHT }}
                  >
                    <Line data={this.state.data} options={this.optionsPosts} />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col style={{ padding: 5 }} span={8}>
                  <Card
                    title="Comments Users Trend"
                    style={{ height: CARD_HEIGHT }}
                  >
                    <Line
                      data={this.state.data}
                      options={this.optionsComments}
                    />
                  </Card>
                </Col>
                <Col style={{ padding: 5 }} span={8}>
                  <Card
                    title="Shares Users Trend"
                    style={{ height: CARD_HEIGHT }}
                  >
                    <Line data={this.state.data} options={this.optionsShares} />
                  </Card>
                </Col>
                <Col style={{ padding: 5 }} span={8}>
                  <Card
                    title="User Emotion over posts"
                    style={{ height: CARD_HEIGHT }}
                  >
                    {emotionsSeries.length === 0 ? (
                      <Alert message="Please Wait" type="info" showIcon></Alert>
                    ) : (
                      <ApexChart
                        series={emotionsSeries}
                        options={{ labels: emotionsLabels }}
                        type="donut"
                        height={DONUT_CHART_HEIGHT}
                      />
                    )}
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}
