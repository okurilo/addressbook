import { Tabs as TabsPulse, Tab } from '@pulse/ui/components/Tabs';
import type { Dispatch, SetStateAction } from 'react';
import { MainContainerStyled } from './styled';
import { TABS } from './constants';
import type { ProfileTabKey } from './constants';

type TabsProps = {
  activeTab: ProfileTabKey;
  setActiveTab: Dispatch<SetStateAction<ProfileTabKey>>;
};

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <MainContainerStyled>
      <TabsPulse $type="primary">
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            $isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabsPulse>
    </MainContainerStyled>
  );
};

