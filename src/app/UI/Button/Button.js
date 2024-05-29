// import * as React from 'react';
// import styled from 'styled-components';

// // input: 


// // const Button = styled.button`
// // width: Hug (91px)px;
// // height: Hug (34px)px;
// // padding: 8px 12px 8px 12px;
// // gap: 6px;
// // border-radius: 18px;
// // border: none;
// // opacity: 0px;
// // background: #B91C1C;
// // `;

// const Button = styled.button`
// //   width: 91px; /* Corrected the width */
// //   height: 34px; /* Corrected the height */
//   min-width: 91px;
//   min-height: 34px;
//   padding: 8px 12px;
//   gap: 6px;
//   border-radius: 18px;
//   border: none;
//   opacity: 1; /* Changed opacity to 1 for visibility */
//   background: #B91C1C;
//   cursor: pointer; /* Change cursor to pointer to indicate clickable button */
//   text-align:center;
  
//   /* Hover state */
//   &:hover {
//     background: #F87171;
//   }

//   /* Active state (pressed) */
//   &:active {
//     background: #991B1B;
//   }

//   /* Disabled state */
//   &:disabled {
//     background: #E2E8F0;
//     cursor: not-allowed; /* Change cursor to indicate disabled button */
//     opacity: 0.6; /* Optional: make the button appear disabled */
//   }
// `;

// export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../../UI/DesignSystem/designColors'

// Define size styles
const sizeStyles = {
  small: css`
    min-width: 91px;
    min-height: 34px;
    padding: 8px 12px;
    gap: 6px;
    border-radius: 18px;
    opacity: 0px;

  `,
  regular: css`
    min-width: 91px;
    min-height: 34px;
    padding: 8px 12px;
    font-size: 14px;
  `,
  large: css`
    min-width: 120px;
    min-height: 44px;
    padding: 12px 16px;
    font-size: 16px;
  `,
};

// Define variant styles
const variantStyles = {
  primary: css`
    background: ${colors.primary.Red700};
    color: ${colors.neutral.Gray50};

    &:hover {
      background: ${colors.primary.Red400};
    }

    &:active {
      background: ${colors.primary.Red800};
    }
  `,
  secondary: css`
    background: ${colors.secondary.Yellow400};
    color: ${colors.neutral.Gray900};

    &:hover {
      background: ${colors.secondary.Yellow200};
    }

    &:active {
      background: ${colors.secondary.Yellow500};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${colors.primary.Red600};
    border: 1px solid ${colors.primary.Red600};

    &:hover {
        color: ${colors.primary.Red400};
        border: 1px solid ${colors.primary.Red400};
    }

    &:active {
      background: ${colors.primary.Red50};
    border: 1px solid ${colors.primary.Red400};
    }
  `,
};

// Styled button component
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  ${(props) => sizeStyles[props.size]}
  ${(props) => variantStyles[props.variant]}

  &:disabled {
    background: ${colors.neutral.Gray100};
    border: 1px solid ${colors.neutral.Gray400};
    color: ${colors.neutral.Gray400};
    cursor: not-allowed;
    opacity: 0.6;
    color: 
  }
`;

// Icon wrapper
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// Button component
const Button = ({ size, variant, disabled=false, leftIcon, rightIcon, children, ...props }) => (
  <StyledButton size={size} variant={variant} {...props} disabled={disabled}>
    {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
    {children}
    {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
  </StyledButton>
);

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  size: 'regular',
  variant: 'primary',
  leftIcon: null,
  rightIcon: null,
};

export default Button;
