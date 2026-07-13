import { Fragment, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import type { Employee } from '../../api/directory/types';
import { EmployeeAvatar } from '../EmployeeAvatar';
import { EmployeeRow } from '../EmployeeRow';
import {
  Table,
  HeadCell,
  DetailsRow,
  DetailsCell,
  DetailsPanel,
  DetailsBreadcrumbs,
  CloseButton,
  Profile,
  ProfileContent,
  StatusLine,
  StatusMarker,
  Tabs,
  Tab,
  DetailsGrid,
  DetailsSection,
  DefinitionList,
  DefinitionTerm,
  DefinitionDescription,
  ContactLink,
} from './styled';

type EmployeeTableProps = {
  employees: Employee[];
  favoriteIds: string[];
  onToggleFavorite: (employeeId: string) => void;
};

const statusLabelMap: Record<Employee['status'], string> = {
  available: 'На месте',
  busy: 'Занят',
  offline: 'Не в сети',
  vacation: 'В отпуске',
};

type EmployeeDetailsProps = {
  employee: Employee;
  onClose: () => void;
};

const EmployeeDetails = ({ employee, onClose }: EmployeeDetailsProps): JSX.Element => {
  const theme = useTheme();
  const statusColorMap: Record<Employee['status'], string> = {
    available: theme.tokens.current.support.success,
    busy: theme.tokens.current.support.attention,
    offline: theme.tokens.current.text.tertiary,
    vacation: theme.tokens.current.support.info,
  };

  return (
    <DetailsRow id={`employee-details-${employee.id}`}>
      <DetailsCell colSpan={4}>
        <DetailsPanel aria-label={`Карточка сотрудника ${employee.fullName}`}>
          <DetailsBreadcrumbs>
            Кадровая структура&nbsp;&nbsp;/&nbsp;&nbsp;{employee.shortStructure}
            &nbsp;&nbsp;/&nbsp;&nbsp;{employee.departmentName}
          </DetailsBreadcrumbs>
          <CloseButton type="button" aria-label="Закрыть карточку сотрудника" onClick={onClose}>
            ×
          </CloseButton>

          <Profile>
            <EmployeeAvatar
              initials={employee.avatarInitials}
              status={employee.status}
              size="l"
            />
            <ProfileContent>
              <Text variant="body1Semibold">{employee.fullName}</Text>
              <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
                {employee.position}
              </Text>
              <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
                {employee.subtitle}
              </Text>
              <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
                Табельный номер: {employee.employeeNumber}
              </Text>
              <StatusLine>
                <StatusMarker $color={statusColorMap[employee.status]} />
                <Text variant="body2Semibold" color={statusColorMap[employee.status]}>
                  {statusLabelMap[employee.status]}
                </Text>
              </StatusLine>
            </ProfileContent>
          </Profile>

          <Tabs aria-label="Разделы карточки сотрудника">
            <Tab type="button" $active aria-pressed="true">
              Контакты
            </Tab>
            <Tab type="button" aria-pressed="false">Инфо</Tab>
            <Tab type="button" aria-pressed="false">Достижения</Tab>
            <Tab type="button" aria-pressed="false">Навыки</Tab>
          </Tabs>

          <DetailsGrid>
            <DetailsSection>
              <Text variant="body1Semibold">Телефоны</Text>
              <DefinitionList>
                <DefinitionTerm>Внутренний</DefinitionTerm>
                <DefinitionDescription>
                  {employee.phone === null ? (
                    <Text variant="body2Regular" color={theme.tokens.current.text.tertiary}>
                      отсутствует
                    </Text>
                  ) : (
                    <ContactLink href={`tel:${employee.phone}`}>{employee.phone}</ContactLink>
                  )}
                </DefinitionDescription>
                <DefinitionTerm>Мобильный</DefinitionTerm>
                <DefinitionDescription>
                  {employee.mobilePhone === null ? (
                    <Text variant="body2Regular" color={theme.tokens.current.text.tertiary}>
                      не указан
                    </Text>
                  ) : (
                    <ContactLink href={`tel:${employee.mobilePhone}`}>
                      {employee.mobilePhone}
                    </ContactLink>
                  )}
                </DefinitionDescription>
              </DefinitionList>
            </DetailsSection>

            <DetailsSection>
              <Text variant="body1Semibold">Почта</Text>
              <DefinitionList>
                <DefinitionTerm>Email</DefinitionTerm>
                <DefinitionDescription>
                  <ContactLink href={`mailto:${employee.email}`}>{employee.email}</ContactLink>
                </DefinitionDescription>
              </DefinitionList>
            </DetailsSection>

            <DetailsSection>
              <Text variant="body1Semibold">Рабочее место</Text>
              <DefinitionList>
                <DefinitionTerm>Адрес</DefinitionTerm>
                <DefinitionDescription>{employee.workplace}</DefinitionDescription>
                <DefinitionTerm>Руководитель</DefinitionTerm>
                <DefinitionDescription>{employee.managerName}</DefinitionDescription>
              </DefinitionList>
            </DetailsSection>
          </DetailsGrid>
        </DetailsPanel>
      </DetailsCell>
    </DetailsRow>
  );
};

export const EmployeeTable = ({
  employees,
  favoriteIds,
  onToggleFavorite,
}: EmployeeTableProps): JSX.Element => {
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null);

  return (
    <Table>
      <colgroup>
        <col style={{ width: '34%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '24%' }} />
      </colgroup>
      <thead>
        <tr>
          <HeadCell>ФИО сотрудника</HeadCell>
          <HeadCell>Структура</HeadCell>
          <HeadCell>Должность</HeadCell>
          <HeadCell>Связаться</HeadCell>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          const isExpanded = expandedEmployeeId === employee.id;

          return (
            <Fragment key={employee.id}>
              <EmployeeRow
                employee={employee}
                isFavorite={favoriteIds.includes(employee.id)}
                isExpanded={isExpanded}
                onToggleFavorite={onToggleFavorite}
                onOpen={() => {
                  setExpandedEmployeeId((currentId) =>
                    currentId === employee.id ? null : employee.id
                  );
                }}
              />
              {isExpanded ? (
                <EmployeeDetails
                  employee={employee}
                  onClose={() => {
                    setExpandedEmployeeId(null);
                  }}
                />
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};
