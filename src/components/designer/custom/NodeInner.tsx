import React from 'react';
import styled from '@emotion/styled';
import { INodeInnerDefaultProps, ISize } from '@mrblenny/react-flow-chart';
import { StatusBadge } from 'components/common';

const Styled = {
  Node: styled.div<{ size?: ISize }>`
    padding: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${({ size }) => (size ? `${size.height}px` : 'auto')};
    width: ${({ size }) => (size ? `${size.width}px` : 'auto')};
  `,
};

const CustomNodeInner: React.FC<INodeInnerDefaultProps> = ({ node }) => {
  return (
    <Styled.Node size={node.size}>
      <span>
        <StatusBadge text={node.id} status={node.properties.status} />
      </span>
      <img src={node.properties.icon} style={{ width: 24, height: 24 }} alt="" />
    </Styled.Node>
  );
};

export default CustomNodeInner;