import { MainContainerStyled } from './styled';
import { Contacts } from './Contacts';
import { Info } from './Info';
import type { PersonProfile } from '../../types';
import type { ProfileViewData } from '../hooks/types';

type ContentProps = {
  activeTab: string;
  person: PersonProfile;
  pid: string;
  profile: ProfileViewData;
};

export const Content = ({ activeTab, person, pid, profile }: ContentProps) => {
  if (activeTab === 'contacts')
    return (
      <MainContainerStyled>
        <Contacts
          internalPhone={person.internalPhone}
          personalPhone={person.personalPhone}
          pid={pid}
          profile={profile}
        />
      </MainContainerStyled>
    );
  if (activeTab === 'info')
    return (
      <MainContainerStyled>
        <Info profile={profile}/>
      </MainContainerStyled>
    );
  return null;
};
