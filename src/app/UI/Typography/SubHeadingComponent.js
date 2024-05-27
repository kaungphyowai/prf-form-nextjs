import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../DesignSystem/designColors'

const typographyStyles = {
  regular: css`
  //styleName: Subheading/Regular;
    font-family: Inter;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    text-align: center;
    color: ${(props) => props.textColor}
  `,
  "semi-bold": css`
  //styleName: Subheading / Semi Bold;
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.textColor}
  
  `,
  "underline": css`
  //styleName: Subheading/Underline;
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.textColor};
  text-decoration: underline;
  
  `
};

const Typography = styled.div`
  ${(props) => typographyStyles[props.variant]}
`;

const SubHeadingComponent = ({ variant, textColor, children }) => (
  <Typography variant={variant} textColor={textColor}>
    {children}
  </Typography>
);

SubHeadingComponent.propTypes = {
  variant: PropTypes.oneOf(['regular', 'semi-bold', 'underline']),
  children: PropTypes.node.isRequired,
};

export default SubHeadingComponent;
