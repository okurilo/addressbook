import { useTheme } from 'styled-components';
import type { RouteComponentProps } from '@reach/router';
import { Table } from '../../../../Components/Adressbook/common/Table';
import { Body2Regular } from '../../../../Components/Adressbook/common/typography';
import { CellWrapperStyled, MainContainerStyled } from './styled';
import { NUMBERS } from './NUMBERS';
import { TablePhone } from '../../../../Components/Adressbook/common/ConnectCell/Phone';

export const ReferencePhonesPage = (_props: RouteComponentProps): JSX.Element => {
  const { tokens } = useTheme();
  return (
    <MainContainerStyled>
      <Table
        data={NUMBERS}
        getRowKey={(row) => row.name}
        columns={[
          {
            key: 'name',
            header: 'дежурная смена',
            render: (row) => <Body2Regular>{row.name}</Body2Regular>,
          },
          {
            key: 'zone',
            header: 'зона ответственности',
            render: (row) => <Body2Regular>{row.zone ?? 'не указан'}</Body2Regular>,
          },
          {
            key: 'phoneNumber',
            header: 'связаться',
            align: 'right',
            render: (row) => {
              if (row.phoneNumber)
                return (
                  <CellWrapperStyled>
                    <TablePhone phone={row.phoneNumber} noCalls>
                      {row.phoneNumber}
                    </TablePhone>
                  </CellWrapperStyled>
                );
              return (
                <CellWrapperStyled>
                  <Body2Regular color={tokens?.current.core.text.secondary}>не указан</Body2Regular>
                </CellWrapperStyled>
              );
            },
          },
        ]}
      />
    </MainContainerStyled>
  );
};
