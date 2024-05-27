import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../DesignSystem/designColors'

const getFontWeight = (weight) => {
  switch (weight) {
    case 'extra-bold':
      return 800;
    case 'bold':
      return 700;
    case 'semi-bold':
      return 600;
    default:
      return 'normal';
  }
};

const typographyStyles = {
  heading01: css`
  //styleName: Heading/H1/Semi Bold;
    font-family: Inter;
    font-size: 48px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 56px;
    letter-spacing: -0.04em;
    text-align: center;
    color: ${(props) => props.textColor}
  `,
  heading02: css`
  //styleName: Heading / H2 / Semi Bold;
    font-family: Inter;
    font-size: 39px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 47px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  heading03: css`
  //styleName: Heading / H3 / Semi Bold;
    font-family: Inter;
    font-size: 33px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 40px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  heading04: css`
  //styleName: Heading / H4 / Semi Bold;
    font-family: Inter;
    font-size: 28px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 34px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  heading05: css`
  //styleName: Heading / H5 / Semi Bold;
    font-family: Inter;
    font-size: 23px;
    font-weight:  ${(props) => getFontWeight(props.weight)};
    line-height: 28px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  heading06: css`
  //styleName: Heading/H6/Semi Bold;
    font-family: Inter;
    font-size: 19px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 23px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  headingsmall01: css`
  //styleName: Heading/H1 - Small/Semi Bold;
    font-family: Inter;
    font-size: 34px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 40px;
    letter-spacing: -0.04em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  headingsmall02: css`
  //styleName: Heading / H2 - Small / Semi Bold;
    font-family: Inter;
    font-size: 33px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 40px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  headingsmall03: css`
  //styleName: Heading / H3 - Small / Semi Bold;
    font-family: Inter;
    font-size: 28px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 34px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  headingsmall04: css`
  //styleName: Heading / H4 - Small / Semi Bold;
    font-family: Inter;
    font-size: 23px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 28px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  headingsmall05: css`
  //styleName: Heading / H5 - Small / Semi Bold;
    font-family: Inter;
    font-size: 19px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 23px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
  headingsmall06: css`
  //styleName: Heading/H6 - Small/Semi Bold;
    font-family: Inter;
    font-size: 14px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 20px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${(props) => props.textColor}
  
  `,
};

const Typography = styled.div`
  ${(props) => typographyStyles[props.variant]}
`;

const HeadingComponent = ({ variant, textColor, weight, children }) => (
  <Typography variant={variant} textColor={textColor} weight={weight}>
    {children}
  </Typography>
);

HeadingComponent.propTypes = {
  variant: PropTypes.oneOf(['heading01', 'heading02', 'heading03','heading05','heading06', 'headingsmall01', 'headingsmall02', 'headingsmall03','headingsmall05','headingsmall06' ]), // Add more variants here
  weight: PropTypes.oneOf(['extra-bold', 'bold', 'semi-bold']),
  children: PropTypes.node.isRequired,
};

export default HeadingComponent;
