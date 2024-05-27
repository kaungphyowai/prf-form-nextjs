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
  display01: css`
    font-family: Inter;
    font-size: 72px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 80px;
    letter-spacing: -0.04em;
    text-align: center;
    color: ${(props) => props.textColor}

  `,
  display02: css`
    //styleName: Display / 02 / Semi Bold;
    font-family: Inter;
    font-size: 60px;
    font-weight: ${(props) => getFontWeight(props.weight)};
    line-height: 72px;
    letter-spacing: -0.04em;
    text-align: center;
    color: ${(props) => props.textColor}

  `
};

const Typography = styled.div`
  ${(props) => typographyStyles[props.variant]}
`;

const DisplayComponent = ({ variant, textColor, weight, children }) => (
  <Typography variant={variant} textColor={textColor} weight={weight}>
    {children}
  </Typography>
);

DisplayComponent.propTypes = {
  variant: PropTypes.oneOf(['display01','display02', 'heading01', 'heading02', 'heading03','heading05','heading06', 'subheading', 'paragraph01','paragraph02', 'paragraph03', 'caption', 'footer' ]), // Add more variants here
  weight: PropTypes.oneOf(['extra-bold', 'bold', 'semi-bold']),
  children: PropTypes.node.isRequired,
};

export default DisplayComponent;
