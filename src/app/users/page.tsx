'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Grid,
  IconButton,
  alpha,
  useTheme,
  Divider,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  PersonAdd,
  Email,
  Phone,
  LocationOn,
  MoreVert,
  School,
  TrendingUp,
} from '@mui/icons-material';
import { IconUser, IconUserPlus, IconSettings, IconSearch } from '@tabler/icons-react';

// ✅ Mock user data for placeholder
const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'Active',
    coursesEnrolled: 12,
    progress: 85,
    joinedDate: '2024-01-15',
    location: 'New York, USA',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'Instructor',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'Active',
    coursesEnrolled: 3,
    progress: 92,
    joinedDate: '2023-11-22',
    location: 'London, UK',
  },
  {
    id: 3,
    name: 'Carol Martinez',
    email: 'carol.martinez@example.com',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'Pending',
    coursesEnrolled: 7,
    progress: 60,
    joinedDate: '2024-03-08',
    location: 'Madrid, Spain',
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'Active',
    coursesEnrolled: 25,
    progress: 100,
    joinedDate: '2023-06-10',
    location: 'Sydney, Australia',
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin':
      return 'error';
    case 'Instructor':
      return 'warning';
    case 'Student':
      return 'primary';
    default:
      return 'default';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Inactive':
      return 'error';
    default:
      return 'default';
  }
};

export default function UsersPage() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      {/* ✅ Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Users Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage students, instructors, and administrators
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<IconSearch stroke={1.5} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              borderColor: alpha(theme.palette.primary.main, 0.3),
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              },
            }}
          >
            Search Users
          </Button>
          <Button
            variant="contained"
            startIcon={<IconUserPlus stroke={1.5} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              },
            }}
          >
            Add User
          </Button>
        </Stack>
      </Box>

      {/* ✅ Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mr: 2,
                }}
              >
                <IconUser stroke={1.5} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {mockUsers.length}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  mr: 2,
                }}
              >
                <TrendingUp />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                3
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Active Users
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  mr: 2,
                }}
              >
                <School />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                1
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Instructors
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main,
                  mr: 2,
                }}
              >
                <PersonAdd />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                2
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Students
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* ✅ Users List */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        All Users
      </Typography>

      <Grid container spacing={3}>
        {mockUsers.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.15),
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',

                transition: theme.transitions.create(
                  ['border-color', 'transform', 'box-shadow', 'background-color'],
                  {
                    duration: theme.transitions.duration.short,
                    easing: theme.transitions.easing.easeInOut,
                  },
                ),

                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* ✅ User Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={user.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {user.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip
                        label={user.role}
                        color={getRoleColor(user.role) as any}
                        size="small"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status) as any}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ✅ User Details */}
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <School sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.coursesEnrolled} courses
                    </Typography>
                  </Box>

                  {/* ✅ Progress Bar */}
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        {user.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={user.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* ✅ Actions */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.75rem',
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.75rem',
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Coming Soon Notice */}
      <Card
        sx={{
          mt: 4,
          p: 4,
          textAlign: 'center',
          borderRadius: 4,
          border: '1px dashed',
          borderColor: alpha(theme.palette.primary.main, 0.3),
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          🚧 Under Development
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Full user management features are coming soon! This includes user creation, editing, role
          management, and more.
        </Typography>
      </Card>
    </Box>
  );
}
