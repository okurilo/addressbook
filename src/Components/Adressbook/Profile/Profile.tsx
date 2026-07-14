import { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { MainContainerStyled } from './styled';
import { Tabs } from './Tabs';
import { TABS } from './Tabs/constants';
import { Content } from './Content';
import { useProfile } from './hooks/useProfile';

// сделать отдельным виджетом
export const Profile = ({ person, pid }) => {
  const profile = useProfile(pid);

  const [activeTab, setActiveTab] = useState(TABS[0].key);
  return (
    <MainContainerStyled>
      <Breadcrumbs profile={profile} structureType="linear" />
      <Header
        name={person.name}
        position={person.position}
        employeeNumber={person.employeeNumber}
        photo={person.photo}
        absence={person.absence}
        pid={pid}
        initials={person.initials}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} person={person} pid={pid} profile={profile} />
    </MainContainerStyled>
  );
};

