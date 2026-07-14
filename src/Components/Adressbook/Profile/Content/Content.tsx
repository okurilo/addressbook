import { MainContainerStyled } from './styled';
import { Contacts } from './Contacts';
import { Info } from './Info';

export const Content = ({ activeTab, person, pid, profile }) => {
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

