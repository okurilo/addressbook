import { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { ButtonStyled, MainContainerStyled } from './styled';
import { Tabs } from './Tabs';
import { TABS } from './Tabs/constants';
import { Content } from './Content';
import { useProfile } from './hooks/useProfile';
import type { PersonProfile } from '../types';
import type { ProfileTabKey } from './Tabs/constants';
import { ReactComponent as CloseIcon } from './assets/close.svg';

type ProfileProps = { person: PersonProfile; pid: string; onClose?: () => void };

// сделать отдельным виджетом
export const Profile = ({ person, pid, onClose }: ProfileProps) => {
  const profile = useProfile(pid);

  const [activeTab, setActiveTab] = useState<ProfileTabKey>(TABS[0].key);
  return (
    <MainContainerStyled>
      <ButtonStyled onClick={onClose}>
        <CloseIcon />
      </ButtonStyled>
      <Breadcrumbs profile={profile} structureType="linear" />
      <Header
        name={person.name}
        position={person.position || profile?.linear?.position}
        employeeNumber={person.employeeNumber || profile?.tabNumber}
        photo={person.photo}
        absence={person.absence}
        pid={pid}
        initials={person.initials}
        isLoading={profile.isLoading}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} person={person} pid={pid} profile={profile} />
    </MainContainerStyled>
  );
};

