import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../DesignSystem/designColors'
const getFontWeight = (weight) => {
  switch (weight) {
    case 'regular':
      return 400;
    case 'semi-bold':
      return 600;
    case 'underline':
      return 400;
    default:
      return 'normal';
  }
};

const typographyStyles = {
  paragraph01: css`
    //styleName: Paragraph/P1 / Regular;
    font-family: Inter;
    font-size: 14px;
    font-weight:${(props) => getFontWeight(props.weight)};
    line-height: 17px;
    text-align: center;
    color: ${(props) => props.textColor};
  text-decoration: ${(props) => props.weight == 'underline' && "underline"};
    
  `,
  paragraph02: css`
  //styleName: Paragraph / P2 / Regular;
  font-family: Inter;
  font-size: 16px;
  font-weight: ${(props) => getFontWeight(props.weight)};
  line-height: 24px;
  text-align: center;
  color: ${(props) => props.textColor};
  text-decoration: ${(props) => props.weight == 'underline' && "underline"};

  
  `,
  paragraph03: css`
  //styleName: Paragraph/P3/Regular;
  font-family: Inter;
  font-size: 18px;
  font-weight: ${(props) => getFontWeight(props.weight)};
  line-height: 22px;
  text-align: center;
  color: ${(props) => props.textColor};
  text-decoration: ${(props) => props.weight == 'underline' && "underline"};
  
  `
};

const Typography = styled.div`
  ${(props) => typographyStyles[props.variant]}
`;

const ParagraphComponent = ({ variant, textColor, weight, children }) => (
  <Typography variant={variant} textColor={textColor} weight={weight}>
    {children}
  </Typography>
);

ParagraphComponent.propTypes = {
  variant: PropTypes.oneOf(['paragraph01', 'paragraph02', 'paragraph03']), // Add more variants here
  weight: PropTypes.oneOf(['regular', 'semi-bold', 'underline' ]),
  children: PropTypes.node.isRequired,
};

export default ParagraphComponent;
