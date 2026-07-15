import { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { MainContainerStyled } from './styled';
import { Tabs } from './Tabs';
import { TABS } from './Tabs/constants';
import { Content } from './Content';
import { useProfile } from './hooks/useProfile';
import type { PersonProfile } from '../types';
import type { ProfileTabKey } from './Tabs/constants';

type ProfileProps = { person: PersonProfile; pid: string };

// сделать отдельным виджетом
export const Profile = ({ person, pid }: ProfileProps) => {
  const profile = useProfile(pid);

  const [activeTab, setActiveTab] = useState<ProfileTabKey>(TABS[0].key);
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

