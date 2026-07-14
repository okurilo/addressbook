export const MOCK_columns = [
  { key: 'name', header: 'ФИО сотрудника', width: '1.5fr', render: (u) => u.name },
  { key: 'structure', header: 'структура', render: (u) => u.role },
  { key: 'position', header: 'должность', render: (u) => u.department },
  {
    key: 'connect',
    header: 'связаться',
    align: 'right',
    width: '120px',
    render: (u) => <div>{u.active ? 'Active' : 'Inactive'}</div>,
  },
];

export const MOCK_users: User[] = [
  {
    id: 1,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Engineer',
    department: 'Platform',
    location: 'London, UK',
    joined: '2021-03-14',
    active: true,
    bio: 'Works on the core rendering pipeline and enjoys writing the first program for any new machine.',
    activity: ['Merged PR #482', 'Reviewed 3 pull requests', 'Opened issue "Grid gap regression"'],
  },
  {
    id: 2,
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Researcher',
    department: 'Applied ML',
    location: 'Manchester, UK',
    joined: '2020-07-01',
    active: true,
    bio: 'Focuses on computation theory and decidability. Currently prototyping an inference cache.',
    activity: ['Published internal paper', 'Presented at weekly sync', 'Closed 5 issues'],
  },
  {
    id: 3,
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Manager',
    department: 'Compilers',
    location: 'New York, US',
    joined: '2019-11-20',
    active: false,
    bio: 'Champions readable tooling and coined the phrase "it is easier to ask forgiveness than permission".',
    activity: ['1:1s with the team', 'Roadmap planning', 'Debugged an actual moth'],
  },
];

