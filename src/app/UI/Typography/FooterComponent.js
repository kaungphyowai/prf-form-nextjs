import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../DesignSystem/designColors'
const typographyStyles = {
  rregular: css`
  //styleName: Footer / Regular;
    font-family: Inter;
    font-size: 10px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  `,
  "semi-bold": css`
  //styleName: Footer / Semi Bold;
  font-family: Inter;
  font-size: 10px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0.02em;
  text-align: center;  
  color: ${(props) => props.textColor}
  
  `,
  CAP: css`
  //styleName: Footer / CAP;
  font-family: Inter;
  font-size: 10px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;  
  color: ${(props) => props.textColor};
  `
};

const Typography = styled.div`
  ${(props) => typographyStyles[props.variant]}
`;

const FooterComponent = ({ variant, textColor, children }) => (
  <Typography variant={variant} textColor={textColor}>
    {children}
  </Typography>
);

FooterComponent.propTypes = {
  variant: PropTypes.oneOf(['regular', 'semi-bold', 'CAP']), // Add more variants here
  children: PropTypes.node.isRequired,
};

export default FooterComponent;
