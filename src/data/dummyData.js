// Port Groups
export const portGroups = [
  {
    id: 1,
    name: 'Web Services',
    description: 'Common web service ports',
    ports: [
      { port: 80, protocol: 'TCP', description: 'HTTP' },
      { port: 443, protocol: 'TCP', description: 'HTTPS' },
      { port: 8080, protocol: 'TCP', description: 'Alternative HTTP' }
    ]
  },
  {
    id: 2,
    name: 'Mail Services',
    description: 'Email related ports',
    ports: [
      { port: 25, protocol: 'TCP', description: 'SMTP' },
      { port: 110, protocol: 'TCP', description: 'POP3' },
      { port: 143, protocol: 'TCP', description: 'IMAP' }
    ]
  }
]

// IP Groups
export const ipGroups = [
  {
    id: 1,
    name: 'Internal Network',
    description: 'Company internal IP ranges',
    ranges: [
      { start: '192.168.1.0', end: '192.168.1.255', description: 'Office Network' },
      { start: '10.0.0.0', end: '10.0.0.255', description: 'VPN Network' }
    ]
  },
  {
    id: 2,
    name: 'External Services',
    description: 'Trusted external services',
    ranges: [
      { start: '203.0.113.0', end: '203.0.113.255', description: 'Cloud Services' }
    ]
  }
]

// Application Groups
export const applicationGroups = [
  {
    id: 1,
    name: 'Web Applications',
    description: 'Web related applications',
    applications: [
      { name: 'HTTP', signatures: ['http/', 'get', 'post'], risk: 'LOW' },
      { name: 'HTTPS', signatures: ['tls', 'ssl'], risk: 'LOW' }
    ]
  },
  {
    id: 2,
    name: 'File Sharing',
    description: 'File sharing applications',
    applications: [
      { name: 'FTP', signatures: ['ftp'], risk: 'MEDIUM' },
      { name: 'SMB', signatures: ['smb'], risk: 'MEDIUM' }
    ]
  }
]

// Filters
export const filters = [
  {
    id: 1,
    name: 'Basic Web Filter',
    description: 'Basic web traffic filtering',
    rules: [
      {
        name: 'Allow Web Traffic',
        portGroup: 'Web Services',
        ipGroup: 'Internal Network',
        appGroup: 'Web Applications',
        action: 'ALLOW'
      }
    ]
  },
  {
    id: 2,
    name: 'Mail Filter',
    description: 'Email traffic filtering',
    rules: [
      {
        name: 'Allow Mail Traffic',
        portGroup: 'Mail Services',
        ipGroup: 'Internal Network',
        appGroup: null,
        action: 'ALLOW'
      }
    ]
  }
]

// QoS Classes
export const qosClasses = [
  {
    id: 1,
    name: 'High Priority',
    bandwidth: '100Mbps',
    priority: 1,
    description: 'Mission critical applications'
  },
  {
    id: 2,
    name: 'Normal',
    bandwidth: '50Mbps',
    priority: 2,
    description: 'Regular business traffic'
  },
  {
    id: 3,
    name: 'Low Priority',
    bandwidth: '10Mbps',
    priority: 3,
    description: 'Non-critical traffic'
  }
]

// Policy Tree
export const policyTree = {
  id: 'root',
  name: 'Root',
  children: [
    {
      id: 'inbound',
      name: 'Inbound',
      children: [
        {
          id: 'web',
          name: 'Web Policy',
          filter: 'Basic Web Filter',
          qosClass: 'Normal'
        },
        {
          id: 'mail',
          name: 'Mail Policy',
          filter: 'Mail Filter',
          qosClass: 'High Priority'
        }
      ]
    },
    {
      id: 'outbound',
      name: 'Outbound',
      children: [
        {
          id: 'general',
          name: 'General Internet',
          filter: 'Basic Web Filter',
          qosClass: 'Low Priority'
        }
      ]
    }
  ]
} 