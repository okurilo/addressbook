import { Text } from '@pulse/ui/components/Text';
import type { Employee } from '../../api/directory/types';
import { ActionButton, Actions, Hint } from './styled';

type GroupActionsProps = {
  employees: Employee[];
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

export const GroupActions = ({ employees }: GroupActionsProps): JSX.Element => {
  const recipients = getRecipients(employees);
  const skippedCount = employees.filter((employee) => employee.email.trim() === '').length;
  const isDisabled = recipients.length === 0;

  return (
    <Actions>
      <ActionButton
        type="button"
        disabled={isDisabled}
        onClick={() => {
          window.location.href = `mailto:?bcc=${encodeURIComponent(recipients.join(','))}`;
        }}
      >
        Написать всем
      </ActionButton>
      <ActionButton
        type="button"
        disabled={isDisabled}
        onClick={() => downloadIcs(recipients)}
      >
        Поставить встречу · ICS
      </ActionButton>
      {skippedCount > 0 ? (
        <Hint>
          <Text variant="caption1Regular">
            Без email: {skippedCount}. Эти сотрудники не попадут в рассылку и ICS.
          </Text>
        </Hint>
      ) : null}
      {isDisabled ? (
        <Hint>
          <Text variant="caption1Regular">В активной группе нет доступных email.</Text>
        </Hint>
      ) : null}
    </Actions>
  );
};
