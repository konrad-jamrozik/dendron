import { MinusOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { SchemaPropsV2 } from "@dendronhq/common-all";
import { Button, Card, Col, Row, Typography } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { ReactD3TreeItem } from "react-d3-tree";
import { useWindowSize } from "../../components/hooks";
import _ from "lodash";
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const Tree = dynamic(
  () => {
    return import("react-d3-tree");
  },
  { ssr: false }
);

type SchemaTreeItem = ReactD3TreeItem &
  Omit<Partial<SchemaPropsV2>, "children">;

const myTreeData = [
  {
    name: "Top Level",
    attributes: {
      keyA: "val A",
      keyB: "val B",
      keyC: "val C",
    },
    children: [
      {
        name: "Level 2: A",
        attributes: {
          keyA: "val A",
          keyB: "val B",
          keyC: "val C",
        },
      },
      {
        name: "Level 2: B",
      },
    ],
  },
];
type TreeViewState = {
  translate: {
    x: number;
    y: number;
  };
};

export default function Edit() {
  const size = useWindowSize();
  const [treeData, setTreeData] = useState<SchemaTreeItem[]>(myTreeData);
  const [window, setWindow] = useState(undefined);
  const [treeViewState, setTreeViewState] = useState<TreeViewState>({
    translate: { x: 0, y: 0 },
  });
  if (_.isUndefined(size.height)) {
      return null;
  }
  if (!_.isEqual(window, size)) {
      setWindow(size)
    setTreeViewState({
      translate: {
        x: size.width / 2,
        y: size.height / 5,
      },
    });

  }

  const generateNodeProps = () => {
    return {
      buttons: [
        <Button
          type="dashed"
          shape="circle"
          icon={<MinusOutlined />}
          size="small"
        />,
      ],
    };
  };

  return (
    <>
      <Head>
        <title>Edit Schema</title>
      </Head>
      <Row>
        <Col span={24}>
          <h1> Edit Schema</h1>
        </Col>
        <Col span={24}>
          <div style={{ height: "100vh" }}>
            <Tree 
            orientation={"vertical"}
            data={myTreeData} translate={treeViewState.translate} />
          </div>
        </Col>
      </Row>
    </>
  );
}
