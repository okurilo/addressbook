// TODO(addressbook-host): заменить временно нетипизированный callback вкладок.
// @ts-nocheck
import { Tabs as TabsPulse, Tab } from '@pulse/ui/components/Tabs';
import { MainContainerStyled } from './styled';
import { TABS } from './constants';

export const Tabs = ({ activeTab, setActiveTab }) => {
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
