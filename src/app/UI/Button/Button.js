import * as React from 'react';
import styled from 'styled-components';

// input: 


// const Button = styled.button`
// width: Hug (91px)px;
// height: Hug (34px)px;
// padding: 8px 12px 8px 12px;
// gap: 6px;
// border-radius: 18px;
// border: none;
// opacity: 0px;
// background: #B91C1C;
// `;

const Button = styled.button`
//   width: 91px; /* Corrected the width */
//   height: 34px; /* Corrected the height */
  min-width: 91px;
  min-height: 34px;
  padding: 8px 12px;
  gap: 6px;
  border-radius: 18px;
  border: none;
  opacity: 1; /* Changed opacity to 1 for visibility */
  background: #B91C1C;
  cursor: pointer; /* Change cursor to pointer to indicate clickable button */
  text-align:center;
  
  /* Hover state */
  &:hover {
    background: #F87171;
  }

  /* Active state (pressed) */
  &:active {
    background: #991B1B;
  }

  /* Disabled state */
  &:disabled {
    background: #E2E8F0;
    cursor: not-allowed; /* Change cursor to indicate disabled button */
    opacity: 0.6; /* Optional: make the button appear disabled */
  }
`;

export default Button;

// import React from 'react';
// import PropTypes from 'prop-types';
// import styled, { css } from 'styled-components';

// // Define size styles
// const sizeStyles = {
//   small: css`
//     min-width: 64px;
//     min-height: 32px;
//     padding: 4px 8px;
//     font-size: 12px;
//   `,
//   regular: css`
//     min-width: 91px;
//     min-height: 34px;
//     padding: 8px 12px;
//     font-size: 14px;
//   `,
//   large: css`
//     min-width: 120px;
//     min-height: 44px;
//     padding: 12px 16px;
//     font-size: 16px;
//   `,
// };

// // Define variant styles
// const variantStyles = {
//   primary: css`
//     background: #B91C1C;
//     color: white;

//     &:hover {
//       background: #F87171;
//     }

//     &:active {
//       background: #991B1B;
//     }
//   `,
//   secondary: css`
//     background: #E2E8F0;
//     color: #111827;

//     &:hover {
//       background: #CBD5E1;
//     }

//     &:active {
//       background: #94A3B8;
//     }
//   `,
//   ghost: css`
//     background: transparent;
//     color: #111827;
//     border: 1px solid #D1D5DB;

//     &:hover {
//       background: #F3F4F6;
//     }

//     &:active {
//       background: #E5E7EB;
//     }
//   `,
// };

// // Styled button component
// const StyledButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 6px;
//   border-radius: 18px;
//   border: none;
//   cursor: pointer;
//   ${(props) => sizeStyles[props.size]}
//   ${(props) => variantStyles[props.variant]}

//   &:disabled {
//     background: #E2E8F0;
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `;

// // Icon wrapper
// const IconWrapper = styled.span`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
// `;

// // Button component
// const Button = ({ size, variant, leftIcon, rightIcon, children, ...props }) => (
//   <StyledButton size={size} variant={variant} {...props}>
//     {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
//     {children}
//     {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
//   </StyledButton>
// );

// Button.propTypes = {
//   size: PropTypes.oneOf(['small', 'regular', 'large']),
//   variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
//   leftIcon: PropTypes.node,
//   rightIcon: PropTypes.node,
//   children: PropTypes.node.isRequired,
// };

// Button.defaultProps = {
//   size: 'regular',
//   variant: 'primary',
//   leftIcon: null,
//   rightIcon: null,
// };

// export default Button;
