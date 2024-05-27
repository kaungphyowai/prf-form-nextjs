import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../DesignSystem/designColors'
const typographyStyles = {
  rregular: css`
  //styleName: Caption / Regular;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    color: ${(props) => props.textColor}
  `,
  "semi-bold": css`
  //styleName: Caption / Semi Bold;
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  color: ${(props) => props.textColor}
  
  `,
  CAP: css`
  //styleName: Caption / CAP;
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.textColor};
  `
};

const Typography = styled.div`
  ${(props) => typographyStyles[props.variant]}
`;

const ParagraphComponent = ({ variant, textColor, children }) => (
  <Typography variant={variant} textColor={textColor}>
    {children}
  </Typography>
);

ParagraphComponent.propTypes = {
  variant: PropTypes.oneOf(['regular', 'semi-bold', 'CAP']), // Add more variants here
  children: PropTypes.node.isRequired,
};

export default ParagraphComponent;
