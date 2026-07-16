import { useEffect, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import type { Employee } from '../../api/directory/types';
import { ActionButton, Actions, Hint } from './styled';

type GroupActionsProps = {
  employees: Employee[];
  hasUnloadedEmployees: boolean;
  loadAllEmployees: () => Promise<Employee[]>;
};

const getRecipients = (employees: Employee[]): string[] =>
  Array.from(
    new Set(
      employees
        .map((employee) => employee.email.trim())
        .filter((email) => email !== '')
    )
  );

const escapeIcsText = (value: string): string =>
  value.replace(/\\/gu, '\\\\').replace(/,/gu, '\\,').replace(/;/gu, '\\;');

const downloadIcs = (recipients: string[]): void => {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@addressbook`;
  const stamp = new Date()
    .toISOString()
    .replace(/-/gu, '')
    .replace(/:/gu, '')
    .replace(/\.\d{3}Z$/u, 'Z');
  const attendees = recipients.map(
    (email) => `ATTENDEE;CN=${escapeIcsText(email)}:mailto:${email}`
  );
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AddressBook//Group meeting//RU',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    'SUMMARY:',
    ...attendees,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'meeting.ics';
  link.click();
  URL.revokeObjectURL(url);
};

export const GroupActions = ({
  employees,
  hasUnloadedEmployees,
  loadAllEmployees,
}: GroupActionsProps): JSX.Element => {
  const [resolvedEmployees, setResolvedEmployees] = useState<Employee[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const actionEmployees = resolvedEmployees ?? employees;
  const hasResolvedAllEmployees = resolvedEmployees !== null || !hasUnloadedEmployees;
  const recipients = getRecipients(actionEmployees);
  const skippedCount = actionEmployees.filter((employee) => employee.email.trim() === '').length;
  const isDisabled = recipients.length === 0 && hasResolvedAllEmployees;
  const employeesSignature = employees.map((employee) => employee.id).join('|');

  useEffect(() => {
    setResolvedEmployees(null);
    setHasLoadingError(false);
  }, [employeesSignature, hasUnloadedEmployees]);

  const resolveEmployees = async (): Promise<Employee[]> => {
    if (resolvedEmployees !== null || !hasUnloadedEmployees) {
      return actionEmployees;
    }

    setIsLoading(true);
    setHasLoadingError(false);

    try {
      const nextEmployees = await loadAllEmployees();
      setResolvedEmployees(nextEmployees);
      return nextEmployees;
    } catch {
      setHasLoadingError(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Actions>
      <ActionButton
        type="button"
        disabled={isDisabled || isLoading}
        onClick={() => {
          void resolveEmployees().then((nextEmployees) => {
            const nextRecipients = getRecipients(nextEmployees);

            if (nextRecipients.length > 0) {
              window.location.href = `mailto:?bcc=${encodeURIComponent(nextRecipients.join(','))}`;
            }
          });
        }}
      >
        {isLoading ? 'Загружаем участников…' : 'Написать всем'}
      </ActionButton>
      <ActionButton
        type="button"
        disabled={isDisabled || isLoading}
        onClick={() => {
          void resolveEmployees().then((nextEmployees) => {
            const nextRecipients = getRecipients(nextEmployees);

            if (nextRecipients.length > 0) {
              downloadIcs(nextRecipients);
            }
          });
        }}
      >
        Поставить встречу · ICS
      </ActionButton>
      {hasResolvedAllEmployees && skippedCount > 0 ? (
        <Hint>
          <Text variant="caption1Regular">
            Без email: {skippedCount}. Эти сотрудники не попадут в рассылку и ICS.
          </Text>
        </Hint>
      ) : null}
      {hasResolvedAllEmployees && isDisabled ? (
        <Hint>
          <Text variant="caption1Regular">В активной группе нет доступных email.</Text>
        </Hint>
      ) : null}
      {hasLoadingError ? (
        <Hint>
          <Text variant="caption1Regular">
            Не удалось загрузить всех участников. Попробуйте ещё раз.
          </Text>
        </Hint>
      ) : null}
    </Actions>
  );
};
