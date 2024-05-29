import ParagraphComponent from '../Typography/ParagraphComponent'
import colors from '../DesignSystem/designColors'
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// Define styles for the tabs
const TabContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Tab = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? `2px solid ${colors.primary.Red500}` : 'none')};
  color: ${(props) => (props.active ? colors.primary.Red500: colors.neutral.Gray900)};


  &:hover{
    color: ${(props) => (props.active ? colors.primary.Red500: colors.neutral.Gray900)};
  }

  &:active{
    transform: scale(0.9); 
    color: ${colors.primary.Red900};
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

// Define styles for the search input
const SearchContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  width: 445px;
  height: 40px;
  border-radius: 20px;
  border: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${colors.neutral.Gray700};
  background-color: ${colors.neutral.Gray100};
  
  &::placeholder{
    font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${colors.neutral.Gray400};
  };


  &:focus-within {
    background-color: ${colors.neutral.Gray100};
    border: 2px solid ${colors.primary.Red500};
    transition: 0.2s;
    outline: none;
  };

  &:hover {
    background-color: ${colors.neutral.Gray200};
    outline: none;
  }
`;

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <TabContainer>
      <Tab active={activeTab === 'Pending'} onClick={() => setActiveTab('Pending')}>
        <ParagraphComponent variant='paragraph02' weight='semi-bold'>

          Pending
        </ParagraphComponent>
      </Tab>
      <Tab active={activeTab === 'Denied'} onClick={() => setActiveTab('Denied')}>
      <ParagraphComponent variant='paragraph02' weight='semi-bold'>

        Denined
      </ParagraphComponent>
      </Tab>
      <SearchContainer>
        <SearchInput placeholder="Search..." />
      </SearchContainer>
    </TabContainer>
  );
};

export default TabComponent;
